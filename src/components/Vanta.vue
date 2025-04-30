<template>
    <div class="w-full h-[100vh] fixed top-0 left-0 z-0" ref="vantaRef"></div>
</template>

<script lang="ts" setup>
 const props = defineProps({
     type: {
         type: String,
         default: "BIRDS"
     },
})
const vantaEffect: any = ref(null);
const vantaRef = ref(null);
onMounted(() => {
  vantaEffect.value = window.VANTA[props.type]({
    el: vantaRef.value,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: 0x28a2ff,
    color1: 0xd92929,
    colorMode: "variance",
    birdSize: 0.90,
    wingSpan: 18.00,
    speedLimit: 4.00,
    separation: 51.00,
    alignment: 27.00,
    cohesion: 26.00
  });
});

onUnmounted(() => {
  vantaEffect.value?.destroy();
});
</script>