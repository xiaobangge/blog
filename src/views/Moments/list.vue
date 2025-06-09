<template>
    <div class="relative w-[100%] min-h-[100vh] pt-[120px]">
      <div class="w-[90%] sm:w-[80%] md:w-[70%] mx-auto">
        <div class=" w-full h-[200px] sm:h-[300px] bg-[url(/file/images/2.gif)] rounded-2xl bg-size-[100%_100%] p-[40px] text-[30px]">
          一些碎碎念
        </div>
        <comment-list 
          ref="commentRef" 
          class="bg-[#fff] rounded-[10px] p-[20px] mt-[30px] w-full" 
          :hideComment="true" 
          :data="momentsList"
          :stop-fetch="true" 
          @reset="queryMoments"
          type="comment" />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
import CommentList from "../components/commentList.vue";
const content = ref('')
  import {getMomentsList} from '@/api/Moments'
  // import {useUserStore} from '@/store/User'
//  const {userInfo} = toRefs(useUserStore())
  const momentsList = ref([] as any[])
  // const highlightRef = ref(null as any)

  const fetchParams = ref({
  page: 1,
  pageSize: 5,
  total: 0,
});
  const queryMoments = async (page?:number) => {
    fetchParams.value.page = page || 1
    const res = await getMomentsList({
      currentPage: fetchParams.value.page,
      pageSize: fetchParams.value.pageSize,
    })
    momentsList.value = res.data?.list || []
  }
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