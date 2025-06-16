<template>
  <div class="flex justify-center items-center">
    <div
      class="mr-1 bg-[#00e4c8] rounded-2xl opacity-0"
      v-for="item in list"
      :key="item.w"
      :style="{ width: item.w + 'px', height: item.h + 'px', marginLeft: item.ml + 'px', animation: 'show4 0.1s linear forwards '+item.time+'s' }"
    ></div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  direction: {
    type: String,
    default: "left",
  },
});

const dians = reactive([
  { w: 8, h: 8, time: 1.5 },
  { w: 8.63, h: 8.63, time: 1.6 },
  { w: 9.27, h: 9.27, time: 1.7 },
  { w: 10, h: 10, time: 1.8 },
  { w: 10.5, h: 10.5, time: 1.9 },
  { w: 11.2, h: 64, time: 2, ml: 10 },
  { w: 11.8, h: 95, time: 2.1, ml: 10 },
]);

const list = computed(() => {
  if (props.direction === "left") return dians;
  else return Array.from(dians).reverse();
});
</script>