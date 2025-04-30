<template>
  <div
    class="w-full flex justify-center items-center text-white font-bold text-3xl leftbar cursor-pointer hover:underline-offset-2 hover:underline"
    @click="$router.push('/')"
  >
    Sean
  </div>
</template>

<script setup lang="ts">
import { ElIcon } from "element-plus";

const isFiniteHome = ref(false);
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>