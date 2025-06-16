<script setup lang="ts">
import axios from "axios";
import WelcomeLog from "./components/WelcomeLog.vue";
import initTx from "@/utils/effects";
import { useUserStore } from "@/store/User";
import { useConfigStore } from "@/store/Config";
const configStore = useConfigStore();
const { isLoading } = toRefs(configStore);
const userStore = useUserStore();
const { initUserInfo, saveVisitInfo } = userStore;
const route = useRoute();
const dscVideoRef = ref(null);
const dscDiv = ref(null);
watch(
  () => route.name,
  (newV) => {
    if (newV !== "Zhongxin") {
      window.scrollTo(0, 0);
    }
  }
);
//禁用f12
if (window.location.hostname != "localhost") {
  document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("keydown", function (e) {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
        //禁用F12
        e.preventDefault();

        //弹出视频
        dscDiv.value.style.display = "block";
        dscVideoRef.value.play();
        setTimeout(() => {
          dscDiv.value.style.display = "none";
        }, 2500);
      }
    });
  });
}

onMounted(() => {
  initTx();
  initUserInfo();
  //首次进入欢迎弹窗
    axios
      .get("https://api.vvhan.com/api/visitor.info")

      .then((response) => {
        const data = response.data;
        if (data.success) {
          saveVisitInfo(data);
          if (!localStorage.getItem("adublogHY")) {
          ElNotification({
            icon: WelcomeLog,
            title: "你好",
            dangerouslyUseHTMLString: true,
            message:
              "欢迎来自" +
              data.location +
              "的小伙伴<br/><a>" +
              data.system +
              " " +
              data.browser +
              "</a>",
            showClose: false,
            offset: 80,
            duration: 2500,
          });
          localStorage.setItem("adublogHY", true);
        }
      }
    })
    .catch();

  //粒子
  async (engine: any) => {
    await loadSlim(engine);
  };

});
  const showBg = () => {
    const path = route.path;
    const paths = ["/Video"]
    return !paths.includes(path);
  }
</script>

<template>
  <div class="flex flex-col min-h-[100vh]" :class="{'bg-[#e8ecf8]': showBg()}">
    <router-view></router-view>
    <bk-loading v-if="isLoading"></bk-loading>
    <div
      class="fixed left-0 top-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.8)] z-9999 hidden"
      ref="dscDiv"
    >
      <video
        ref="dscVideoRef"
        class="w-[30vw] fixed top-[50%] left-[50%] origin-top-left -translate-1/2"
      >
        <source src="@/assets/video/dscnygsm.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>