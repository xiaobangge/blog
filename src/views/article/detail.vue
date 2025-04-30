<template>
  <div class="relative w-[100%] min-h-[100vh]">
    <!-- 文章标题 -->
    <div class="w-full relative pt-[80px]" ref="vtantRef">
      <div class="w-full h-[400px]">
        <div
          class="w-[70%] mx-auto h-full flex flex-col justify-center text-white"
        >
          <div class="text-[36px] font-bold">{{ articleInfo.title }}</div>
          <div class="w-full flex">
            <div
              class="flex justify-between items-center mr-[30px]"
              v-for="(tag, index) in articleTag"
              :key="index"
            >
              <svg class="h-[20px] w-[20px] mr-[5px]" aria-hidden="true">
                <use :xlink:href="'#' + tag.icon" :fill="tag.color"></use>
              </svg>
              {{ tag.render(articleInfo) }}
            </div>
          </div>
        </div>
      </div>
        <div class="w-full h-[80px] overflow-hidden relative">
          <Wave />
        </div>
    </div>
    <div class="w-[70%] mx-auto">
      <div ref="highlightRef">
        <div
          class="flex flex-col justify-between items-center mt-[30px] rounded-xl p-[20px] bg-[#fff] text-[#333]"
        >
          <MdEditor v-model="articleInfo.content"  readonly/>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
import { getArticleOne } from "@/api/Article";
import { vanta } from "@/utils/vanta";
const vtantRef = ref(null as any);
const vantaEffect = ref(null as any);
const articleInfo = ref({} as any);
const highlightRef = ref(null as any);
const showFixed = ref(null);
const route = useRoute();

const queryMoments = async () => {
  const { id } = route.params;
  const res = await getArticleOne(id);
  articleInfo.value = res.data;
};

// 定义文章底部小标签
const articleTag = ref([
  {
    icon: "icon-shijian",
    color: "#fff",
    render: (item: { create_at: any }) => {
      return item.create_at || "";
    },
  },
  {
    icon: "icon-redu",
    render: (item: { heat: any }) => {
      return item.heat || 0;
    },
  },
]);
onMounted(async () => {
  queryMoments();
  vantaEffect.value = vanta(vtantRef.value, "globe");
});
onUnmounted(() => {
  vantaEffect.value.destroy();
});
</script>
  
  <style lang="scss" scoped>
.backgorund {
  background-image: linear-gradient(90deg, #3c0a1e0a 3%, #0000 3%),
    linear-gradient(360deg, #3c0a1e0a 3%, #0000 3%);
  ::v-deep(img) {
    cursor: zoom-in;
  }
}
</style>