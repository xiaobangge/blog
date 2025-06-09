<template>
  <div
    class="w-full bg-cover bg-center find relative"
  >
    <div class="absolute w-full h-full left-0 top-0">
      <el-image :src="`https://www.cunshao.com/666666/api/pic.php?t=${bgTime}`" class="w-full h-full">
        <template #error>
          <div class="w-full h-full">
            <img src="@/assets/images/bg/bg3.png" alt="error" class="w-full h-full object-cover" />
          </div>
        </template>
      </el-image>
    </div>
    <div
      class="py-[120px] flex-1 h-full px-[50px] text-[#222] flex flex-col justify-center items-center relative z-1"
    >
      <div
        class="flex-1 w-full h-full flex flex-col justify-center items-start overflow-hidden relative"
      >
        <iframe
          :src="findRow.url"
          frameborder="0"
          allowfullscreen
          class="flex-1 rounded-xl w-[60%]"
          ref="myIframe"
        />
        <div class="absolute top-1/2 -translate-y-1/2 right-[50px] flex flex-col justify-center items-center">
            <div class="flex items-center w-[320px] h-[60px] rounded-[10px] m-[10px] shadow-[0_0_1em_rgba(0,0,0,0.2)] text-white text-[20px] teansition-all duration-300 ease-in-out cursor-pointer bg-linear-to-r"
                :class="{
                    'from-[orange] to-[tomato] transform-[perspective(500px)_rotateY(45deg)] pl-[10%]  hover:transform-[perspective(300px)_rotateY(45deg)]': index%2===0, 
                    'from-[tomato] to-[orange] transform-[perspective(500px)_rotateY(-45deg)] pr-[10%] justify-end  hover:transform-[perspective(300px)_rotateY(-45deg)]': index%2===1
                }"
                 v-for="(item, index) in findData" :key="item.id"
                 @click="findRow = item">
                <img :src="item.image_url" alt="findData" class="w-[30px] h-[30px] object-cover rounded-sm " />
                <span class="ml-[10px]">{{ item.title }}</span>
            </div>
        </div>
      </div>
      <div class="flex justify-center items-center mt-[50px]">
        <div
          v-for="item in findType"
          :key="item.id"
          class="w-[70px] h-[70px] relative mx-[30px]"
          @mouseenter="mouseId = item.id"
          @mouseleave="mouseId = 0"
          @click="changeFindType(item.id)"
        >
          <div
            class="absolute w-full h-full transition-all duration-300 ease-in-out hover:-rotate-z-[30deg] hover:scale-[1.1] hover:-rotate-x-[45deg] origin-[5%_5%] translate-z-[50deg]"
          >
            <img
              :src="item.image_url"
              alt="findType"
              class="w-[40px] h-[40px] object-cover rounded-sm absolute left-1/2 top-1/2 z-2 -translate-x-1/2 -translate-y-1/2"
            />
            <i
              class="absolute transition-all duration-300 ease-in-out w-full h-full border-2 rounded-sm left-0 top-0"
              :style="{ borderColor: item.color }"
            ></i>
            <i
              class="absolute transition-all duration-300 ease-in-out w-full h-full border-2 rounded-sm left-0 top-0"
              :style="{
                borderColor: item.color,
                boxShadow: `0 0 5px 0 ${item.color}`,
              }"
              :class="{
                'top-[8px] left-[-6px] opacity-[0.7]': mouseId === item.id,
              }"
            ></i>
            <i
              class="absolute transition-all duration-300 ease-in-out w-full h-full border-2 rounded-sm left-0 top-0"
              :style="{
                borderColor: item.color,
                boxShadow: `0 0 5px 0 ${item.color}`,
              }"
              :class="{
                'top-[16px] left-[-12px] opacity-[0.5]': mouseId === item.id,
              }"
            ></i>
            <i
              class="absolute transition-all duration-300 ease-in-out w-full h-full border-2 rounded-sm left-0 top-0"
              :style="{
                borderColor: item.color,
                boxShadow: `0 0 5px 0 ${item.color}`,
              }"
              :class="{
                'top-[24px] left-[-18px] opacity-[0.3]': mouseId === item.id,
              }"
            ></i>
            <i
              class="absolute transition-all duration-300 ease-in-out w-full h-full border-2 rounded-sm left-0 top-0"
              :style="{
                borderColor: item.color,
                boxShadow: `0 0 5px 0 ${item.color}`,
              }"
              :class="{
                'top-[32px] left-[-16px] opacity-[0.1]': mouseId === item.id,
              }"
            ></i>
          </div>
          <span
            class="absolute transition-all duration-300 ease-in-out bottom-0 left-0 w-full text-center opacity-0"
            :style="{ color: item.color }"
            :class="{ 'bottom-[-30px] opacity-100': mouseId === item.id }"
            >{{ item.title }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  findType,
  findData,
  changeFindType,
  getFindTypeList,
  mouseId,
  findRow,
} from "./config";
const bgTime = ref(new Date().getTime());
const myIframe = ref(null as any);
watch(() => findRow.value, () => {
    const message = { key: findRow.value.url };

    myIframe.value.onload = () => {
        setTimeout(() => {
            myIframe.value.contentWindow.postMessage(message, "*");
        }, 1000);
    }
})
onMounted(() => {
  getFindTypeList();
});
</script>

