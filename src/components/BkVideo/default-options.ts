import { type VideoPlayerOptions } from './types';

// 播放器默认配置
export const defaultOptions: Partial<VideoPlayerOptions> = {
  autoplay: false,       // 默认不自动播放
  muted: false,          // 默认不静音
  loop: false,           // 默认不循环
  controls: true,        // 默认显示控制栏
  preload: 'auto',       // 默认预加载策略
  fluid: true,           // 默认自适应容器
  aspectRatio: '16:9',   // 默认宽高比
  
  // 播放器技术优先级
  techOrder: ['html5'],
  
  // 语言设置
  language: 'zh-CN',
  
  // 控制栏配置
  controlBar: {
    playToggle: true,              // 播放/暂停按钮
    currentTimeDisplay: true,      // 当前时间
    timeDivider: true,             // 时间分隔符
    durationDisplay: true,         // 总时长
    progressControl: true,         // 进度条
    volumePanel: {
      inline: false,               // 音量控制是否内联
    },
    fullscreenToggle: true,        // 全屏按钮
  },
  
  // HLS默认配置
  hlsConfig: {
    enableWorker: true,           // 启用WebWorker
    lowLatencyMode: false,        // 低延迟模式
    backBufferLength: 90,         // 后退缓冲区长度
    maxBufferLength: 30,          // 最大缓冲长度
  }
};
