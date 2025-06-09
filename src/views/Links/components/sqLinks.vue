<template>
  <div>
    <!-- 申请条件 -->
    <h2 class="text-[16px] md:text-[24px] flex items-center">
      <bk-svg
        iconName="icon-shenqingtiaojian"
        class="w-[20px] h-[20px] mr-[10px]"
      />
      申请友联的要求
    </h2>
    <div class="text-[14px] mt-[30px]">
      <div
        class="flex items-center mb-[10px]"
        v-for="(item, index) in tjList"
        :key="index"
      >
        <span
          class="mr-[10px] w-[20px] h-[20px] flex items-center justify-center rounded-[50%] bg-blue-500 text-white"
          >{{ index + 1 }}</span
        >
        {{ item }}
      </div>
    </div>
    <!-- 申请格式 -->

    <h2 class="text-[16px] md:text-[24px] flex items-center mt-[30px]">
      <bk-svg iconName="icon-geshishua" class="w-[30px] h-[30px] mr-[10px]" />
      本站友联信息以及申请格式
    </h2>
    <div
      class="text-[14px] mt-[30px] border-[#e5e5e5] border-[1px] rounded-xl shadow-md"
    >
      <div class="px-[20px] py-[10px] flex border-b-[1px] border-[#e5e5e5]">
        <div
          v-for="num in color2"
          :key="num"
          class="mr-10px w-[10px] h-[10px] rounded-[50%] mr-[10px]"
          :style="{ backgroundColor: num }"
        ></div>
      </div>
      <div class="px-[20px] pt-[30px] pb-[20px]">
        <div
            class="flex items-center mb-[10px]"
            v-for="(item, index) in gsList"
            :key="index"
        >
            <bk-svg
                :iconName="item.icon"
                class="w-[20px] h-[20px] mr-[10px]"
            />
            {{ item.title }}
        </div>
      </div>
    </div>
    <!-- 评论区 -->
     <div class="mt-[20px]">
        <div class="p-[10px] flex border-b-[1px] border-[#e5e5e5] mb-[30px]">
            <div class="flex mr-[30px] items-center">
                <bk-svg iconName="icon-a-liaotianpinglun" class="w-[20px] h-[20px] mr-[10px]" />
                评论
            </div>
            <bk-button @click="ksSq" class="w-[150px] h-[40px] border-[4px] rounded-[30px]" title="快速申请"></bk-button>
        </div>
         <!-- 评论区 -->
        <comment-list v-model:content="content" ref="commentRef" type="link"/>
     </div>
  </div>
</template>
<script lang="ts" setup>
import CommentList from "../../components/commentList.vue";
const tjList = reactive([
  "能够正常访问",
  "已经将本站添加至你的博客中",
  "不接受污秽、暴力、广告网站",
]);
const commentRef = ref(null as any);
const content = ref("");
const color2 = ["#f00", "orange", "green"];
const gsList = reactive([
  {
    icon: "icon-xiaohua",
    title: "博客名称： Sean 博客",
  },
  {
    icon: "icon-xiaohua1",
    title: "博客地址： https://zyicheng.cn",
  },
  {
    icon: "icon-hua",
    title: "博客logo： https://www.zyicheng.cn/logo.png",
  },
  {
    icon: "icon-a-yehuahua",
    title: "网站描述： 苔藓在寂静处低语，舒展成时光的韵脚",
  },
]);
const ksSq = () => {
    content.value = `博客名称：
博客地址：
博客logo：
网站描述：`;
}
</script>