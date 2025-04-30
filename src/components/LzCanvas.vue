<template>
  <canvas id="html5_3d_animation" class="w-full h-full"></canvas>
</template>

<script lang="ts" setup>
import '@/assets/js/jquery.min'
import '@/assets/js/html5_3d_animation'
const canvas = ref(null as any);
onMounted(() => {
    const $: any = window.$
    $(function() {
        $("#html5_3d_animation").html5_3d_animation({
            window_width: '600',
            window_height: '400',
            window_background: '#00113F',
            star_count: '1000',
            star_color: '#FBFFAF',
            star_depth: '100'
        });
    });
})
</script>