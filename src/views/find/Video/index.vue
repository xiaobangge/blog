<template>
  <div class="w-[400px] p-[20px] rounded-md bg-white mx-auto">
    <video ref="VideoRef" controls class="!w-full !h-[600px] overflow-hidden relative" object-fit="fill" :onended="tabVideo">
        <source :src="videoUrl"  type="application/x-mpegURL" />
        <source :src="videoUrl"  type="video/mp4" />
    </video>
    <div class="mt-[20px] flex justify-between items-center">
        <el-button type="primary" @click="checkVideo">播放/暂停</el-button>
        <el-button type="primary" @click="tabVideo">换一位</el-button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import VideoJs from 'video.js'
// import 'video.js/dist/video-js.css'
import {getVideoList, getVideoDetail} from "@/api/music";
const videoTypeList = reactive([
    {type: 'mv', url: 'https://www.cunshao.com/666666/api/web.php?t=123456'}
])
const videoType = ref('mv' as any)
const videoUrl = ref('' as any)
const VideoRef = ref(null as any)
const VideoJSRef = ref(null as any)
// --------------------------- 美女视频 ------------------------------
const checkVideo = () => {
    const video = VideoRef.value
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
const tabVideo = () => {
    if (videoType.value ==='mv') {
        const t = new Date().getTime()
        const src = videoUrl.value.split('?')[0]
        videoUrl.value = src + `?t=${t}`
    } else {
        const index = videoList.value.findIndex(item => item.vid === videoId.value)
        videoId.value = videoList.value[index + 1]?.vid || videoList.value[0]?.vid
        getVideoDetailData()
    }
    VideoRef.value?.load()
    setTimeout(() => {
        VideoRef.value?.play()
    }, 500)
}

//  --------------------------- 163视频 -------------------------
// 视频列表
const videoList = ref([] as any[]);
// 当前视频id
const videoId = ref('');
const getVideoData = async (type: string) => {
    const res = await getVideoList(type);
    videoList.value = res.data || [];
    videoId.value = res.data[0]?.vid || 'VK070HKUK';
    getVideoDetailData()
}
const getVideoDetailData = async () => {
    const res = await getVideoDetail(videoId.value);
    videoUrl.value = res.data?.m3u8;
}
watch(() => videoUrl.value, () => {
    if (VideoJSRef.value) {
        nextTick(() => {
            VideoJSRef.value.src({src: videoUrl.value, type: 'application/x-mpegURL'});
        })
    }
})
onMounted(() => {
  VideoJSRef.value = VideoJs(VideoRef.value)
  window.addEventListener("message", function (event) {
    const {key} = event.data;
    videoType.value = key.split('=')[1];
    if (!videoType.value) videoUrl.value = videoTypeList[0].url;
    else if (videoType.value === 'mv') {
        videoUrl.value = videoTypeList.find(item => item.type === videoType.value)?.url || '';
    } else {
        getVideoData(videoType.value)
    }
  });
});
</script>

<style lang="scss" scoped>
.vjs-tech {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}
.vjs-modal-dialog-content {
    display: none;
}
</style>