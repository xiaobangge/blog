<template>
    <div class="h-20 w-full flex justify-between items-center z-9999 fixed top-0 left-0" :class="{ 'bg-white': isWritePath() }">
        <div class="absolute  top-0 left-0 w-full h-full transition-all duration-800 ease-in-out bg-[#8a98f7] opacity-0"
            :class="{ 'opacity-50': scrollEventEnd}"></div>
        <div class="z-10 flex justify-between items-center ml-[10%]">
            <LeftLogo />
        </div>
        <div class = "z-10 flex justify-center h-full w-[30%]" >
            <Menu />
        </div>
        <div class=" z-10 flex justify-end items-center mr-[2%]">
            <Music/>
            <!-- <Search /> -->
        </div>
    </div>
</template>

<script setup lang="ts">
    import LeftLogo from "./components/logo.vue"
    import Menu from "./components/menu.vue"
    import Music from "./components/music.vue"
    import {useUserStore} from '@/store/User'
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