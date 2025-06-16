<template>
  <div class="w-full bg-[#aca6de] pb-[50px] home" ref="homeRef">
    <bk-xk/>
    <!-- 博客动画 -->
    <div class="flex justify-center items-center h-[100vh] relative">
      <bk-itext></bk-itext>
    </div>
    <!-- 首页内容 -->
    <div class="relative">
      <!-- 按钮 -->
      <el-anchor>
        <el-anchor-link href="#about">
          <div
            class="cursor-pointer absolute w-[30px] top-0 left-1/2 h-[50px] transform -translate-x-1/2 -translate-y-1/1"
            @mouseenter="
              () => {
                isMove = true;
              }
            "
            @mouseleave="
              () => {
                isMove = false;
              }
            "
          >
            <bk-svg
              iconName="icon-xiangxiatubiao"
              :class="{ 'about-btn': !isMove }"
              class="absolute"
              className="w-[20px] h-[20px] mr-[10px] rotate-180"
              color="#fff"
            ></bk-svg>
          </div>
        </el-anchor-link>
      </el-anchor>
      <!-- 左侧内容 -->
      <div id="about" class="w-[90%] mx-auto mt-[50px] text-[#333] lg:w-[70%]">
        <!-- 动态 -->
        <div class="flex flex-col items-center h-[50px] overflow-hidden rounded-xl hover:border-2 hover:border-[#425aef]">
          <LoopScroll class="w-full" :dataSource="momentsList" :waitTime="1000" itemKey="id">
            <template #default="{ item }">
              <div  class="flex w-full text-[#333] bg-white px-[20px] py-[10px] justify-between items-center h-[50px] overflow-hidden cursor-pointer">
                <bk-svg
                    iconName="icon-pengyouquan"
                    className="w-[30px] h-[30px] mr-[10px]"
                  ></bk-svg>
                  <div @click="toRoute('/Moments')" class="flex-1 text-center text-nowrap overflow-hidden h-[30px] hover:text-[#425aef]" v-html="item.content"></div>
                  <bk-svg
                    iconName="icon-tiaozhuan"
                    className="w-[20px] h-[20px] rotate-x-180 mr-[10px]"
                    color="#333"
                    @click="toRoute('/Moments')"
                  ></bk-svg>
                </div>
            </template>
          </LoopScroll>
        </div>
        <!-- 关于我 -->
         <div class="mt-[30px] w-full lg:flex hidden sm:block">
            <!-- 关于 -->
             <div class="lg:w-[50%] lg:mr-[30px] relative overflow-hidden">
              <component :is="AboutView"></component>
             </div>
             <div class="lg:w-[50%] mt-[30px] lg:mt-0 rounded-2xl overflow-hidden">
               <link-view></link-view>
             </div>
         </div>
         <!-- 文章信息 -->
          <div class="mt-[30px] w-full lg:flex justify-between">
            <div class="flex-1">
              <ArticleView></ArticleView>
            </div>
            <div class="w-[250px] ml-[30px] hidden lg:block">
              <!-- 吸顶效果 -->
              <el-affix :offset="120">
                  <div class="w-full bg text-white p-[20px] rounded-2xl"> <TimeView/></div>
                  
                  <!-- 左侧菜单栏 -->
                  <div class="w-full mt-[30px] ">
                    <div class="bg w-full rounded-tr-2xl rounded-tl-2xl text-center text-white p-[1.5rem]">
                      <div class="text-[30px] font-bold mb-[20px]">叶影凌枫</div>
                      <div class="text-[18px] tracking-[8px]">水利万物而不争,而万物莫能与之争</div>
                    </div>
                    <div class=" w-full text-center mb-[20px]">
                      <bk-button @click="toRoute('/About')" class="w-full h-full  rounded-br-2xl rounded-bl-2xl" title="关于我"></bk-button>
                    </div>
                  </div>
              </el-affix>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AboutView from './components/about.vue'
import ArticleView from './components/article.vue';
import LinkView from './components/links.vue';
import { LoopScroll } from "@joyday/vue-loop-scroll";
// import BkSky from './BkSky.vue'
import BkXk from './BKXk.vue'
const isMove = ref(false);
import {momentsList, queryMoments} from './config/moment'
const router = useRouter();


const toRoute = (path: string) => {
  console.log(path);
    router.push(path);
};
onMounted(() => {
  queryMoments()
  // vantaEffect.value = vanta(homeRef.value, "net");
});
onUnmounted(() => {
  // vantaEffect.value.destroy();
});
</script>

<style lang="scss" scoped>
.about-btn {
  animation: move 1s ease-in-out infinite;
}
@keyframes move {
  0% {
    top: 0;
  }
  100% {
    top: 20px;
  }
}
.el-anchor {
  background-color: transparent;
}

.bg {
  background: linear-gradient(
    150deg,
    hsl(231, calc(71 * 1%), min(calc(63 * 1% + 10%), 100%)) 5%,
    #5e72e4 70%,
    hsl(231, calc(71 * 1%), max(calc(63 * 1% - 2.5%), 0%)) 94%
  );
}


.liquid-btn-3 {
	  padding: 18px 36px;
	  font-size: 1.3rem;
	  background: linear-gradient(90deg, #4caf50, #8bc34a, #4caf50);
	  background-size: 200%;
	  color: white;
	  border: 2px solid transparent;
	  border-radius: 8px;
	  position: relative;
	  transition: 0.5s;
	  animation: bgFlow 3s linear infinite;
	}

	.liquid-btn-3::before {
	  content: '';
	  position: absolute;
	  top: -2px;
	  left: -2px;
	  right: -2px;
	  bottom: -2px;
	  background: linear-gradient(90deg, 
		#4caf50, #fff, #8bc34a, #fff, #4caf50);
	  background-size: 400%;
	  z-index: -1;
	  border-radius: 8px;
	  animation: borderFlow 4s linear infinite;
	}

	@keyframes bgFlow {
	  0% { background-position: 0% }
	  100% { background-position: 200% }
	}

	@keyframes borderFlow {
	  0% { background-position: 0% }
	  100% { background-position: 400% }
	}
</style>