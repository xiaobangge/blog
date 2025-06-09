<template>
    <div class="w-[90%] sm:w-[80%] md:w-[70%] mx-auto h-full flex flex-col pt-[120px] justify-center text-black">
      <div class="w-full p-[20px] rounded-[10px] bg-white min-h-[80vh]">
          <bk-tab class="mb-[30px]" :data="tabs" v-model="activeTab" />
          <component :is="Components[activeTab]"></component>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import sqLinks from './components/sqLinks.vue'
  import qzLinks from './components/qzLinks.vue'
  import tjLink from './components/tjLink.vue'
  const activeTab = ref(0)
  const Components = [sqLinks, qzLinks, tjLink]
  const tabs = reactive([
  {
          name: '申请友联',
          icon: 'icon-lianjieyaoqing',
          type: 1
      },
      {
          name: '全站友联',
          icon: 'icon-lianjie',
          type: 2
      },
      {
          name: '推荐链接',
          icon: 'icon-fenxianglianjie',
          type: 3
      },
  ])
  </script>