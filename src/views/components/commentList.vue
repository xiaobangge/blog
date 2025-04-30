<template>
  <div ref="highlightRef">
    <!-- 评论处 -->
    <write-comment v-if="!hideComment" class="p-[20px]" v-model="commentContent" :type="type" :commentStatus="commentStatus" @reset="fetchCommentList(fetchParams.page)"/>
    <bk-comment-list
      ref="commentRef"
      :data="commentList"
      :page="fetchParams.page"
      :page-size="pageSize"
      :total="fetchParams.total"
      :type="type"
      :level="0"
      @reset="fetchCommentList(fetchParams.page)"
      @currentChange="fetchCommentList"
      @comment_status="(_type: any) => { commentStatus = _type}"
    />
  </div>
</template>
<script lang="ts" setup>
import { getCommentList } from "@/api/Comment";
const emit = defineEmits(["reset", 'update:content']);
const props = defineProps({
  type: {
    type: String,
    default: "link",
  },
  pageSize: {
    type: Number,
    default: 5,
  },
  hideComment: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: '',
  }
});
const commentContent = computed({
    get: () => props.content,
    set: (val: string) => {
        emit('update:content', val);
    }
})
const commentStatus = ref(false);
const commentList = ref([] as any[]);
const fetchParams = ref({
  page: 1,
  pageSize: props.pageSize,
  type: props.type,
  total: 0,
});
const fetchCommentList = async (page: number = 1) => {
  fetchParams.value.page = page || 1;
  const res = await getCommentList(fetchParams.value);
  fetchParams.value.total = res.data.total;
  commentList.value = res.data.list;
  emit("reset", commentList.value);
};

onMounted(() => {
  fetchCommentList();
});
defineExpose({
  fetchCommentList,
});
</script>