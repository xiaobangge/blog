<template>
    <div class="h-20 w-full flex justify-between items-center z-9999 fixed top-0 left-0 pl-[10%] pr-[10%]" :class="{ 'bg-white': isWritePath() }">
        <div class="absolute  top-0 left-0 w-full h-full transition-all duration-800 ease-in-out bg-[#8a98f7] opacity-0"
            :class="{ 'opacity-50': scrollEventEnd}"></div>
        <div class="z-10 flex justify-between items-center">
            <LeftLogo />
        </div>
        <div class = "z-10 justify-center h-full w-[30%] hidden md:flex" >
            <Menu />
        </div>
        <div class=" z-10 justify-end items-center flex">
            <div class="md:hidden" @click="drawer = true">
                <el-icon size="30" :color="scrollEventEnd ? '#fff' : isWritePath() ? '#333' : '#fff'"><Expand /></el-icon>
            </div>
            <Music class="hidden md:flex"/>
        </div>

        <el-drawer
            v-model="drawer"
            direction="ltr"
            :with-header="false"
            size="70%"
            body-class="bg-[#f6f8fa]"
        >
            <div class="h-full w-full">
                <Menu size="small" @close="drawer = false"/>
            </div>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
    import LeftLogo from "./components/logo.vue"
    import Menu from "./components/menu.vue"
    import Music from "./components/music.vue"
    import {useUserStore} from '@/store/User'
    const drawer = ref(false)
    const {isWritePath} = useUserStore()
    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });
    
    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
    const scrollEventEnd = ref(false);
    function handleScroll() {
        scrollEventEnd.value = window.scrollY > 50;
    }
</script>

<style lang="scss" scoped>
</style>