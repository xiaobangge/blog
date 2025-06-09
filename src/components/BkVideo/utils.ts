/**
 * 检测是否为移动设备
 * @returns 是否为移动设备
 */
export const isMobile = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  
  /**
   * 检测视频格式
   * @param url 视频URL
   * @returns 格式标识符
   */
  export const detectFormat = (url: string): string => {
    if (url.includes('.m3u8')) return 'hls';
    if (url.includes('.mpd')) return 'dash';
    if (url.includes('.mp4')) return 'mp4';
    if (url.includes('.webm')) return 'webm';
    if (url.includes('.flv')) return 'flv';
    return 'unknown';
  };
  
  /**
   * 检测浏览器是否支持HLS
   * @returns 是否支持HLS
   */
  export const isHlsSupported = (): boolean => {
    const video = document.createElement('video');
    return Boolean(
      video.canPlayType('application/vnd.apple.mpegurl') || 
      (typeof Hls !== 'undefined' && Hls.isSupported())
    );
  };
  
  /**
   * 检测浏览器是否支持DASH
   * @returns 是否支持DASH
   */
  export const isDashSupported = (): boolean => {
    const video = document.createElement('video');
    return Boolean(
      video.canPlayType('application/dash+xml') ||
      (typeof MediaSource !== 'undefined' && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'))
    );
  };
  
  /**
   * 格式化时间
   * @param seconds 秒数
   * @returns 格式化后的时间字符串
   */
  export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    return [
      hours > 0 ? hours : null,
      minutes < 10 && hours > 0 ? `0${minutes}` : minutes,
      secs < 10 ? `0${secs}` : secs
    ]
      .filter(Boolean)
      .join(':');
  };
  
  /**
   * 获取最佳视频质量
   * @param sources 视频源列表
   * @param isHighSpeed 是否高速网络
   * @returns 最合适的视频源
   */
  export const getBestQuality = (sources: any[], isHighSpeed = true): any => {
    const sortedSources = [...sources].sort((a, b) => (b.size || 0) - (a.size || 0));
    
    if (isHighSpeed) {
      // 高速网络返回最高质量
      return sortedSources[0];
    } else {
      // 低速网络返回中等质量
      const midIndex = Math.floor(sortedSources.length / 2);
      return sortedSources[midIndex] || sortedSources[0];
    }
  };
  