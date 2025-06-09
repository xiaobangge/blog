<template>
    <div class="relative w-[100%]">
      <div class="fixed top-0 left-0 w-[100vw] h-full bg-linear-120 from-[#2c3e50] via-[#27ae60_#2980b9_#e74c3c] to-[#8e44ad] animate-[bgAnimation_15s_linear_infinite] bg-size-[150%]"></div>
      <div class="relative w-[100%] h-[380px] bg-[url(@/assets/images/bg/bg7.png)] bg-size-cover bg-position-center">
        <div class="absolute top-[50%] left-[50%] transform -translate-x-1/2 text-[30px] md:text-[40px] font-bold">归档</div>
        <div v-if="articleTotalByYear?.length === 1" class="absolute top-[50%] left-[50%] transform -translate-x-1/2 translate-y-[80px] text-[16px] md:text-[20px] flex items-center">
            
            <div class="flex justify-center items-center p-[15px] text-[20px] text-orange-500">
                <bk-svg iconName="icon-rili" class="w-[20px] h-[20px] mr-[10px]" />
                {{articleTotalByYear[0]?.name}}
            </div>

            <div class="flex justify-center items-center p-[15px] text-[20px] text-orange-500">
                <bk-svg iconName="icon-guidang" class="w-[20px] h-[20px] mr-[10px]" />
                {{articleTotalByYear[0]?.total || 0}}篇
            </div>
        </div>
      </div>
      <div class="w-[90%] sm:w-[80%] md:w-[70%] mx-auto flex justify-center relative mt-[20px] ">
        <div class="flex-1 bg-white rounded-lg p-8 flex flex-col hover:shadow-lg  text-[#222]">
            <div class="md:hidden">
                <bk-tab :data="articleTotalByYear" v-model="activeYear" />
                <div class="flex justify-center items-center p-[15px] text-[20px] text-(--theme-color)">
                    <bk-svg iconName="icon-guidang" class="w-[20px] h-[20px] mr-[10px]" />
                    {{articleTotalByYear[activeYear]?.total || 0}}篇
                </div>
            </div>
            <div class="border-1 border-gray-300 rounded-md px-[10px] mt-[10px]">
                <div @click="toRoute('/Article/' + item.id)" class="flex  items-center p-[15px] hover:rounded-md  border-b-[1px] border-b-gray-300 cursor-pointer hover:text-(--theme-color) hover:bg-[#efefef]" v-for="(item, index) in articleByYear" :key="index">
                    <span class="text-[16px] text-orange-500">{{moment(item.create_at).format('MM-DD')}}</span>
                    <span class="ml-[10px]">{{item.title}}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>
<script lang="ts" setup>
    import moment from "moment";
    import {getArticleTotalByYear, getArticleByYear} from "@/api/Article";
    const router = useRouter();
    const articleTotalByYear = ref<any[]>([]);
    const articleByYear = ref<any[]>([]);
    const activeYear = ref(0);
    const getArticleByYearByPage = (year: number) => {
        getArticleByYear(year).then(res => {
            articleByYear.value = (res.data || []);
        });
    };
    const toRoute = (path: string) => {
        router.push(path);
    };
    onMounted(() => {
        getArticleTotalByYear().then(res => {
            articleTotalByYear.value = (res.data || []).map((item: { year: any; count: any; }) => {
                return {
                    name: item.year,
                    icon: 'icon-rili',
                    total: item.count,
                }
            });
            if (res.data?.length) {
                getArticleByYearByPage(res.data[0].year);
            }
        });
    });
</script>