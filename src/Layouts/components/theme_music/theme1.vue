<template>
  <div
    class="w-full h-full bg-[#525252] flex flex-col justify-center items-center"
  >
    <!-- 头部信息 -->
    <div
      class="flex justify-between items-center w-full py-[20px] px-[30px] text-[20px]"
    >
      <div>Sean 音乐面板</div>
      <div class="flex items-center justify-center">
        <!-- <el-tooltip
          class="box-item"
          effect="dark"
          content="修改颜色主题"
          placement="bottom"
        >
          <div class="py-[6px] px-[10px] rounded-[20px] bg-[#060608] flex">
            <div
              class="w-[24px] h-[24px] rounded-[50%] border-[3px] border-[#2ed466]"
            ></div>
            <div
              @click="theme = 2"
              class="w-[24px] h-[24px] rounded-[50%] bg-linear-to-r from-[#3b3a4e] to-[#272733] ml-[20px]"
            ></div>
          </div>
        </el-tooltip> -->
      </div>
      <div @click="emit('close')">
        <el-icon size="40" color="#060608"><CircleCloseFilled /></el-icon>
      </div>
    </div>
    <!-- 音乐播放器 -->
    <div class="h-[60vh] w-full">
      <div class="flex w-full h-full">
        <!-- 左侧音乐播放器 -->
        <div class="w-1/2 px-[100px] py-[50px] h-full">
          <div
            class="progress shadow-[41px_41px_82px_#474747,-41px_-41px_82px_#5d5d5d] rounded-3xl w-full h-full pt-[10px] flex flex-col justify-between items-center"
          >
            <div
              class="w-[180px] h-[180px] relative rounded-[50%] shadow-[inset_20px_20px_60px_#272727,inset_-20px_-20px_60px_#7d7d7d] mx-auto"
            >
              <el-progress
                class="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
                width="165"
                stroke-width="3"
                type="circle"
                :percentage="10"
                color="#409EFF"
              >
                <div></div>
              </el-progress>
              <div
                class="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[20px] w-[145px] h-[145px]"
              >
                <img
                  :src="currentMusic.pic"
                  class="w-full h-full rounded-[50%]"
                  alt=""
                />
              </div>
              <div
                class="absolute left-[50%] bottom-0 -translate-x-1/2 translate-10 text-nowrap text-[20px] text-center"
              >
                {{
                  currentMusic.title +
                  (currentMusic.author ? ` - ${currentMusic.author}` : "")
                }}
              </div>
            </div>
            <div class="flex justify-center items-center w-full pb-[50px]">
              <!-- 播放器 -->
              <div
                class="flex justify-center items-center cursor-pointer w-[60px] h-[60px] rounded-[50%] bg-[#525252] shadow-[9px_9px_19px_#272727,-9px_-9px_19px_#7d7d7d] mr-[50px]"
                v-for="(item, index) in musicActions"
                :key="index"
                @click="item.action"
              >
                <bk-svg
                  :iconName="item.icon"
                  className="w-[30px] h-[30px]"
                  color="#ddd"
                ></bk-svg>
              </div>
              <!-- 音量 -->
              <div class="flex justify-center items-center w-[200px]">
                <bk-svg
                  :iconName="yinliangIcon"
                  @click="setIsMute(!isMute)"
                  className="w-[30px] h-[30px] mr-[20px]"
                  color="#ddd"
                ></bk-svg>
                <el-slider
                  v-model="volumeValue"
                  show-tooltip
                  size="small"
                  class="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧音乐信息 -->
        <div class="w-1/2 px-[100px] py-[50px] h-full">
          <div class="w-full h-full overflow-hidden">
            <div
              class="w-[calc(100%+18px)] h-full pt-[10px] flex flex-col justify-between items-center overflow-y-auto"
              id="lyricUl"
            >
              <!-- 每一条歌词item -->
              <div
                ref="lyricLi"
                class="text-nowrap w-[200px] inline-block text-center py-[10px]"
                :class="{
                  'text-[rgba(255,255,255,0.5)] text-center':
                    lyricIndex > index,
                  'text-[#3fd155]': lyricIndex === index,
                  'text-[rgba(255,255,255,0.8)]': lyricIndex === index + 1,
                }"
                v-for="(item, index) in lyricList"
                :key="item.uid"
              >
                <span class="m-song-lrori">{{ item.words }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部音乐列表 -->
    <div class="flex-1 flex justify-center items-center w-full py-[20px] px-[30px] text-[20px] overflow-hidden">
        <div class="w-full h-[220px] overflow-hidden">
            <div class="w-full h-[calc(100%+17px)] flex flex-nowrap justify-between items-start overflow-auto" id="musicList">
            <div v-for="item in playList" :key="item.songid" 
                class="min-w-[400px] relative h-[220px] shadow-[inset_5px_5px_11px_#212121,inset_-5px_-5px_11px_#838383] rounded-[10px] flex flex-col justify-center items-center mr-[30px] ">
                <div class="w-full flex items-center px-[20px]">
                    <img :src="item.pic" class="w-[130px] h-[130px] rounded-[50%] mr-[30px]" :class="{ 'music-poster': playStatus && currentMusic.songid === item.songid }" alt="">
                    <!-- <el-avatar
                    size="large"
                    icon="Cherry"
                    shape="circle"
                    :src="item.pic || ''"
                    :class="{ 'music-poster': playStatus && currentMusic.songid === item.songid }"
                    ></el-avatar> -->
                    <div class="text-[20px] text-[#b9b9b9]">
                        <div class="text-lg font-bold">{{ item.title }}</div>
                        <div class="text-sm">{{ item.author }}</div>
                    </div>
                </div>
              <!-- 播放器 -->
              <div
                @click = "setCurrentMusic(item); pauseYy()"
                class="flex justify-center items-center cursor-pointer w-[50px] h-[50px] rounded-[50%] bg-[#525252] 
                        shadow-[9px_9px_19px_#272727,-9px_-9px_19px_#7d7d7d] absolute bottom-[20px] right-[20px]"
              >
                <bk-svg
                  :iconName="currentMusic.songid === item.songid ? 'icon-weibiaoti519' : 'icon-bofang'"
                  className="w-[24px] h-[24px]"
                  color="#ddd"
                ></bk-svg>
              </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMusicStore } from "@/store/Music";
const musicStore = useMusicStore();
const {
  playList,
  currentMusic,
  playStatus,
  videoMusicRef,
  volume,
  isMute,
  lyricIndex,
  lyricList,
} = toRefs(musicStore);
const {
  prevMusic,
  nextMusic,
  setCurrentMusic,
  setPlayStatus,
  setVolume,
  setIsMute,
} = musicStore;

watch(() => lyricIndex.value, (value) => {
    const H = (value || 0) * 44
    let lyricUl: any = document.getElementById("lyricUl")
    if (lyricUl && H > 350) {
        lyricUl.scrollTop = H - 350
    }
}, {immediate: true, deep: true})
watch(() => currentMusic.value, (value) => {
    const i = playList.value.findIndex((item: { songid: any; }) => item.songid === value.songid)
    if (i === -1) return;
    let musicList: any = document.getElementById("musicList")
    if (musicList && i > 2) {
        const W = (i-2) * 400 + (i - 3) * 20
        musicList.scrollLeft = W
    }
}, {immediate: true, deep: true})
//将图标改为播放按钮
const musicActions = computed(() => {
  return [
    {
      name: "上一首",
      icon: "icon-shangyishou1",
      action: () => prevMusic(pauseYy),
    },
    {
      name: "播放/暂停",
      icon: playStatus.value ? "icon-weibiaoti519" : "icon-bofang",
      action: () => pauseYy(),
    },
    {
      name: "下一首",
      icon: "icon-xiayishou1",
      action: () => nextMusic(pauseYy),
    },
  ];
});
const yinliangIcon = computed(() => {
  return volume.value > 0 && !isMute.value ? "icon-yinliang" : "icon-jingyin";
});
const emit = defineEmits(["close", "update:modelValue"]);
const volumeValue = computed({
  get: () => (isMute.value ? 0 : volume.value * 100),
  set: (value: number) => {
    isMute.value = value === 0;
    setVolume(value / 100);
  },
});
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
});
//暂停回调函数
function pauseYy() {
  setPlayStatus(!playStatus.value);
  setTimeout(() => {
    console.log(videoMusicRef);
    playStatus.value && videoMusicRef?.value?.play();
    !playStatus.value && videoMusicRef?.value?.pause();
  }, 300);
}
const theme = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit("update:modelValue", value);
  },
});
</script>

<style lang="scss" scoped>
.progress {
  ::v-deep(.el-progress-circle__track) {
    stroke: #525252;
  }
}
.music-poster {
  animation: rotate 10s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>