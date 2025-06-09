<template>
  <footer class="mt-[120px] text-[12px] pb-[30px] flex items-center justify-center flex-wrap z-10"
    :class="{ 'fixed bottom-0 w-full': isFixedFooter, 'relative':!isFixedFooter }">
    <div v-for="item in list" :key="item.name" 
        class="flex justify-center items-center mt-[10px] rounded-md overflow-hidden cursor-pointer w-[50%] md:w-auto md:ml-[20px] md:mt-0" 
        @click="toRouter(item.link)">
        <span class="px-2 bg-[#5d5d5d]">{{item.value}}</span>
        <span class="px-2" :style="{backgroundColor: item.color}">{{item.name}}</span>
    </div>
  </footer>
</template>

<script lang="ts" setup>
    import { useUserStore } from "@/store/User";
    import { computed, toRefs } from 'vue'
    import moment from'moment'
    const { userInfo } = toRefs(useUserStore());
    const route = useRoute()
    const fixedPathFooter = ref(['/TreeHole', '/Find']);
    const isFixedFooter = computed(() => {
        return fixedPathFooter.value.includes(route.path)
    })

    const list = computed(() => {
        return [
            { name: `${userInfo.value?.username}博客`, link: '', value: `Copyright © ${moment().format('YYYY')}`, color: '#00a3ff' },
            { name: '2025061372', link: 'https://beian.miit.gov.cn', value: '赣ICP备', color: '#9a65d2' },
            { name: `${userInfo.value?.username}`, link: 'https://zyicheng.cn', value: '开发作者', color: '#50cd89' },
            { name: `腾讯云`, link: 'https://cloud.tencent.com', value: '云服务器', color: '#00afef' },
        ]
    })
    const toRouter = (link: string) => {
        link &&window.open(link)
    }
</script>
