<template>
  <div class="flex justify-center items-center h-full flex-nowrap mr-[30px]" :class="{'text-[#222]': isWritePath()}">
    <!-- 播放器海报 -->
    <el-avatar
      size="large"
      icon="Cherry"
      shape="circle"
      :src="currentMusic.pic || ''"
      :class="{ 'music-poster': playStatus }"
      @click="drawer = true"
    ></el-avatar>
    <div>
      <!-- 歌词滚动包裹盒子 -->
      <div
        class="w-[200px] overflow-hidden h-[30px] text-[14px] ml-[20px]"
        ref="lyricWarp"
      >
        <!-- 歌词内容体 -->
        <div
          class="w-full text-nowrap justify-start clear-both items-center"
          ref="lyricUl"
        >
          <!-- 每一条歌词item -->
          <div
            ref="lyricLi"
            class="text-nowrap w-[200px] inline-block"
            v-for="(item, index) in lyricList"
            :key="item.uid"
            :class="{ activeLyric: lyricIndex === index }"
          >
            <span class="m-song-lrori">{{ item.words }}</span>
          </div>
        </div>
      </div>

      <!-- 播放器 -->
      <div class="flex items-start justify-start flex-nowrap w-[180px]">
        <div
          class="flex justify-center items-center ml-[20px] cursor-pointer"
          @click="prevMusic(pauseYy)"
        >
          <bk-svg
            iconName="icon-shangyishou1"
            className="w-[20px] h-[20px]"
            :color="TextColor"
          ></bk-svg>
        </div>
        <div
          @click="pauseYy"
          class="flex justify-center items-center ml-[20px] cursor-pointer"
        >
          <bk-svg
            :iconName="music_play"
            className="w-[20px] h-[20px]"
            :color="TextColor"
          ></bk-svg>
        </div>
        <div
          class="flex justify-center items-center ml-[20px] cursor-pointer"
          @click="nextMusic(pauseYy)"
        >
          <bk-svg
            iconName="icon-xiayishou1"
            className="w-[20px] h-[20px]"
            :color="TextColor"
          ></bk-svg>
        </div>
      </div>
    </div>
    <div
      class="flex justify-center items-center ml-[20px] relative"
      @mouseenter="showList = true"
      @mouseleave="showList = false"
    >
      <bk-svg
        iconName="icon-a-yinlebofangliebiaoyinle"
        className="w-[30px] h-[30px]"
        :color="TextColor || '#909399'"
      ></bk-svg>
      <transition>
        <div
          v-show="playList.length > 0 && showList"
          class="pt-[20px] absolute bottom-0 right-0 translate-y-full"
        >
          <div
            class="bg-white rounded-[12px] overflow-hidden p-[10px] border-1 border-[#425aef]"
          >
            <div class="w-full h-full max-h-[300px] overflow-auto">
              <div
                class="flex justify-start flex-nowrap text-[#333] items-center min-w-[150px] text-nowrap text-sm cursor-pointer hover:text-[#425aef] py-[5px]"
                :class="{
                  'text-[#425aef]': item.songid === currentMusic.songid,
                }"
                @click="checkMusic(item)"
                v-for="item in playList"
                :key="item.songid"
              >
                <bk-svg
                  :iconName="
                    item.songid === currentMusic.songid
                      ? 'icon-yinle'
                      : 'icon-bofang'
                  "
                  className="mr-[10px]"
                  :class="{
                    'w-[20px] h-[20px] music-poster':
                      playStatus && item.songid === currentMusic.songid,
                    'w-[10px] h-[10px]':
                      !playStatus || item.songid !== currentMusic.songid,
                  }"
                ></bk-svg>
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- <music-theme v-model="drawer"></music-theme> -->
    <el-drawer
      v-model="drawer"
      direction="ttb"
      size="100%"
      close-on-press-escape
      :with-header="false"
      body-class="music-theme-drawer"
    >
      <Theme1 v-if="theme === 1" v-model="theme" @close="drawer = false" />
      <Theme2 v-else v-model="theme" @close="drawer = false" />
    </el-drawer>
    <audio
      :src="videoUrl"
      :ref="initRefs"
      :volume="volume"
      class="hidden"
      @timeupdate="(e) => audioTime(e, audioTimeAction)"
      @ended="nextMusic(pauseYy)"
      @error="MusicError(pauseYy)"
      @loadeddata="loadedDataEvent"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { getMusicList } from "@/api/music";
import { MUSIC } from "@/types/Music";
// import MusicTheme from "./MusicTheme.vue"
import Theme1 from "./theme_music/theme1.vue";
import Theme2 from "./theme_music/theme2.vue";
const theme = ref(1);
import { useMusicStore } from "@/store/Music";
import {useUserStore} from '@/store/User'
const {isWritePath} = useUserStore()
const musicStore = useMusicStore();
const { playList, currentMusic, playStatus, videoMusicRef, lyricList, lyricIndex } =
  toRefs(musicStore);
const {
  setCurrentMusic,
  setPlayList,
  setPlayStatus,
  prevMusic,
  nextMusic,
  MusicError,
  volume,
  initRefs,
  audioTime
} = musicStore;
const drawer = ref(false);
const TextColor = computed(() => {
  return isWritePath() ? '#222' : '#fff'
});
// 定义是否显示歌曲列表
const showList = ref(false);
// 定义获取音乐列表方法
const initMusicList = async () => {
  try {
    // const data = await getMusicList();
    // console.log(data)
    // getMusicList('52144').then((data) => {
    //   console.log(data)
    // })
    const response = await fetch("/file/json/music.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    setPlayList(data.music);
    setCurrentMusic(playList.value[0] || {});
    // formatLyric
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
const loadedDataEvent = (e) => {
  console.log("loadedDataEvent", e)
}

//将图标改为播放按钮
const music_play = computed(() =>
  playStatus.value ? "icon-weibiaoti519" : "icon-bofang"
);
// 赋值激活选项

const videoUrl = computed(() => {
  return currentMusic.value.url || "";
});
//暂停回调函数
function pauseYy() {
  setPlayStatus(!playStatus.value);
  lyricIndex.value = 0;
  // 歌词内容体dom通过transform:translateY实现歌词滚动
  lyricUl.value.style.transform = `translateX(0)`;
  setTimeout(() => {
    playStatus.value && videoMusicRef.value?.play();
    !playStatus.value && videoMusicRef.value?.pause();
  }, 300);
}

// 点击歌曲播放
const checkMusic = (item: MUSIC) => {
  setCurrentMusic(item);
  setPlayStatus(false);
  pauseYy();
};

// 歌词滚动// 歌词的包裹容器dom
const lyricWarp = ref(null);
const lyricLi = ref([]);
// 歌词内容体dom
const lyricUl = ref(null as any);
// 当前播放时间
// 音频播放时间更新的事件
const audioTimeAction = () => {
    // 歌词内容体dom通过transform:translateY实现歌词滚动
    const translateX = lyricLi.value[0]?.offsetWidth * lyricIndex.value;
    lyricUl.value.style.transform = `translateX(-${translateX}px)`
};

// 监听音乐播放状态
onMounted(() => {
  initMusicList();
});
</script>

<style lang="scss" scoped>
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