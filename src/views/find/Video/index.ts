import { ref, reactive, computed, onMounted } from 'vue';
import type { VideoPlayerOptions, VideoPlayerEvents } from '@/components/VideoPlayer';
import {getVideoList, getVideoDetail} from "@/api/music";

// 播放器引用
export const playerRef = ref<InstanceType<typeof VideoPlayer> | null>(null);

// 播放器状态
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const selectedQuality = ref(720);

// 播放器配置
export const videoOptions: VideoPlayerOptions = reactive({
  // 基础设置
  autoplay: false,
  muted: false,
  loop: false,
  controls: true,
  fluid: true,
  poster: `https://www.cunshao.com/666666/api/pic.php?t=${new Date().getTime()}`,
  
  // 视频源列表(包含多种格式和清晰度)
  sources: [],
  
  // HLS特定配置
  hlsConfig: {
    maxBufferLength: 30,
    maxMaxBufferLength: 60,
    enableWorker: true,
    lowLatencyMode: false,
  }
});
// 设置视频源
export const setVideoSources = (sources: any) => {
    if (!playerRef.value?.player) return;
    playerRef.value.player?.poster(`https://www.cunshao.com/666666/api/pic.php?t=${new Date().getTime()}`);
    playerRef.value.player?.src(sources[0]);
    setTimeout(() => {
        playerRef.value.player?.play();
    }, 500);
};
// 播放器事件处理
export const videoEvents: VideoPlayerEvents = {
  onReady: (player: any) => {
    // console.log('播放器初始化完成', player);
    // 可以在这里对player进行进一步配置
  },
  
  onPlay: (event: any) => {
    // console.log('开始播放', event);
    isPlaying.value = true;
  },
  
  onPause: (event) => {
    // console.log('暂停播放', event);
    isPlaying.value = false;
  },
  
  onEnded: (event) => {
    // console.log('播放结束', event);
    isPlaying.value = false;
  },
  
  onError: (error) => {
    // console.error('播放出错', error);
    // 可以在这里添加错误恢复逻辑
  },
  
  onTimeUpdate: (event) => {
    // 更新当前播放时间
    if (playerRef.value?.player) {
      currentTime.value = playerRef.value.player.currentTime();
    }
  },
  
  onQualityChanged: (quality) => {
    // console.log(`切换到${quality}p清晰度`);
    selectedQuality.value = quality;
  },
};

// 事件处理函数
export const onPlayerReady = (player: any) => {
  console.log('播放器就绪');
  
  // 获取视频时长
  duration.value = player.duration();
  
  // 预加载元数据
  player.preload('metadata');
  
};

export const onEnded = (event: any) => {
  // console.log('结束事件', event);
  isPlaying.value = false;
  tabVideo()
};

// 自定义控制方法
export const togglePlayback = () => {
  if (!playerRef.value?.player) return;
  
  if (isPlaying.value) {
    playerRef.value.player.pause();
  } else {
    playerRef.value.player.play();
  }
};

export const onPlayerError = (error: any) => {
    // console.error('播放器错误:', error);
    // 显示用户友好的错误消息
  };

export const toggleFullscreen = () => {
  if (!playerRef.value?.player) return;
  
  const player = playerRef.value.player;
  if (player.isFullscreen()) {
    player.exitFullscreen();
  } else {
    player.requestFullscreen();
  }
};

export const videoTypeList = reactive([
    {type: 'mv', url: 'https://www.cunshao.com/666666/api/web.php?t=123456'}
])
export const videoType = ref('mv' as any)
export const videoUrl = ref('' as any)
export const tabVideo = () => {
    if (videoType.value ==='mv') {
        const t = new Date().getTime()
        videoUrl.value = `https://www.cunshao.com/666666/api/web.php?t=${t}`
        setVideoSources([{src: videoUrl.value, type: 'video/mp4'}])
    } else {
        const index = videoList.value.findIndex(item => item.vid === videoId.value)
        console.log(videoList.value, 'videoList', videoId.value, 'videoId', index, 'index')
        videoId.value = videoList.value[index + 1]?.vid || videoList.value[0]?.vid
        getVideoDetailData()
    }
}

//  --------------------------- 163视频 -------------------------
// 视频列表
export const videoList = ref([] as any[]);
// 当前视频id
export const videoId = ref('');
export const getVideoData = async (type: string) => {
    const res = await getVideoList(type);
    videoList.value = res.data || [];
    videoId.value = res.data[0]?.vid || 'VK070HKUK';
    getVideoDetailData()
}
const getVideoDetailData = async () => {
    const res = await getVideoDetail(videoId.value);
    videoUrl.value = res.data?.mp4;
    setVideoSources([{src: videoUrl.value, type: 'application/x-mpegURL'}])
}

export const eventMessage = (event: any) => {
  const {key} = event.data;
  videoType.value = key.split('=')[1];
  console.log(videoType.value, 'videoType')
  if (!videoType.value) {
    videoUrl.value = videoTypeList[0].url || '';
    setVideoSources([{src: videoUrl.value, type: 'video/mp4'}])
  }
  else if (videoType.value === 'mv') {
      videoUrl.value = videoTypeList.find(item => item.type === videoType.value)?.url || '';
      setVideoSources([{src: videoUrl.value, type: 'video/mp4'}])
  } else {
      getVideoData(videoType.value)
  }
};