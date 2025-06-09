<template>
  <div id="aiccAudio" class="w-full relative">
    <div id="wavefrom" ref="wavefrom" @click="getTime" v-show="successWave"></div>
    <div class="w-full text-[14px]" v-if="!successWave">
        <div>{{currentMusic.title + " - " + currentMusic.author}}</div>
        <el-slider v-model="currentTime" :max="lyricList[lyricList.length-1].time" @change="getTime" />
    </div>
    <div class="w-full absolute top-0 left-0 h-full flex justify-center items-center z-100" v-if="loading">
      <!-- 背景音乐 -->
       <div
        class="w-full h-full absolute left-0 top-0  bg-(--theme-color)"></div>
        <div class="relative">音频波形加载中...{{ LoadingText }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import WaveSurfer from "wavesurfer.js"; //导入wavesurfer.js
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import { getMusic } from "@/api/music";
import { useMusicStore } from "@/store/Music";
const musicStore = useMusicStore();
const {
  currentMusic,
  currentTime,
  lyricList
} = toRefs(musicStore);
const {setProgress, setStop} = musicStore
const loading = ref(true);
const LoadingText = ref("0%");
const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  wavePress: {
    type: Number,
    default: 0,
},
  recordPath: {
    type: String,
    default: "",
  },
});
const wavesurfer = ref(null as unknown as WaveSurfer);
const speedValue = ref(1.0);
const volume = ref(30); //音量
const audioVolumeStatus = ref(false); //是否静音
const wavefrom = ref("" as unknown as HTMLElement);
const successWave = ref(true)

//点击获取点击进度
const getTime = (_num?: any) => {
    //加定时器，不然获取的是点击前的播放时间
    setStop()
    setTimeout(() => {
        if (successWave.value) {
            setProgress(wavesurfer.value.getCurrentTime())
        } else {
            setProgress(_num)
        }
    }, 100);
};
// 监听键盘
const keyDown = () => {
  if (props.recordPath != null && props.recordPath != "") {
    document.onkeydown = (e) => {
      //事件对象兼容
      var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
      //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
      //左
      if (eCode == 37) {
        // 按下左箭头
        wavesurfer.value.skip(-6);
        getTime();
      } else if (eCode == 39) {
        // 按下右箭头
        wavesurfer.value.skip(6);
        getTime();
      }
    };
  }
};
//静音开启关闭
const volumeStatusChange = () => {
  audioVolumeStatus.value = true;
  volume.value = 0;
  wavesurfer.value.setVolume(0);
};
keyDown();
const initMusic = (url: Blob) => {
  wavesurfer.value.loadBlob(url);
    wavesurfer.value.on("loading", (time) => {
        console.log("loading", time);
        LoadingText.value = `${time}%`;
    });
  volumeStatusChange();
};
watch(
  () => currentMusic.value.url,
  () => {
    loading.value = true;
    LoadingText.value = "";
    successWave.value = true;
    getMusic({ url: currentMusic.value.url }).then((res) => {
      initMusic(res);
    });
  },
  { immediate: true }
);
watch(
  () => currentTime.value,
  () => {
    wavesurfer.value?.setTime(currentTime.value);
  }
);
onMounted(() => {
  if (props.recordPath != null && props.recordPath != "") {
    wavesurfer.value = WaveSurfer.create({
      container: wavefrom.value,
      height: 60,
      waveColor: "rgb(255,255,255)",
      progressColor: "#00f2fe",
      cursorColor: "#00f2fe", //指示播放头位置的光标填充颜色
      cursorWidth: 2,
      // backend: 'MediaElement',
      mediaControls: false,
      audioRate: speedValue.value,
      hideScrollbar: true,
      plugins: [
        Hover.create({
          lineColor: "#ff0000",
          lineWidth: 2,
          labelBackground: "#555",
          labelColor: "#fff",
          labelSize: "11px",
        }),
      ],
    });
    //音频加载完成触发
    wavesurfer.value.on("ready", () => {
        wavesurfer.value.setVolume(volume.value / 100);
        loading.value = false;
        LoadingText.value = "100%";
        successWave.value = true;
    });
    wavesurfer.value.on("click", () => {
        getTime()
    });
    wavesurfer.value.on('error', () => {
        loading.value = false;
        LoadingText.value = "0%";
        successWave.value = false;
        ElNotification({
            title: "",
            message: "音频波形加载失败，显示音频进度条",
            type: "error",
            duration: 1000,
        });
    });
  }
});
onUnmounted(() => {
  wavesurfer.value?.destroy();
  wavesurfer.value = null as unknown as WaveSurfer;
});
</script>
