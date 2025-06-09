<template>
    <div class="flex flex-col min-h-[100vh]">
      <Layoyts />
      <router-view class="flex-grow flex flex-col"></router-view>
      <footer-vue class="flex-shrink-0"></footer-vue>
    </div>
</template>

<script lang="ts" setup>
import Layoyts from "@/Layouts/index.vue";
import FooterVue from "@/views/Footer/index.vue";

</script>