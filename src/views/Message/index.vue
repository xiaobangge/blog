<template>
  <div class="w-[70%] mx-auto h-full flex flex-col pt-[120px] justify-center text-black">
    <!-- 标题 -->
    <div class="text-center bg-white pt-[20px]">
      <div class="text-[24px] font-bold">留言贴纸</div>
      <div class="p-[20px]">
        <sticker-vue class="bg-[#69f8451a] rounded-xl" v-model="commentList" />
      </div>
      <div class="border-b-[3px] border-dashed border-[#00d4ff] my-[10px]"></div>
    </div>
    <!-- 评论区 -->
    <div class="bg-white">
      <div class="p-[10px] flex border-b-[1px] border-[#e5e5e5] mb-[30px]">
        <div class="flex mr-[30px] items-center">
          <bk-svg
            iconName="icon-a-liaotianpinglun"
            class="w-[20px] h-[20px] mr-[10px]"
          />
          留言
        </div>
      </div>
      <!-- 评论区 -->
      <comment-list ref="commentRef" v-model:content="content" type="message" @reset="getCommentList" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import StickerVue from './Stickers.vue'
import CommentList from "../components/commentList.vue";
const commentRef = ref(null as any)
const commentList = ref([] as any)
const content = ref('')
const getCommentList =(list: any) => {
    commentList.value = list
}
</script>