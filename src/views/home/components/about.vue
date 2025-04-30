<template>
  <div class="w-full h-full cursor-pointer">
    <div
      class="rounded-2xl bg-white p-[40px] relative h-[250px] overflow-hidden"
      @mouseover="show_text = true"
      @mouseout="show_text = false"
    >
      <h2 class="text-[30px] mb-[20px] relative z-10">关于</h2>
      <!-- 背景图片   动画 -->
      <div class="absolute top-0 left-0 z-0 w-full h-full overflow-hidden">
        <div
          class="flex flex-col justify-center items-center h-full rotate-[-36deg] animate-bounceKey"
        >
          <div class="flex items-center">
            <div
              class="flex items-center p-[20px] w-[120px] h-[120px] bg-white rounded-xl mr-[30px] shadow-[0_2px_16px_-3px_#00000026]"
              v-for="(item, index) in bg_imgs"
              :key="index"
            >
              <img :src="item" alt="" class="w-full h-full" />
            </div>
          </div>
          <div class="flex items-center mt-[30px] ml-[520px]">
            <div
              class="flex items-center p-[20px] w-[120px] h-[120px] bg-white rounded-xl mr-[30px] shadow-[0_2px_16px_-3px_#00000026]"
              v-for="(item, index) in bg_imgs"
              :key="index"
            >
              <img :src="item" alt="" class="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
      <!-- 鼠标经过显示文字 -->
      <div
        class="absolute top-0 left-0 translate-0 z-10 w-full h-full p-[40px] bg-linear-to-r from-[#425aefe6] from-35% via-[#3e92df] via-55% to-transparent"
        :class="{ 'animate-enter': show_text, 'animate-leave': !show_text }"
      >
        <div class="text-[40px] font-bold text-white mb-[20px]">去看看</div>
        <bk-svg
          iconName="icon-xiangyouyuanjiantouyoujiantoumianxing"
          className="w-[40px] h-[40px] mr-[10px]"
          color="#fff"
        ></bk-svg>
      </div>
    </div>
    <div class="flex justify-between items-center mt-[20px]">
      <div
        class="items-center transition-all duration-700 h-[90px] bg-linear-to-r rounded-2xl overflow-hidden flex item-center relative text-[#fff] px-[20px]"
        :class="`${item.from} ${item.to} 
                    ${
                      nowText === item.title
                        ? 'w-[50%]'
                        : nowText
                        ? 'w-[25%]'
                        : 'w-[32%]'
                    } ${index === 1 && 'mx-[20px]'}`"
        v-for="(item, index) in list"
        :key="index"
        @mouseover="nowText = item.title"
        @mouseout="nowText = ''"
      >
        <div class="text-[20px] font-bold">
          {{ item.title }}
          <div class="w-[30px] h-[2px] bg-white"></div>
        </div>
        <div
          class="absolute top-[50%] translate-y-[-50%] transition-all duration-700] z-10"
          :class="`${
            nowText === item.title
              ? 'rotate-0 opacity-[100%] w-[40px] h-[40px] right-[20px] animate-bounce'
              : ' right-[-20px] rotate-[36deg] opacity-[30%] w-[100px] h-[100px]'
          }`"
        >
          <bk-svg
            :iconName="item.icon"
            className="w-full h-full mr-[10px]"
            color="#fff"
          ></bk-svg>
        </div>
        <div
          v-show="nowText === item.title"
          class="absolute top-[50%] left-[55%] translate-x-[-50%] translate-y-[-50%] text-[26px] font-bold"
        >
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import java from "@/assets/images/toolco/java.png";
import maven from "@/assets/images/toolco/maven.png";
import mysql from "@/assets/images/toolco/mysql.png";
import redis from "@/assets/images/toolco/redis.png";
import spring from "@/assets/images/toolco/spring.png";
import Vue from "@/assets/images/toolco/Vue.png";
import { getStatisticsApi } from "@/api/Main";
import { useUserStore } from "@/store/User";
const { userInfo } = toRefs(useUserStore());
const bg_imgs = reactive([java, maven, Vue, redis, spring, mysql]);
const show_text = ref(false);
const nowText = ref("");
const statistics = ref({
  articleCount: 0,
  visitorCount: 0,
});
const getStatistics = async () => {
  const res = await getStatisticsApi();
  console.log(res);
  statistics.value = res.data;
};
const run_days = computed(() => {
    const date = new Date().getTime();
    const start_date = new Date(userInfo.value.created_at).getTime();
    console.log(date, start_date, userInfo);
    return Math.ceil((date - start_date) / (24 * 3600 * 1000));
})
const list = computed(() => {
  return [
    {
      title: "文章数量",
      value: statistics.value.articleCount,
      from: "from-[#358cff]",
      to: "to-[#25a8ff]",
      icon: "icon-navicon-wzgl",
    },
    {
      title: "运行天数",
      value: run_days.value,
      from: "from-[#ff6755]",
      to: "to-[#ff9146]",
      icon: "icon-yunhang",
    },
    {
      title: "访客数量",
      value: statistics.value.visitorCount,
      from: "from-[#07f0c5]",
      to: "to-[#1be9cb]",
      icon: "icon-bangong-fangkejiedai-fangkejiedai",
    },
  ];
});
onMounted(() => {
  getStatistics();
});
</script>

<style scoped lang="scss">
</style>