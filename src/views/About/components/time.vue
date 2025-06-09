<template>
  <div
    class="w-full h-full flex flex-col bg-[url(@/assets/images/aboutTime.jpg)] bg-size-cover justify-center items-center text-white"
  >
    <div class="text-[36px]">{{ timeInfo.year }}年倒计时</div>
    <div class="flex mt-[20px]">
      <div class="flex flex-col justify-center items-center">
        <div class="text-[60px] leading-none">{{ timeInfo.month }}</div>
        <div class="text-[24px]">月</div>
      </div>
      <div class="flex flex-col justify-center items-center ml-[30px]">
        <div class="text-[60px] leading-none">{{ timeInfo.day }}</div>
        <div class="text-[24px]">天</div>
      </div>
      <div class="flex flex-col justify-center items-center ml-[30px]">
        <div class="text-[60px] leading-none">{{ timeInfo.hour }}</div>
        <div class="text-[24px]">时</div>
      </div>
      <div class="flex flex-col justify-center items-center ml-[30px]">
        <div class="text-[60px] leading-none">{{ timeInfo.minute }}</div>
        <div class="text-[24px]">分</div>
      </div>
      <div class="flex flex-col justify-center items-center ml-[30px]">
        <div class="text-[60px] leading-none">{{ timeInfo.second }}</div>
        <div class="text-[24px]">秒</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import moment from "moment";
const timeInfo = reactive({
  year: "0",
  month: "0",
  day: "0",
  hour: "0",
  minute: "0",
  second: "0",
});
const init = () => {
  const now = moment();
  const year = now.year() + 1;
  timeInfo.year = String(year);
  const time = moment(new Date(year, 0, 1));
  const diff = time.diff(now, "seconds");
  const month: number = Math.floor(diff / (30 * 24 * 60 * 60));
  const day: number = Math.floor((diff % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
  const hour: number = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
  const minute: number = Math.floor((diff % (60 * 60)) / 60);
  const second: number = Math.floor(diff % 60);
  timeInfo.month = month < 10 ? "0" + month : String(month);
  timeInfo.day = day < 10 ? "0" + day : String(day);
  timeInfo.hour = hour < 10 ? "0" + hour : String(hour);
  timeInfo.minute = minute < 10 ? "0" + minute : String(minute);
  timeInfo.second = second < 10 ? "0" + second : String(second);
};
onMounted(() => {
  init();
  setInterval(() => {
    init();
  }, 1000);
});
</script>