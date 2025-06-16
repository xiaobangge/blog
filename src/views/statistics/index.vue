<template>
    <div class="w-full h-[100vh] flex flex-col bg-[url('@/assets/images/vdata/background.png')] bg-size-[100%_100%] overflow-hidden">
        <!-- top -->
        <top-view />
        <!-- main -->
         <div class="flex-1 flex overflow-hidden">
            <main-left :data="nodata" :info="visitorInfo" />
            <main-center :info="visitorInfo" />
            <main-right :data="nodata" :info="visitorInfo" />
         </div>
         <!-- bottom -->
          <!-- <div class="h-[30%] w-full overflow-hidden">
            <bottom-view />
          </div> -->
    </div>
</template>

<script lang="ts" setup>
    import TopView from './components/top.vue'
    import MainLeft from './components/main-left.vue'
    import MainRight from './components/main-right.vue'
    import MainCenter from './components/main-center.vue'
    import BottomView from './components/bottom.vue'
    import {getVisitorAreaApi, getVisitorCountApi} from '@/api/Main'
    const noColors = ['#F56C6C', '#E6A23C', '#5CB87A', '#1E9FFF', '#6F5EF9', '#FFA000']
    const nodata = ref([] as any[])
    // 地区访客统计,取前六名
    const getVisitorArea = async () => {
        const res = await getVisitorAreaApi()
        if (res.code === 200) {
            const data = res.data.filter((_item: any, index: number) => index < 6)
            nodata.value = data.map((item: any, index: number) => {
                return {
                    address: item.address.split('-')[1] ? item.address.split('-')[1] : item.address,
                    value: item.count,
                    color: noColors[index % noColors.length],
                }
            })
        }
    }
    // 总访客统计
    const visitorInfo = ref({} as any)
    const getVisitorCount = async () => {
        const res = await getVisitorCountApi()
        visitorInfo.value = res.data || {}
    }
    onMounted(() => {
        getVisitorArea()
        getVisitorCount()
    })
</script>