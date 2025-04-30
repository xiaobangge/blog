<template>
    <div class="w-full h-full flex justify-center items-center flex-col">
        <div class="text-[40px] tracking-[5px] font-bold text-center text-[#fff] mb-[30px]">Sean' blog!</div>
        <div ref="titleRef" class="subtitle w-full flex justify-center items-center text-[24px]"></div>
    </div>
  </template>
  
  <script setup lang="ts">
    import TypeIt from 'typeit';
    const titleRef = ref(null);
  
    onMounted(() => {
      const typeIt = new TypeIt(titleRef.value, {
        strings: ["苔藓在寂静处低语，舒展成时光的韵脚"],
        speed: 500,
        breakLines: false,
        loop: true,
        lifeLike: true,
      });
      typeIt.go();
    });
  </script>
