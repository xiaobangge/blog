<template>
  <div class="w-[23%] flex flex-col justify-between h-full overflow-hidden">
    <!-- top -->
    <div class="flex justify-center items-center w-full h-[30%] animate-move_left opacity-0">
      <div class="relative">
        <img
          src="@/assets/images/vdata/border.png"
          alt=""
          class="w-[224px] h-[224px]"
        />
        <div
          class="absolute top-[25%] left-[18%] w-[120px] h-[120px] flex flex-col justify-center items-center animate-rotate_main"
        >
          <img
            src="@/assets/images/vdata/cricle.png"
            alt=""
            class="absolute w-full h-full left-0 top-0"
          />
          <div class="text-[24px] leading-none mt-2">今日访客</div>
          <div class="text-[36px] font-bold leading-none">{{info.todayCount || 0}}</div>
        </div>
      </div>
    </div>
    <!-- center -->
    <div class="flex flex-col h-[40%] justify-center items-end w-full">
      <dian-view class="mb-[30px]" />
      <dian-view />
    </div>
    <!-- bottom -->
    <div class="flex justify-center items-end w-full h-[30%] mb-[-20px] animate-move_left opacity-0">
      <div
        class="ml-[50px] text-center"
        v-for="(item, index) in data.filter((_item, index) => index < 3)"
        :key="index"
      >
        <div class="text-[24px] font-bold" :style="{ color: item.color }">
          NO.{{ index + 1 }}
        </div>
        <div class="text-[22px] leading-none mb-[5px]">{{ item.value }}</div>
        <div class="text-[18px] leading-none">{{ item.address }}</div>
        <div
          class="w-[80px] h-[80px] rounded-full border-[1px] mt-[20px]"
          :style="{ borderColor: item.color }"
        ></div>
        <div
          class="w-[2px] bg-gradient-to-b to-transparent mx-auto"
          :class="`to-${item.color}`"
          :style="{ height: 100 + (4 - index) * 20 + 'px', '--tw-gradient-from': item.color }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DianView from "./dian.vue";
type Option = {
  address: string;
  color: string;
  value: number;
};
defineProps({
  data: {
    type: Array as () => Option[],
    default: () => [],
  },
  info: {
    type: Object,
    default: () => {}
  }
});
</script>