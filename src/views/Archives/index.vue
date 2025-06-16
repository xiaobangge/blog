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
        <div class="hidden md:w-[30%] md:block md:ml-[10px] p-[20px] rounded-2xl bg-white text-(--theme-color)">
            <div class="pb-[20px] border-b-[1px] border-b-gray-300 flex items-center">
                <bk-svg iconName="icon-dongtai_huaban" class="w-[20px] h-[20px] mr-[10px]" />
                最新动态
            </div>
            <div class="py-[20px] max-h-[50vh] overflow-auto pr-[10px]">
                <el-timeline style="max-width: 600px">
                    <el-timeline-item
                    v-for="(activity, index) in logs"
                    :key="index"
                    icon="location"
                    :hide-timestamp="true"
                    >
                    <template #dot>
                        <div class="p-[5px] bg-white">
                            <bk-svg :iconName="iconMap[activity.type]" class="w-[14px] h-[14px] bg-white ml-[-5px]" color="var(--theme-color)" />
                        </div>
                    </template>
                    <div class="font-serif">
                        <div class="text-gray-600 text-[12px] pt-[5px] flex justify-between items-center">
                            <span>{{timeReset(activity.create_at)}}</span>
                            <div v-if="activity.sourceName && ![5, 9].includes(activity.type)" class="text-(--theme-color)  my-[5px]">{{activity.sourceName}}</div>
                        </div>
                        <div class="text-[12px] py-[5px]">
                            <div v-if="activity.type === 9" class="flex flex-wrap items-center">
                                有朋友来访，ta来自
                                <span class="font-bold ml-[5px]">{{activity.sourceName}}</span>
                            </div>
                            <div v-else-if="activity.type === 5" class="flex flex-wrap items-center">
                                有人阅读了 <span class="font-bold ml-[5px] text-(--theme-color) cursor-pointer" @click="toRoute('/Article/' + activity.articleId)" >《{{activity.sourceName}}》</span>
                            </div>
                            <div v-else class="flex flex-wrap items-center">
                                <img :src="activity.avatarUrl" alt="头像" class="w-[16px] h-[16px] rounded-full mr-[10px]" />
                                <span class="text-(--theme-color)">{{activity.name}}</span>
                                <span class="mx-[10px]">在{{typeName[activity.type]}}中{{activity.bhfName ? '回复' : '说'}}:</span>
                                <img v-if="activity.bhfAvatar" :src="activity.bhfAvatar" alt="头像" class="w-[16px] h-[16px] rounded-full mr-[10px]" />
                                <span v-if="activity.bhfName" class="text-(--theme-color)">{{activity.bhfName}}</span>
                                <div class="w-full mt-[15px] p-[10px] rounded-md bg-gray-100 border-gray-100 border-1 hover:border-(--theme-color) cursor-pointer" v-html="activity.matter" @click="clickAction(activity)"></div>
                            </div>
                        </div>
                    </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
      </div>
    </div>
</template>
<script lang="ts" setup>
    import moment from "moment";
    import timeReset from "@/utils/timeResert";
    import {getArticleTotalByYear, getArticleByYear} from "@/api/Article";
    import {getLogApi} from "@/api/Main";
    const typeName = ref({
        1: '友链',
        2: '文章',
        3: '留言',
        4: '闲言碎语',
        5: '文章',
        6: '点赞',
    } as any)
    const iconMap = ref({
        1: 'icon-lianjie',
        2: 'icon-a-liaotianpinglun',
        3: 'icon-duzheliuyan',
        4: 'icon-liuyanban',
        5: 'icon-yuedu',
        6: 'icon-dianzan11',
        9: 'icon-daohang',
    } as any)
    const router = useRouter();
    const articleTotalByYear = ref<any[]>([]);
    const articleByYear = ref<any[]>([]);
    const activeYear = ref(0);
    const getArticleByYearByPage = (year: number) => {
        getArticleByYear(year).then(res => {
            articleByYear.value = (res.data || []);
        });
    };
    const paths = ref({
        1: '/Links',
        2: '/Article',
        3: '/Message',
        4: "/Moments",
    } as any)
    const clickAction = (item: any) => {
        if (item.articleId) {
            toRoute('/Article/' + item.articleId);
        } else {
            const path = paths.value[item.type];
            toRoute(path);
        }
    }
    const toRoute = (path: string) => {
        router.push(path);
    };
    const logs = ref([] as any[])
    const getLog = async () => {
        const res = await getLogApi();
        logs.value = res.data?.list || [];
    }
    onMounted(() => {
        getLog()
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