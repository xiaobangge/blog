<template>
  <el-drawer
    v-model="drawer"
    direction="ttb"
    size="100%"
    close-on-press-escape
    :with-header="false"
    body-class="music-theme-drawer"
  >
  <Theme1 v-if="theme === 1" v-model="theme" />
  <Theme2 v-else v-model="theme"/>
  </el-drawer>
</template>

<script setup lang="ts">
import Theme1 from './theme_music/theme1.vue';
import Theme2 from './theme_music/theme2.vue';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});

const drawer = computed({
    get: () => props.modelValue,
    set: (value: boolean) => {
        emit('update:modelValue', value);
    },
});

const theme = ref(1)
</script>

<style scoped>
.music-theme-drawer {
    background-color: #ff0;
}
</style>