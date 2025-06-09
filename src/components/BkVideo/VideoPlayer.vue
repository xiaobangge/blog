<template>
    <div class="vue-video-player-container" :style="containerStyle">
      <video
        ref="videoRef"
        class="video-js vjs-big-play-centered !h-full"
        :class="playerClass"
        :poster="options.poster"
      ></video>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
  import videojs from 'video.js';
  import 'video.js/dist/video-js.css';
  import Hls from 'hls.js';
  import { VideoPlayerOptions, VideoPlayerEvents, VideoSource } from './types';
  import { defaultOptions } from './default-options';
  import { isMobile, detectFormat, isHlsSupported, isDashSupported } from './utils';
  
  // 定义组件属性
  interface Props {
    options: VideoPlayerOptions;            // 播放器配置
    events?: VideoPlayerEvents;             // 事件处理函数
    responsive?: boolean;                   // 是否响应式
    playerClass?: string;                   // 播放器自定义类名
  }
  
  // 组件事件
  const emits = defineEmits<{
    (e: 'ready', player: any): void;
    (e: 'play', event: any): void;
    (e: 'pause', event: any): void;
    (e: 'ended', event: any): void;
    (e: 'error', error: any): void;
    (e: 'timeupdate', event: any): void;
    (e: 'quality-changed', quality: number): void;
  }>();
  
  // 使用withDefaults设置属性默认值
  const props = withDefaults(defineProps<Props>(), {
    events: () => ({}),
    responsive: true,
    playerClass: ''
  });
  
  // 响应式状态
  const videoRef = ref<HTMLVideoElement | null>(null);
  const player = ref<any>(null);
  const hls = ref<Hls | null>(null);
  const currentQuality = ref<number>(0);
  
  // 计算属性：容器样式
  const containerStyle = computed(() => ({
    width: props.responsive ? '100%' : undefined,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  }));
  
  /**
   * 初始化播放器
   */
  const initializePlayer = () => {
    if (!videoRef.value) return;
  
    // 合并默认配置
    const finalOptions = {
      ...defaultOptions,
      ...props.options,
      // iOS需要特殊处理
      playsinline: true,
      // 移动设备处理
      inactivityTimeout: isMobile() ? 3000 : 2000,
    };
  
    // 创建Video.js实例
    player.value = videojs(videoRef.value, finalOptions, function() {
      // 播放器就绪
      emits('ready', player.value);
      if (props.events?.onReady) props.events.onReady(player.value);
    });
  
    // 注册事件处理
    registerEvents();
    
    // 处理HLS格式
    setupHlsSupport();
    
    // 处理自适应码率
    setupQualityControl();
    
    // 性能优化
    applyPerformanceOptimizations();
  };
  
  /**
   * 注册事件监听
   */
  const registerEvents = () => {
    if (!player.value) return;
    
    const eventsMap = [
      { name: 'play', handler: props.events?.onPlay, emit: 'play' },
      { name: 'pause', handler: props.events?.onPause, emit: 'pause' },
      { name: 'ended', handler: props.events?.onEnded, emit: 'ended' },
      { name: 'error', handler: props.events?.onError, emit: 'error' },
      { name: 'timeupdate', handler: props.events?.onTimeUpdate, emit: 'timeupdate' },
      { name: 'seeking', handler: props.events?.onSeeking },
      { name: 'seeked', handler: props.events?.onSeeked },
    ];
    
    eventsMap.forEach(event => {
      player.value.on(event.name, (e: any) => {
        if (event.handler) event.handler(e);
        if (event.emit) emits(event.emit as any, e);
      });
    });
  };
  
  /**
   * 设置HLS支持
   */
  const setupHlsSupport = () => {
    if (!player.value) return;
    
    const hlsSource = props.options.sources.find(
      source => source.type === 'application/x-mpegURL'
    );
    
    if (!hlsSource) return;
    
    // 如果浏览器原生支持HLS，使用原生支持
    if (videoRef.value?.canPlayType('application/vnd.apple.mpegurl')) {
      player.value.src(hlsSource.src);
      return;
    }
    
    // 否则使用Hls.js
    if (Hls.isSupported()) {
      // 销毁已存在的Hls实例
      if (hls.value) {
        hls.value.destroy();
      }
      
      hls.value = new Hls({
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        ...props.options.hlsConfig,
      });
      
      hls.value.loadSource(hlsSource.src);
      hls.value.attachMedia(videoRef.value as HTMLVideoElement);
      
      // 错误处理
      hls.value.on(Hls.Events.ERROR, function(event, data) {
        if (data.fatal) {
          switch(data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // 尝试恢复网络错误
              hls.value?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              // 尝试恢复媒体错误
              hls.value?.recoverMediaError();
              break;
            default:
              // 无法恢复的错误
              destroyPlayer();
              break;
          }
          
          emits('error', data);
          if (props.events?.onError) props.events.onError(data);
        }
      });
    }
  };
  
  /**
   * 设置清晰度切换
   */
  const setupQualityControl = () => {
    if (!player.value || !props.options.sources || props.options.sources.length <= 1) return;
    
    // 如果有多个清晰度源
    if (props.options.sources.filter(s => s.size).length > 1) {
      const qualities = props.options.sources
        .filter(s => s.size)
        .sort((a, b) => (b.size || 0) - (a.size || 0));
        
      // 创建分辨率菜单
      const qualityMenu = player.value.controlBar.addChild('MenuButton', {
        controlText: '清晰度',
        menuButton: true,
      });
      
      // 添加清晰度选项
      qualities.forEach((quality, index) => {
        qualityMenu.addChild('MenuItem', {
          label: `${quality.size}p`,
          selected: index === 0,
          handleClick: () => {
            // 切换清晰度
            const currentTime = player.value.currentTime();
            const isPaused = player.value.paused();
            
            player.value.src({ src: quality.src, type: quality.type });
            player.value.load();
            player.value.currentTime(currentTime);
            
            if (!isPaused) {
              player.value.play();
            }
            
            currentQuality.value = index;
            emits('quality-changed', quality.size || 0);
            if (props.events?.onQualityChanged) {
              props.events.onQualityChanged(quality.size || 0);
            }
          }
        });
      });
    }
  };
  
  /**
   * 应用性能优化
   */
  const applyPerformanceOptimizations = () => {
    if (!videoRef.value || !player.value) return;
    
    // 开启硬件加速
    videoRef.value.style.transform = 'translateZ(0)';
    
    // 预加载下一帧
    if (props.options.preload !== 'none') {
      player.value.preload('auto');
    }
    
    // 如果是移动设备，降低初始化清晰度
    if (isMobile() && props.options.sources.length > 1) {
      const lowestQuality = [...props.options.sources]
        .filter(s => s.size)
        .sort((a, b) => (a.size || 0) - (b.size || 0))[0];
        
      if (lowestQuality) {
        player.value.src({ src: lowestQuality.src, type: lowestQuality.type });
      }
    }
    
    // 监听网络状况，动态调整缓冲策略
    if (navigator.connection) {
      const connection = navigator.connection as any;
      if (connection.addEventListener) {
        connection.addEventListener('change', () => {
          if (connection.effectiveType === '4g') {
            // 高速连接，预加载更多
            if (hls.value) {
              hls.value.config.maxBufferLength = 60;
            }
          } else if (connection.effectiveType === '3g' || connection.effectiveType === '2g') {
            // 低速连接，减少预加载
            if (hls.value) {
              hls.value.config.maxBufferLength = 15;
            }
          }
        });
      }
    }
  };
  
  /**
   * 清理资源
   */
  const destroyPlayer = () => {
    if (hls.value) {
      hls.value.destroy();
      hls.value = null;
    }
    
    if (player.value) {
      player.value.dispose();
      player.value = null;
    }
  };
  
  // 监听配置变化
  watch(() => props.options.sources, () => {
    if (player.value) {
      destroyPlayer();
      nextTick(initializePlayer);
    }
  }, { deep: true });
  
  // 生命周期钩子
  onMounted(() => {
    initializePlayer();
  });
  
  onBeforeUnmount(() => {
    destroyPlayer();
  });
  
  // 暴露方法和属性给父组件
  defineExpose({
    player,
    videoRef,
    destroyPlayer
  });
  </script>
  
  <style scoped>
  .vue-video-player-container {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }
  
  :deep(.video-js) {
    width: 100%;
    height: 100%;
  }
  
  :deep(.vjs-fullscreen) {
    background-color: #000;
  }
  
  /* 自定义控制栏样式 */
  :deep(.vjs-control-bar) {
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  /* 移动端优化 */
  @media (max-width: 768px) {
    :deep(.vjs-big-play-button) {
      transform: scale(0.8);
    }
    
    :deep(.vjs-control-bar) {
      font-size: 0.9em;
    }
  }
  </style>
  