<template>
    <div class="w-full h-full ">
        <div class="flex justify-between flex-wrap items-center h-full">
            <div 
                class="w-full md:w-[calc(50%-20px)] border-[1px] border-[#e5e5e5] hover:shadow-[0_0_4px_#ccc]
                    px-[20px] py-[10px] rounded-lg flex items-center cursor-pointer"
                @click="toLink(item.url)"
                v-for="(item, index) in linkList" :key="index">
                <img :src="item.avatar" class="h-18" alt="avatar" />
                <div class="ml-4">
                    <h2 class=" font-bold text-[18px]">{{item.name}}</h2>
                    <p class=" text-sm text-[#666]">{{item.remark}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import {getLinkListApi} from "@/api/Link";
 const linkList = ref([] as any[]);
 const getLinkList = async () => {
   const res = await getLinkListApi({
    page: 1,
    pageSize: 10,
    type: 2
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