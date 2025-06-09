<template>
  <div ref="highlightRef">
    <!-- 评论处 -->
    <write-comment v-if="!hideComment" class="p-[20px]" v-model="commentContent" :type="type" :uid="uid" :commentStatus="commentStatus" @reset="fetchCommentList(fetchParams.page)"/>
    <bk-comment-list
      ref="commentRef"
      :data="commentList"
      :page="fetchParams.page"
      :page-size="pageSize"
      :total="fetchParams.total"
      :uid="uid"
      :type="type"
      :level="0"
      :stopFetch="stopFetch"
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
  data: {
    type: Array,
    default: () => [],
  },
  content: {
    type: String,
    default: '',
  },
  uid: {
    type: String,
    default: '',
  },
  stopFetch: {
    type: Boolean,
    default: false,
  }
});
const commentContent = computed({
    get: () => props.content,
    set: (val: string) => {
        emit('update:content', val);
    }
})
watch(() => props.data, (newVal) => {
  commentList.value = newVal;
})
const commentStatus = ref(false);
const commentList = ref([] as any[]);
const fetchParams = ref({
  page: 1,
  pageSize: props.pageSize,
  type: props.type,
  total: 0,
  uid: Number(props.uid),
});
const fetchCommentList = async (page: number = 1) => {
  if (!props.stopFetch) {
    fetchParams.value.page = page || 1;
    const res = await getCommentList(fetchParams.value);
    fetchParams.value.total = res.data.total;
    commentList.value = res.data.list;
    emit("reset", commentList.value);
  } else {
    emit("reset", page);
  }
};

onMounted(() => {
  fetchCommentList();
});
defineExpose({
  fetchCommentList,
});
</script>