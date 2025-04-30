<template>
  <div class="w-full flex">
    <!-- 左侧菜单栏 -->
    <div class="w-[260px] mr-[30px]">
      <div class="bg w-full rounded-tr-2xl rounded-tl-2xl text-center text-white p-[1.5rem]">
        <div class="text-[30px] font-bold mb-[20px]">叶影凌枫</div>
        <div class="text-[18px] tracking-[10px]">水利万物而不争,而万物莫能与之争</div>
      </div>
      <div class="bg-white w-full rounded-br-2xl rounded-bl-2xl text-center p-[1.5rem] mb-[20px]">
        
      </div>

    </div>
    <!-- 右侧内容 -->
     <div class="flex-1"><slot></slot></div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.bg {
  background: linear-gradient(
    150deg,
    hsl(231, calc(71 * 1%), min(calc(63 * 1% + 10%), 100%)) 5%,
    #5e72e4 70%,
    hsl(231, calc(71 * 1%), max(calc(63 * 1% - 2.5%), 0%)) 94%
  );
}
</style>