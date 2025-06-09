// import { ref, Ref, onMounted, onBeforeUnmount, watch } from 'vue';
import videojs from 'video.js';
import Hls from 'hls.js';
import { type VideoPlayerOptions, type VideoPlayerInstance } from './types';
import { defaultOptions } from './default-options';

/**
 * 视频播放器组合式API
 * @param options 播放器配置选项
 * @param elementRef DOM元素引用
 * @returns 播放器控制对象
 */
export const useVideoPlayer = (
  options: VideoPlayerOptions,
  elementRef: Ref<HTMLElement | null>
) => {
  const player: Ref<VideoPlayerInstance | null> = ref(null);
  const hls: Ref<Hls | null> = ref(null);
  const isReady = ref(false);
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const loadedPercent = ref(0);
  const error = ref<any>(null);

  /**
   * 初始化播放器
   */
  const initialize = () => {
    if (!elementRef.value) return;
    
    const finalOptions = { ...defaultOptions, ...options };
    
    // 创建播放器实例
    player.value = videojs(elementRef.value, finalOptions);
    
    // 事件监听
    player.value.on('ready', () => {
      isReady.value = true;
    });
    
    player.value.on('play', () => {
      isPlaying.value = true;
    });
    
    player.value.on('pause', () => {
      isPlaying.value = false;
    });
    
    player.value.on('timeupdate', () => {
      if (player.value) {
        currentTime.value = player.value.currentTime();
      }
    });
    
    player.value.on('loadedmetadata', () => {
      if (player.value) {
        duration.value = player.value.duration();
      }
    });
    
    player.value.on('progress', () => {
      if (player.value) {
        const buffered = player.value.buffered();
        if (buffered && buffered.length > 0) {
          loadedPercent.value = buffered.end(0) / duration.value;
        }
      }
    });
    
    player.value.on('error', (e) => {
      error.value = e;
    });

    // 初始化HLS（如果需要）
    initializeHls();
  };

  /**
   * 初始化HLS
   */
  const initializeHls = () => {
    if (!player.value) return;

    const hlsSource = options.sources.find(
      source => source.type === 'application/x-mpegURL'
    );
    
    if (!hlsSource) return;
    
    const video = player.value.el().querySelector('video');
    
    if (!video) return;
    
    // 检查是否原生支持HLS
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      player.value.src(hlsSource.src);
      return;
    }
    
    // 使用Hls.js
    if (Hls.isSupported()) {
      hls.value = new Hls(options.hlsConfig);
      hls.value.loadSource(hlsSource.src);
      hls.value.attachMedia(video);
      
      hls.value.on(Hls.Events.MANIFEST_PARSED, () => {
        if (options.autoplay) {
          player.value?.play();
        }
      });
      
      hls.value.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch(data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.value?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.value?.recoverMediaError();
              break;
            default:
              destroy();
              break;
          }
        }
      });
    }
  };

  /**
   * 播放方法
   */
  const play = async () => {
    try {
      if (player.value) {
        await player.value.play();
      }
    } catch (e) {
      console.error('无法自动播放:', e);
    }
  };

  /**
   * 暂停方法
   */
  const pause = () => {
    if (player.value) {
      player.value.pause();
    }
  };

  /**
   * 跳转方法
   * @param time 目标时间(秒)
   */
  const seek = (time: number) => {
    if (player.value) {
      player.value.currentTime(time);
    }
  };

  /**
   * 设置音量
   * @param volume 音量(0-1)
   */
  const setVolume = (volume: number) => {
    if (player.value) {
      player.value.volume(volume);
    }
  };

  /**
   * 切换静音
   */
  const toggleMute = () => {
    if (player.value) {
      player.value.muted(!player.value.muted());
    }
  };

  /**
   * 进入/退出全屏
   */
  const toggleFullscreen = () => {
    if (player.value) {
      if (player.value.isFullscreen()) {
        player.value.exitFullscreen();
      } else {
        player.value.requestFullscreen();
      }
    }
  };

  /**
   * 销毁播放器
   */
  const destroy = () => {
    if (hls.value) {
      hls.value.destroy();
      hls.value = null;
    }
    
    if (player.value) {
      player.value.dispose();
      player.value = null;
    }
    
    isReady.value = false;
    isPlaying.value = false;
    currentTime.value = 0;
    duration.value = 0;
    loadedPercent.value = 0;
    error.value = null;
  };

  // 监视配置变化
  watch(() => options.sources, () => {
    if (player.value) {
      destroy();
      initialize();
    }
  }, { deep: true });

  // 生命周期钩子
  onMounted(initialize);
  onBeforeUnmount(destroy);

  return {
    player,
    isReady,
    isPlaying,
    currentTime,
    duration,
    loadedPercent,
    error,
    play,
    pause,
    seek,
    setVolume,
    toggleMute,
    toggleFullscreen,
    destroy
  };
};
