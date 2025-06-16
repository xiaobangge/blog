<template>
    <div class="flex-1 flex flex-col justify-between h-full relative mx-[50px]">
        <!-- 四边框 -->
        <div class="w-[15%] h-full bg-[url('@/assets/images/vdata/border1.png')] bg-contain bg-no-repeat bg-left absolute top-0 animate-come1 opacity-0"></div>
        <div class="w-[15%] h-full bg-[url('@/assets/images/vdata/border1.png')] bg-contain bg-no-repeat bg-left absolute right-0 top-0 rotate-y-180 animate-come2 opacity-0"></div>
        <div class="w-[60%] h-[15%] bg-[url('@/assets/images/vdata/border3.png')] bg-contain bg-no-repeat bg-center absolute top-[13%] left-[50%] -translate-x-1/2 animate-come3 opacity-0"></div>
        <div class="w-[60%] h-[15%] bg-[url('@/assets/images/vdata/border4.png')] bg-contain bg-no-repeat bg-center absolute bottom-[12%] left-[50%] -translate-x-1/2 animate-come4 opacity-0"></div>
        <!-- 左边柱状图 -->
        <div class="w-[4%] absolute left-[5%] top-1/2 -translate-y-1/2 animate-[show4_0.1s_linear_forwards_3.8s] opacity-0">
            <!-- 下三角 -->
             <div class="w-0 h-0 border-l-[20px] border-r-[20px] border-r-transparent border-l-transparent border-t-[30px] border-t-[#ff7a9a] mb-[-25px]"></div>
             <!-- 中心柱体 -->
              <div class="w-[12px] h-[24px] bg-[#ff7a9a] ml-[14px] my-[5px]" v-for="i in 10" :key="i"></div>
             <!-- 上三角 -->
             <div class="w-0 h-0 border-l-[20px] border-r-[20px] border-r-transparent border-l-transparent border-b-[30px] border-b-[#ff7a9a] mt-[-25px]"></div>
        </div>
        <!-- 右边柱状图 -->
        <div class="w-[4%] absolute right-[5%] top-1/2 -translate-y-1/2 animate-[show4_0.1s_linear_forwards_3.8s] opacity-0">
            <!-- 下三角 -->
             <div class="w-0 h-0 border-l-[20px] border-r-[20px] border-r-transparent border-l-transparent border-t-[30px] border-t-[#ff7a9a] mb-[-25px]"></div>
             <!-- 中心柱体 -->
              <div class="w-[12px] h-[24px] bg-[#ff7a9a] ml-[14px] my-[5px]" v-for="i in 10" :key="i"></div>
             <!-- 上三角 -->
             <div class="w-0 h-0 border-l-[20px] border-r-[20px] border-r-transparent border-l-transparent border-b-[30px] border-b-[#ff7a9a] mt-[-25px]"></div>
        </div>
        <!-- 两侧中括号 -->
        <div class="w-[10%] h-full bg-[url('@/assets/images/vdata/leftBorder.png')] bg-contain bg-no-repeat bg-left absolute top-0 animate-inner1 opacity-0"></div>
        <div class="w-[10%] h-full bg-[url('@/assets/images/vdata/leftBorder.png')] rotate-y-180 bg-contain bg-no-repeat bg-left absolute top-0 animate-inner2 opacity-0"></div>
        <!-- 两侧动画箭头 -->
         <div class="w-[10%] h-[20%] flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-[10%] animate-arrow1 opacity-0">
            <div class="w-[20px] h-[20px] rounded-full bg-[#00e4c8]"></div>
            <div class="w-[20px] h-[20px] rounded-full bg-[#00e4c8] mx-[10px]"></div>
            <div class="bg-[url('@/assets/images/vdata/arrow-r.png')] bg-contain bg-no-repeat bg-center w-[30px] h-[50px] rotate-y-180"></div>
         </div>
         <div class="w-[10%] h-[20%] flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-[10%] animate-arrow2 opacity-0">
            <div class="bg-[url('@/assets/images/vdata/arrow-r.png')] bg-contain bg-no-repeat bg-center w-[30px] h-[50px]"></div>
            <div class="w-[20px] h-[20px] rounded-full bg-[#00e4c8] mx-[10px]"></div>
            <div class="w-[20px] h-[20px] rounded-full bg-[#00e4c8]"></div>
         </div>
         <!-- 环形 -->
        <div class="w-[50%] h-[60%] bg-[url('@/assets/images/vdata/huan.png')] bg-center bg-no-repeat absolute top-1/2 left-1/2 animate-meter opacity-0 z-10 bg-size-[100%]"></div>
        <!-- 中心区域内容 -->
         <div class="w-[300px] h-[300px] bg-[url('@/assets/images/vdata/cicle.png')] bg-center  bg-size-[100%] bg-no-repeat absolute top-1/2 left-1/2 animate-sale opacity-0 ml-[-150px] mt-[-150px] flex flex-col justify-center items-center z-20">
             <div class="text-center text-white font-bold text-[24px]">访客量</div>
             <div class="text-center text-white font-bold text-[48px]">{{info?.totalCount ?? 0}}</div>
         </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
  info: {
      type: Object,
      default: () => {}
  }
});
</script>