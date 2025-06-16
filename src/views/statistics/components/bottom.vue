<template>
  <LoopScroll class="w-full" :dataSource="logs" itemKey="id" direction="left">
    <template #default="{ item }">
      <div
        class="w-[30vw] h-[30vh] mx-[1.5%] bg-[url('@/assets/images/vdata/di.png')] bg-no-repeat bg-bottom animate-di21 opacity-100"
      >
        <div
          class="w-full h-[60%] bg-[url('@/assets/images/vdata/bg.png')] bg-no-repeat bg-center animate-show51 opacity-100"
        >
            <!-- center  -->
            <div class="flex flex-col justify-center items-center h-full">
                <bk-svg
                    :iconName="iconMap[item.type]"
                    class="w-[24px] h-[24px] ml-[-5px]"
                    color="var(--theme-color)"
                />
                <div class="text-center text-lg font-bold mt-2">{{item.sourceName}}</div>
            </div>
        </div>
      </div>
    </template>
  </LoopScroll>
</template>
<script lang='ts' setup>
import { LoopScroll } from "@joyday/vue-loop-scroll";
import { getLogApi } from "@/api/Main";
const typeName = ref({
  1: "友链",
  2: "文章",
  3: "留言",
  4: "闲言碎语",
  5: "文章",
  6: "点赞",
} as any);
const iconMap = ref({
  1: "icon-lianjie",
  2: "icon-a-liaotianpinglun",
  3: "icon-duzheliuyan",
  4: "icon-liuyanban",
  5: "icon-yuedu",
  6: "icon-dianzan11",
  9: "icon-daohang",
} as any);
const list = ref(["", "", "", "", ""]);
const logs = ref([] as any[]);
const getLog = async () => {
  const res = await getLogApi();
  logs.value = res.data?.list || [];
};
onMounted(() => {
  getLog();
});
</script>