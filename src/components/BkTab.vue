<template>
  <div
    class="bg-white relative flex items-center pb-[15px] border-b-[1px] border-[#e5e5e5]"
  >
    <div
      class="flex cursor-pointer items-center justify-center mr-[10px] md:mr-[50px] h-full hover:text-(--theme-color)"
      v-for="(item, index) in data"
      ref="tabRef"
      :key="index"
      :class="{ 'text-(--theme-color)': active === index }"
      @click="active = index"
    >
      <bk-svg v-if="item.icon" :iconName="item.icon" className="w-[14px] h-[14px] md:w-[20px] md:h-[20px]"></bk-svg>
      <p class="ml-[10px] text-[14px] md:text-[16px] text-nowrap">{{ item.name }}</p>
    </div>
    <div ref="arrowRef" class="transition-all duration-300 ease-in-out absolute left-0 bottom-0">
        <bk-svg iconName="icon-icon_mode"></bk-svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue', 'click']);
const tabRef = ref(null as any);
const arrowRef = ref(null as any);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  data: {
    type: Array,
    default: () => [],
  },
});
const active = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emit('update:modelValue', val);
      setTimeout(() => {
        handleClick(val);
      }, 300);
    }
})
const handleClick = (index: number) => {
  if (!props.data?.length) return;
  const tab = tabRef.value[index];
  const arrow = arrowRef.value;
  const tabLeft = tab.offsetLeft;
  const tabWidth = tab.offsetWidth;
  const arrowWidth = arrow.offsetWidth;
  const arrowLeftNew = tabLeft + tabWidth / 2 - arrowWidth / 2;
  arrow.style.left = `${arrowLeftNew}px`;
  emit('click', index);
}

onMounted(() => {
    handleClick(active.value);
})
</script>