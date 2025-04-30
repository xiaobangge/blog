<template>
    <div class="w-full h-full rounded-2xl overflow-hidden flex flex-col">
        <el-carousel
            height="280px"
            direction="vertical"
            motion-blur
            :autoplay="true"
        >
            <el-carousel-item v-for="item in linkList" :key="item.id">
                <div class="flex items-center justify-center h-full  bg-[url('@/assets/images/bg/bg2.png')] bg-cover bg-center cursor-pointer hover:scale-105 transition-transform duration-300" @click="toLink(item.url)">
                    <img :src="item.avatar" class="w-18 h-18" alt="avatar" />
                    <div class="ml-4">
                        <h2 class=" font-bold text-2xl">{{item.name}}</h2>
                        <p class=" text-sm">{{item.remark}}</p>
                    </div>
                    
                </div>
            </el-carousel-item>
        </el-carousel>
        <bk-button class="flex-1 rounded-bl-2xl rounded-br-2xl hover:tracking-[7px]" :notBorder="true" @click="router.push('/Links')" title="我的朋友们 >>>" type="primary" />
    </div>
</template>

<script lang="ts" setup>
 import {getLinkListApi} from "@/api/Link";
 const router = useRouter();
 const linkList = ref([] as any[]);
 const getLinkList = async () => {
   const res = await getLinkListApi({
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