// 播放器配置类型定义
export interface VideoPlayerOptions {
    autoplay?: boolean;          // 是否自动播放
    muted?: boolean;             // 是否静音
    loop?: boolean;              // 是否循环播放
    controls?: boolean;          // 是否显示控制栏
    preload?: 'auto' | 'metadata' | 'none';  // 预加载策略
    fluid?: boolean;             // 是否自适应容器
    aspectRatio?: string;        // 宽高比，如"16:9"
    poster?: string;             // 封面图片URL
    sources: VideoSource[];      // 视频源列表
    hlsConfig?: Record<string, any>; // HLS配置选项
    plugins?: Record<string, any>;   // 插件配置
  }
  
  // 视频源定义
  export interface VideoSource {
    src: string;  // 视频URL
    type: 'video/mp4' | 'application/x-mpegURL' | 'video/webm' | 'video/ogg' | 'application/dash+xml'; // 媒体类型
    size?: number; // 清晰度，如720, 1080等
  }
  
  // 播放器事件回调定义
  export interface VideoPlayerEvents {
    onReady?: (player: any) => void;        // 播放器就绪
    onPlay?: (event: any) => void;          // 开始播放
    onPause?: (event: any) => void;         // 暂停播放
    onEnded?: (event: any) => void;         // 播放结束
    onError?: (error: any) => void;         // 播放错误
    onTimeUpdate?: (event: any) => void;    // 时间更新
    onSeeking?: (event: any) => void;       // 开始跳转
    onSeeked?: (event: any) => void;        // 跳转完成
    onQualityChanged?: (quality: number) => void; // 清晰度切换
  }
  
  // videojs实例类型
  export type VideoPlayerInstance = any;
  