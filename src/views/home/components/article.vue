<template>
  <div class="w-full">
    <!-- 文章类型列表 -->
    <div
      class="w-full h-[50px] rounded-2xl bg-white  items-center px-[20px] hidden sm:flex"
    >
      <div
        class="flex font-bold justify-between text-nowrap items-center py-[2px] px-[15px] rounded-[10px] mr-[30px] cursor-pointer hover:bg-(--theme-color) hover:text-white"
        :class="{
          'bg-(--theme-color) text-white': currentArticleType === item.id,
        }"
        @click="queryArticle(item.id)"
        v-for="(item, index) in articleTypeList"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 文章列表 -->
    <div class="w-full flex flex-wrap justify-between">
      <div class="w-[100%] md:w-[49%] article rounded-[10px] p-[2px] bg-white mt-[20px] cursor-pointer hover:text-(--theme-color) relative overflow-hidden" v-show-bg
         v-for="(item, index) in articleList" :key="index"
         @click="toRoute('/Article/' + item.id)">
        <div class="w-full h-[270px] overflow-hidden rounded-[10px]">
            <!-- <img v-lazy="item.image_url" alt="文章封面" class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"> -->
            <el-image  :src="item.image_url" class="w-full h-full object-cover hover:scale-110 transition-transform duration-300" lazy />
        </div>
        <div class="w-full flex flex-col justify-center pl-[24px] font-bold text-[20px] h-[50px]">{{ item.title }}</div>
        <div class="w-full h-[40px] flex pl-[20px]"> 
            <div class="flex justify-between text-nowrap items-center mr-[10px] lg:mr-[20px]" v-for="(tag, index) in articleTag" :key="index">
                <svg class="h-[20px] w-[20px] mr-[5px]" aria-hidden="true">
                  <use :xlink:href="'#' + tag.icon"></use>
                </svg>
                {{tag.render(item)}}
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticleTypeList, getArticleList } from "@/api/Article";
import moment from "moment";
import {vShowBg} from "@/utils/vShowBg";
const router = useRouter();
const emit = defineEmits(["resize"]);
// 定义文章类型列表
const articleTypeList = ref([] as any[]);
// 定义当前选择的文章类型
const currentArticleType = ref(0);
// 定义文章列表
const articleList = ref([] as any[]);
const currentArticle = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
} as any);

// 定义文章底部小标签
const articleTag = ref([
    {
        icon: "icon-a-appround13",
        render: (item: { type: any; }) => {
            console.log(item, articleTypeList.value)
            const info = articleTypeList.value.find((info) => info.id === Number(item.type));
            return info? info.name : "";
        }
    },
    {
        icon: "icon-redu",
        render: (item: { heat: any; }) => {
            return item.heat || 0;
        }
    },
    {
        icon: "icon-shijian",
        render: (item: { create_at: any; }) => {
            return item.create_at || "";
        }
    },
])
// 获取文章类型列表
const getArticleType = async () => {
  const res = await getArticleTypeList();
  articleTypeList.value = res.data;
  articleTypeList.value.unshift({ id: 0, name: "全部" });
  queryArticle(0);
};
// 查询文章
const queryArticle = async (id: number) => {
  currentArticleType.value = id;
  const params = {
    type: id,
    currentPage: currentArticle.value.currentPage,
    pageSize: currentArticle.value.pageSize,
  };
  const res = await getArticleList(params);
  articleList.value = res.data.list.map((rr: any) => {
    return {
        ...rr,
        create_at: moment(rr.create_at).format("MM-DD HH:mm"),
    }
  });
  currentArticle.value.total = res.data.total;
  emit("resize");
};
const toRoute = (path: string) => {
  router.push(path);
};
// 组件创建时获取文章类型列表
onMounted(() => {
  getArticleType();
});
</script>
