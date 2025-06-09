<template>
    <div
      class="w-full h-full flex flex-col justify-center items-center text-[#fff] relative bg-(--theme-color)"
    >
      <!-- 背景音乐 -->
       <div
        class="w-full h-full absolute left-0 top-0 bg-cover bg-center opacity-[0.5] blur-[85px]"
        :style="`background-image: url(${currentMusic.pic})`">
    </div>
      <!-- 头部信息 -->
      <div
        class="relative flex justify-between items-center w-full py-[20px] px-[30px] text-[20px]"
      >
        <div>Sean 音乐面板</div>
        <div class="flex items-center justify-center">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="修改颜色主题"
            placement="bottom"
          >
            <div class="py-[6px] px-[10px] rounded-[20px] bg-[#060608] flex">
              <div
                @click="theme = 1"
                class="w-[24px] h-[24px] rounded-[50%] bg-linear-to-r from-[#3b3a4e] to-[#272733]"
              ></div>
              <div
                class="w-[24px] h-[24px] rounded-[50%] border-[3px] border-[#2ed466]  ml-[20px]"
              ></div>
            </div>
          </el-tooltip>
        </div>
        <div @click="emit('close')">
          <el-icon size="40" color="#060608"><CircleCloseFilled /></el-icon>
        </div>
      </div>
      <!-- 音乐播放器 -->
       <div class=" relative h-[50vh] overflow-hidden flex w-full">
        <div class="flex-1 px-[100px] py-[50px] h-full flex flex-col">
            <!-- <div class="mb-[30px] w-[100px] py-[5px] rounded-[4px] border-[1px] border-[#fff] cursor-pointer text-center hover:border-(--theme-color) hover:text-(--theme-color)">全部播放</div> -->
            <ul class="flex border-b-[1px] border-[rgba(150,150,150,0.3)]">
                <li class="flex-2 py-[10px]">歌曲</li>
                <li class="flex-1 py-[10px]">歌手</li>
                <li class="w-[100px] py-[10px]">操作</li>
            </ul>
            <div class="w-full flex-1 overflow-auto">
                <ul class="flex border-b-[1px] border-[rgba(150,150,150,0.3)]" 
                    v-for="(item, index) in playList" :key="item.songid"
                    :class="{'text-[#0cfc1e]': currentMusic.songid === item.songid}">
                    <li class="flex-2 py-[10px]">{{index+1}}、 {{item.title}}</li>
                    <li class="flex-1 py-[10px]">{{item.author}}</li>
                    <li class="w-[100px] py-[10px]" @click="checkSong(item)">
                        <bk-svg
                        :iconName="currentMusic.songid === item.songid && playStatus ? 'icon-weibiaoti519' : 'icon-bofang'"
                        className="w-[24px] h-[24px]"
                        :color="currentMusic.songid === item.songid ? '#0cfc1e' : '#ddd'"
                        ></bk-svg>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 右侧音乐信息 -->
        <div class="ml-[100px] mr-[200px] py-[50px] h-full w-[300px] overflow-x-hidden flex flex-col">
          <div class="w-full flex flex-col justify-between items-center">
            <div class="w-[186px] h-[186px] relative">
                <img :src="currentMusic.pic" alt="" class="rounded-[10px]"/>
                <img src="@/assets/images/album_cover_player.png" class="absolute w-[100%] h-[100%] top-[0] left-[0] ml-[10px]" alt="" />
            </div>

            <div
                class="text-nowrap text-[20px] text-center mt-[10px]"
              >
                歌名： {{
                  currentMusic.title 
                }}
              </div>
            <div
                class="text-nowrap text-[20px] text-center mb-[30px] "
                v-if="currentMusic.author"
              >
                歌手： {{
                  currentMusic.author
                }}
              </div>
          </div>
          <div class="w-full  flex-1 overflow-hidden">
            <div
              class="w-[calc(100%+18px)] h-full pt-[10px] flex flex-col justify-between items-center overflow-y-auto overflow-x-hidden"
              id="lyricUl"
            >
              <!-- 每一条歌词item -->
              <div
                ref="lyricLi"
                class="text-nowrap w-[200px] inline-block text-center py-[3px]"
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
       <div class="relative w-full flex-1 flex flex-col justify-end items-center">

        <div class="flex justify-center items-center w-full pb-[50px] px-[50px]">
              <!-- 播放器 -->
              <div
                class="flex justify-center items-center cursor-pointer mr-[50px]"
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
              <!-- 进度条 -->
               <div class="flex flex-1 justify-center items-center  mx-[50px]">
                <wave-surfer :src="currentMusic.url" recordPath="recordPath" :wavePress="currentTime" />
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
</template>

<script setup lang="ts">
const emit = defineEmits(["close", "update:modelValue"]);
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
  currentTime
} = toRefs(musicStore);
const {
  prevMusic,
  nextMusic,
  setCurrentMusic,
  setPlayStatus,
  setVolume,
  setIsMute,
  pauseYy
} = musicStore;

watch(() => lyricIndex.value, (value) => {
    const H = (value || 0) * 30
    let lyricUl: any = document.getElementById("lyricUl")
    if (lyricUl && H > 150) {
        lyricUl.scrollTop = H - 150
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
const props = defineProps({
  modelValue: {
    type: Number,
    default: 2,
  },
});
const theme = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit("update:modelValue", value);
  },
});
const volumeValue = computed({
  get: () => (isMute.value ? 0 : volume.value * 100),
  set: (value: number) => {
    isMute.value = value === 0;
    setVolume(value / 100);
  },
});
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
const checkSong = (item) => {
    if (currentMusic.value.songid === item.songid) {
        pauseYy();
    } else {
        setCurrentMusic(item);
        setPlayStatus(false);
        pauseYy();
    }
}
const yinliangIcon = computed(() => {
  return volume.value > 0 && !isMute.value ? "icon-yinliang" : "icon-jingyin";
});
</script>

<style scoped>

</style>