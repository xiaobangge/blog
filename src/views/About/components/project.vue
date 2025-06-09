<template>
    <div class="w-full h-full rounded-2xl overflow-hidden flex flex-col">
        <el-carousel
            height="300px"
            direction="vertical"
            motion-blur
            :autoplay="true"
        >
            <el-carousel-item v-for="item in linkList" :key="item.id">
                <div class="flex p-[40px] items-center justify-center h-full  bg-cover bg-center cursor-pointer hover:scale-105 transition-transform duration-300" @click="toLink(item.url)">
                    <div class="w-[120px] flex flex-col items-center border-r-1 border-gray-300">
                        <img :src="item.avatar" class="w-9 h-9" alt="avatar" />
                        <h2 class=" font-bold text-2xl">{{item.name}}</h2>
                    </div>
                    <div class="ml-4 flex-1">
                        <p class="text-[16px]">{{item.remark}}</p>
                    </div>
                    
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script lang="ts" setup>
 import {getProjectListApi} from "@/api/Project";
 const router = useRouter();
 const linkList = ref([] as any[]);
 const getLinkList = async () => {
   const res = await getProjectListApi({
    page: 1,
    pageSize: 10,
   });
   linkList.value = res.data?.list || [];
   console.log(linkList.value);
 };
 const toLink = (url: string) => {
   window.open(url);
 };
 onMounted(() => {
   getLinkList();
 });
</script>