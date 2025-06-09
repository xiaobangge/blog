<template>
  <div class="w-[400px] p-[20px] rounded-md bg-white mx-auto">
    <bk-video
      ref="playerRef"
      :options="videoOptions"
      :events="videoEvents"
      :responsive="true"
      playerClass="my-custom-player"
      @ready="onPlayerReady"
      @ended="onEnded"
      @error="onPlayerError"
      class="h-[600px]"
    />
    <div class="mt-[20px] flex justify-between items-center">
      <el-button type="primary" @click="togglePlayback">播放/暂停</el-button>
      <el-button type="primary" @click="toggleFullscreen">全屏</el-button>
      <el-button type="primary" @click="tabVideo">换一位</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BkVideo from "@/components/BkVideo";
import {
  videoOptions,
  videoEvents,
  onPlayerReady,
  onEnded,
  onPlayerError,
  toggleFullscreen,
  playerRef,
  eventMessage,
  togglePlayback,
  tabVideo,
} from "../Video";

onMounted(() => {
  window.addEventListener("message", eventMessage);
});
onUnmounted(() => {
  window.removeEventListener("message", eventMessage);
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
