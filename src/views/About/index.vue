<template>
  <div class="pt-[120px] w-[90%] sm:w-[80%] md:w-[70%] mx-auto text-[#222]">
    <self-view />
    <div class="mt-[20px] flex flex-wrap justify-between">
      <div class="relative w-[100%] md:flex-1 md:mr-[30px] rounded-2xl p-[20px] bg-(--theme-color) text-white cursor-pointer hover:shadow-lg" @mouseover="isMoveSean = true" @mouseout="isMoveSean = false">
        <div class="flex items-center">
          hello，很荣幸与您相识！
          <bk-svg iconName="icon-a-ziyuan2" class="w-[30px] h-[30px] ml-[30px] origin-[bottom_center] animate-[about-ws_0.3s_linear_infinite_alternate]" />
        </div>
        <div class="flex items-center text-[24px] font-bold">
          <span class="">我叫 {{userInfo.nickname || userInfo.username}}</span>
          <div class=" flex relative text-transparent ml-[30px] family tracking-[4px] text-[30px]">
            <span class="text underline"> {{userInfo.nickname || userInfo.username}} </span>
            <span class="text-[#37ff8b] w-0 left-[-10px] text-nowrap overflow-hidden transition-all duration-500 ease-in-out underline absolute top-0 bg-(--theme-color) h-full border-r-[5px] border-[#37ff8b]"
                  :class="{'w-[calc(100%+10px)] left-[0px]': isMoveSean}"> {{userInfo.nickname || userInfo.username}} </span>
          </div>
        </div>
        <div class="mt-[20px] flex items-center">
          一个佛系的程序员
          <bk-svg iconName="icon-a-yehuahua" class="w-[20px] h-[20px] ml-[10px]" />
        </div>
        <div class="flex items-center absolute bottom-[10px] right-[50px]">
          <el-tooltip :content="`我在${userInfo.address}`" effect="light" placement="top">
          <bk-svg iconName="icon-user_map" class="w-[50px] h-[50px] origin-[bottom_center] animate-[about-ws_0.3s_linear_infinite_alternate]" />
          </el-tooltip>
        </div>
      </div>
      <div class="relative flex flex-col overflow-hidden w-[100%] mt-[15px] md:flex-1 md:mt-0  rounded-2xl p-[20px] bg-white cursor-pointer text-[#444] hover:shadow-md">
        <div class="text-[24px] font-bold">关于本站</div>
        <div class="absolute top-[10px] right-[10%] origin-[top_center] animate-[about-24h_1s_linear_infinite_alternate]"><svg24-hour/></div>
        <div class="flex flex-wrap items-center mt-[20px] pr-[15%]">
          一款基于
          <el-tooltip :content="`vite + vue3 + element-plus`" effect="light" placement="bottom">
            <div class="text-orange-500 mx-2 text-nowrap">{{`前端<vue3>`}}</div>
          </el-tooltip>
          <el-tooltip :content="`nodejs + express + mongodb`" effect="light" placement="bottom">
            <div class="text-(--theme-color) mx-2 text-nowrap">{{`后端<nodejs>`}}</div>
          </el-tooltip>
          的开源博客系统,开发作者：
          <el-tooltip :content="`https://zyicheng.cn`" effect="light" placement="bottom">
            <div class="text-(--theme-color) mx-2 text-nowrap">{{userInfo.nickname || userInfo.username}}</div>
          </el-tooltip>
        </div>
        <div class="w-full mt-[20px] overflow-hidden font-normal relative flex-1 min-h-[18px]">
          <div class="absolute text-[14px] animate-[about-text1_15s_linear_infinite] text-nowrap">
            小伙伴们大家好，我是一个社恐码农{{userInfo.nickname || userInfo.username}}，喜欢复制、粘贴，在今后的日子中，我还会将此博客系统继续完善、改进，欢迎互换友联，或者收藏博客。 
          </div>
        </div>
      </div>
    </div>
    <!-- 访客统计 -->
    <div class="mt-[30px] flex flex-wrap justify-between">
      <div class="relative flex flex-col overflow-hidden w-[100%] md:w-[40%] rounded-2xl p-[40px] bg-white cursor-pointer text-[#fff] hover:shadow-md">
        <div class="absolute w-full h-full left-0 top-0"><wrap-vue /></div>
        <div class="relative text-[40px] font-bold">访客统计</div>
        <div class="relative flex flex-wrap items-center mt-[20px]">
          <div class="w-[50%]" v-for="item in countList" :key="item.key">
            <div class="text-[14px] font-bold">{{item.name}}</div>
            <div class="text-[30px] font-bold">{{countInfo[item.key]}}</div>
          </div>
        </div>
      </div>
      <div class="relative flex flex-col overflow-hidden w-[100%] mt-[15px] md:flex-1 md:mt-0 md:ml-[30px] rounded-2xl hover:shadow-md text-white">
        <time-vue />
      </div>

    </div>
    <!-- 访客地图 -->
     <div class="w-full mt-[30px] rounded-2xl relative text-white overflow-hidden">
        <div class="text-[24px] font-bold absolute top-[40px] left-[40px] z-100">访客地图</div>
      <echart-map />
    </div>
    <!-- 性格测试 -->
    <div class="mt-[30px] flex flex-wrap justify-between">
      <div class="relative flex flex-col overflow-hidden w-[100%] md:w-[60%] rounded-2xl pt-[3px] bg-(--theme-color) cursor-pointer text-[#444] hover:shadow-md">
        <div class="w-full h-full bg-white rounded-2xl p-[20px] relative">
          <div class="text-[14px]">性格</div>
          <div class="text-[30px] mt-[20px]">提倡者</div>
          <div class="text-[30px] text-(--theme-color)">INFJ-A</div>
          <div class="text-[14px] flex items-center mt-[50px]">
            在
            <span class="text-(--theme-color) cursor-pointer mx-[5px]" @click="toRouter('https://www.16personalities.com/ch')">16personalities</span>
            了解更多关于
            <span class="text-(--theme-color) cursor-pointer ml-[5px]" @click="toRouter('https://www.16personalities.com/ch/%E7%BB%93%E6%9E%9C/infj-a/m/ji0mvwfym')">提倡者</span>
          </div>

          <img class="absolute top-[10px] right-[5%] h-[90%]" src="https://www.16personalities.com/static/images/personality-types/famous/diplomats_INFJ_marie_kondo.svg?v=6" alt="" />

        </div>
      </div>
      <div class="relative flex flex-col overflow-hidden w-[100%] mt-[15px] bg-[url(@/assets/images/about-project.jpg)] bg-size-[100%_100%] md:flex-1 md:mt-0 md:ml-[30px]  rounded-2xl  cursor-pointer text-[#fff] hover:shadow-md">
        <div class="text-[30px] font-bold absolute top-[40px] left-[40px] z-100">我的项目</div>
        <project-vue />
      </div>
    </div>
    <div class="my-[100px] border-t-[4px] border-dashed border-[#b7a0e0]"></div>
    <!-- 评论区 -->
    <div class="bg-white mt-[30px] rounded-2xl overflow-hidden">
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
      <comment-list ref="commentRef" v-model:content="content" type="message" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import CommentList from "../components/commentList.vue";
import SelfView from "./components/self.vue";
import { getVisitorCountApi } from "@/api/Main";
import { useUserStore } from "@/store/User";
import Svg24Hour from "./components/svg-24h.vue";
import WrapVue from "./components/wrap.vue";
import ProjectVue from "./components/project.vue";
import EchartMap from "./components/echarts.vue";
import TimeVue from './components/time.vue'
const { userInfo } = toRefs(useUserStore());
const isMoveSean = ref(false);
const router = useRouter();
const content = ref('')

const countInfo = ref({} as any)
const countList = reactive([
  { name: '今日访客', key: 'todayCount' },
  { name: '昨日访客', key: 'yesterdayCount' },
  { name: '本月访客', key:'thisMonthCount' },
  { name: '总访客', key: 'totalCount' },
])
const toRouter = (path: string) => {
  window.open(path, "_blank");
};

onMounted(async() => {
  const res = await getVisitorCountApi();
  countInfo.value = res.data;
});
</script>

<style lang="scss" scoped>
.family {
  font-family: "Microsoft YaHei", sans-serif;
}
.text {
  -webkit-text-stroke: 1px #efefef; /* 添加文字描边的宽度和颜色 */
}
</style>