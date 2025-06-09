<template>
    <div class="relative items-center justify-center h-[240px] hidden md:flex">
        <div class="absolute top-[50%] left-[50%] w-full flex flex-wrap justify-between items-center animate-[about-text_2s_linear_infinite_alternate]">
            <div v-for="(item, index) in list" :key="index" 
                class="flex items-center py-[10px] min-w-[35%]"
                :class="item.className">
                <span class="text-[12px] rounded-[30px] border-1 px-[15px] py-[3px]" :style="`color:${item.color}; border-color: ${hexToRgba(item.color, 0.5)}; background-color: ${hexToRgba(item.color, 0.05)};`">{{item.title}}</span>
            </div>
        </div>
        <div class="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] overflow-hidden flex animate-[about-self_2s_linear_infinite]">
            <div class="relative w-[50%] h-full bg-linear-to-t from-transparent to-[rgba(0,255,249,0.4)] bg-size-cover bg-repeat-no-repeat rounded-l-[100px]">
                <span class="absolute w-[20px] h-[20px] rounded-[50%] shadow-[0px_0px_30px_rgba(rgba(0,255,249,1)] bg-[rgba(0,255,249,1)] right-0 top-0"></span>
            </div>
            <div class="w-[50%] h-full bg-linear-to-t from-transparent to-[rgba(255,100,100,0.4)] to-[90%] bg-size-cover bg-repeat-no-repeat rounded-r-[100px] rotate-x-180">
                <span class="absolute w-[20px] h-[20px] rounded-[50%] shadow-[0px_0px_30px_rgba(rgba(255,100,100,1)] bg-[rgba(255,100,100,1)] left-0 top-0"></span>
            </div>
        </div>
        <div class="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] overflow-hidden flex rounded-[50%]">
            <img :src="userInfo.avatar" alt="self" class="w-full h-full object-cover" loading="lazy"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useUserStore} from '@/store/User'
const {userInfo} = toRefs(useUserStore())
    const list = reactive([
        {title: '喜欢探索 勇于挑战', color: '#13c2c2', className: 'w-[calc(50%-120px)] justify-end'},
        {title: '就活这一次 下次不来了', color: '#2f54eb', className: 'w-[calc(50%-120px)] justify-start'},
        {title: '爱好音乐 但 五音不全', color: '#1890ff', className: 'w-[calc(50%-150px)] justify-end'},
        {title: '成为厉害的码农', color: '#fa541c', className: 'w-[calc(50%-150px)] justify-start'},
        {title: '所愿皆所得 所念皆所愿', color: '#722ed1', className: 'w-[calc(50%-150px)] justify-end'},
        {title: '所期皆所念 所念皆星河', color: '#2d8cf0', className: 'w-[calc(50%-150px)] justify-start'},
        {title: '小时候向往成长', color: '#52c41a', className: 'w-[calc(50%-120px)] justify-end'},
        {title: '长到后渴望童真', color: '#13c2c2', className: 'w-[calc(50%-120px)] justify-start'}
    ])

    function hexToRgba(hex: string, alpha: any) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
</script>