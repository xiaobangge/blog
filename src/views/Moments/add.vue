<template>
  <div class="relative w-[100%] min-h-[100vh] pt-[120px]">
    <div class="w-[70%] mx-auto">
      <div class=" w-full h-[300px] bg-[url(http://127.0.0.1:7777/file/images/2.gif)] rounded-2xl bg-size-[100%_100%] p-[40px] text-[30px]">
        一些碎碎念
      </div>
      <comment-list ref="commentRef" class="bg-white rounded-[10px] p-[20px] mt-[30px]" v-model:content="content" type="comment" />
      <!-- <div ref="highlightRef">
        <div class="flex flex-col justify-between items-center mt-[30px] rounded-xl p-[20px] bg-[#fff] text-[#333]"
            v-for="(item, index) in momentsList" :key="index">
          <div class="flex w-full">
            <img :src="userInfo?.avatar" class="w-[50px] h-[50px] rounded-full mr-[10px]" alt=""/>
            <div class="flex flex-col">
              <div class="text-[20px] font-bold">{{userInfo?.username}}</div>
              <div class="text-[16px]">{{ item.create_at }}</div>
            </div>
          </div>
            <MdEditor class="w-full text-[18px] mt-[20px] leading-[30px] px-[70px] min-h-[200px] shadow-[0px_0px_10px_rgba(0, 0, 0, 0.1)] backgorund bg-size-[100%_30px]" v-model="item.content"  readonly/>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import CommentList from "../components/commentList.vue";
const content = ref('')
</script>

<style lang="scss" scoped>
.backgorund {
  background-image: linear-gradient(90deg,transparent 50px,#ffb4b8 50px,#ffb4b8 52px,transparent 52px),linear-gradient(#e1e1e1 .1em,transparent .1em);
  ::v-deep(.md-editor) {
    background-color: transparent;
    font-family: inherit;
  }
}
</style>