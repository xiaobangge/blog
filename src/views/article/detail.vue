<template>
  <div class="relative w-[100%] min-h-[100vh]">
    <!-- 文章标题 -->
    <div class="w-full relative pt-[80px]" ref="vtantRef">
      <div class="w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden">
        <div
          class="w-[90%] md:w-[80%] lg:w-[70%] mx-auto h-full flex flex-col justify-center text-white items-center md:items-start"
        >
          <div class="text-[24px] md:text-[36px] font-bold">
            {{ articleInfo.title }}
          </div>
          <div class="w-full flex justify-center md:justify-start">
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
      <div class="w-full h-[40px] md:h-[80px] overflow-hidden relative">
        <Wave />
      </div>
    </div>
    <div
      class="w-[90%] md:w-[80%] lg:w-[70%] mx-auto flex overflow-hidden mt-[30px]"
    >
      <div class="flex-1 overflow-hidden">
        <div
          class="flex flex-col justify-between items-center rounded-xl p-[20px] bg-[#fff] text-[#333] w-full"
        >
          <MdEditor v-model="articleInfo.content" readonly />
        </div>
        <!-- 评论区 -->
        <div class="bg-white mt-[30px] rounded-xl text-[#333]">
          <div
            class="p-[10px] flex border-b-[1px] border-[#e5e5e5] mb-[30px]"
          >
            <div class="flex mr-[30px] items-center">
              <bk-svg
                iconName="icon-a-liaotianpinglun"
                class="w-[20px] h-[20px] mr-[10px]"
              />
              评论
            </div>
          </div>
          <comment-list
            ref="commentRef"
            v-model:content="content"
            type="article"
            :uid="String(route.params.id)"
          />
        </div>
      </div>
      <div
        class="hidden w-[300px] md:block ml-4 text-[#333]"
      >
        <!-- 吸顶效果 -->
        <el-affix :offset="100" class="">
          <div class="bg-white rounded-xl p-[20px]">
            <div class="text-[14px] mb-[10px] flex items-center"> 
              <bk-svg
                iconName="icon-guidang"
                class="w-[16px] h-[16px] mr-[10px]"
              />
              文章目录
            </div>
            <div
              v-for="item in links"
              :key="item.text"
              class="my-[5px] pl-[20px] cursor-pointer text-[14px] hover:text-(--theme-color)"
              :class="{ 'border-l-[3px] border-(--theme-color) text-(--theme-color)': linkValue === item.text }"
              @click="scrollToFun(item.text)"
            >
              {{ item.text }}
            </div>
          </div>
        </el-affix>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CommentList from "../components/commentList.vue";
import { getArticleOne } from "@/api/Article";
import { vanta } from "@/utils/vanta";
const vtantRef = ref(null as any);
const vantaEffect = ref(null as any);
const articleInfo = ref({} as any);
const route = useRoute();
const content = ref("");
const links = ref([] as any[]);

const queryMoments = async () => {
  const { id } = route.params;
  const res = await getArticleOne(id);
  articleInfo.value = res.data;
  // 截取文章内容的存在id数据
  initIdsElement();
};

const initIdsElement = () => {
  const content = articleInfo.value.content ?? "";
  // 正则表达式匹配标题行（支持提取标题级别和内容）
  const regex = /^(#{1,6})\s+(.+)$/gm;
  links.value = [...content.matchAll(regex)].map((match) => ({
    level: match[1].length, // 标题级别（1-6）
    text: match[2].trim(), // 标题文本（自动去除前后空格）
  }));
};

const linkValue = ref("");
const linkInfo = ref({} as any);
const isClickScroll = ref(false);
const getTopByText = (text: string) => {
  if (!linkInfo.value[text]) {
    const element = document.getElementById(`${text}`);
    if (element) {
      linkInfo.value[text] = element.offsetTop + 450
    }
  }
  return linkInfo.value[text] || 0;
}
const scrollToFun = (text: string) => {
  const element = document.getElementById(`${text}`);
  if (element) {
    linkValue.value = text;
    const scrollPosition = element.offsetTop;
    isClickScroll.value = true;
    window.scrollTo({ top: scrollPosition + 450, behavior: "smooth" })
  }
}
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
const handleScroll = () => {
  if (isClickScroll.value) return;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const start = getTopByText(links.value[0].text)
  const end = getTopByText(links.value[links.value.length - 1].text)
  if (scrollTop<=start) {
    linkValue.value = links.value[0].text;
  } else if (scrollTop>=end) {
    linkValue.value = links.value[links.value.length - 1].text;
  } else {
    links.value.forEach((item, index) => {
      if (index !== links.value[index-1]) {
        const nextTop = getTopByText(links.value[index+1]?.text)
        const top =  getTopByText(item?.text)
        if (scrollTop<nextTop && scrollTop>=top) {
          linkValue.value = item.text;
        }
      }
    })
  }
}
onMounted(async () => {
  queryMoments();
  vantaEffect.value = vanta(vtantRef.value, "globe");
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scrollend', () => {isClickScroll.value = false});
});
onUnmounted(() => {
  vantaEffect.value.destroy();
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('scrollend', () => {isClickScroll.value = false});
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
