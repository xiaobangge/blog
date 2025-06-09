 // stores/index.js
 import { defineStore } from 'pinia'

 import { formatLyric } from "@/utils/formatLyric";
 export const useMusicStore = defineStore('music', {
   state: () => ({
    // 当前播放的音乐
    currentMusic: {} as any,
    // 播放列表
    playList: [],
    // 播放模式
    playMode: 'order',
    // 播放状态
    playStatus: false,
    // 音量
    volume: 1,
    // 是否静音
    isMute: false,
    // 循环模式
    loopMode: 'all',
    // 播放进度
    currentTime: 0,
    // 播放器实例
    videoMusicRef: null as any,
    // 歌词列表
    lyricList: [],
    // 当前歌词索引
    lyricIndex: 0,
    stop: false,
   }),
   actions: {
    initRefs(el: any) {
        this.videoMusicRef = el
    },
    // 设置当前播放的音乐
    setCurrentMusic(music: {}) {
      this.currentMusic = music
      this.lyricList = formatLyric(this.currentMusic.lrc || "");
      // this.currentMusic.url = '/music' + this.currentMusic.url.split("com")[1];
      // console.log(this.currentMusic.url)
    },
    // 设置播放列表
    setPlayList(list: never[]) {
      this.playList = list
    },
    // 设置播放模式
    setPlayMode(mode: string) {
      this.playMode = mode
    },
    // 设置播放状态
    setPlayStatus(status: boolean) {
      this.playStatus = status
    },
    // 设置音量
    setVolume(volume: number) {
      this.volume = volume
      this.videoMusicRef.volume = volume
    },
    // 设置静音
    setIsMute(isMute: boolean) {
      this.isMute = isMute
      this.videoMusicRef.muted = isMute
    },
    // 设置循环模式
    setLoopMode(mode: string) {
      this.loopMode = mode
    },
    // 储存播放进度
    saveProgress(currentTime: number) {
      this.currentTime = currentTime
    },
    // 设置播放进度
    setProgress(currentTime: number) {
      this.currentTime = currentTime
      this.videoMusicRef.currentTime = currentTime
      this.stop = false
      this.setPlayStatus(false)
      this.pauseYy()
    },
    setStop() {
      this.stop = true
    },
    // 上一首
    prevMusic(next: () => void) {
        const index = this.playList.findIndex(
            (item: { songid: any }) => item.songid === this.currentMusic.songid
        );
        const num = index === 0 ? this.playList.length - 1 : index - 1;
        this.setCurrentMusic(this.playList[num])
        this.setPlayStatus(false)
        next?.();
    },
    // 下一首
    nextMusic(next: () => void) {
        const index = this.playList.findIndex(
          (item: { songid: any }) => item.songid === this.currentMusic.songid
        );
        const num = index === this.playList.length - 1 ? 0 : index + 1;
        this.setCurrentMusic(this.playList[num])
        this.setPlayStatus(false)
        next?.();
    },
    // 歌曲播放错误
    MusicError(next: () => void){
      if (!this.playStatus) {
        return
      }
      ElNotification({
        title: "",
        message: "歌曲播放异常，即将转到下一首",
        type: "error",
        duration: 1000,
      });
      setTimeout(() => {
        this.nextMusic(next)
      }, 1000);
    },
    audioTime(e: { target: { currentTime: number } }, next: () => void) {
        // 当前播放的时间
        if (this.stop) return;
        this.saveProgress(e.target.currentTime)
        for (let i = 0; i < this.lyricList.length; i++) {
          // 如果播放时间大于当前歌曲条目的时间
          if (this.currentTime > this.lyricList[i].time) {
            // 赋值激活选项
            this.lyricIndex = i;
            next?.();
          }
        }
      },
      pauseYy() {
        this.setPlayStatus(!this.playStatus);
        setTimeout(() => {
          this.playStatus && this.videoMusicRef?.play();
          !this.playStatus && this.videoMusicRef?.pause();
        }, 300);
      }
   }
 })
 