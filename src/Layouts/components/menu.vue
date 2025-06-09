<template>
  <div class="flex justify-center w-full">
    <ul v-if="!size" class="flex justify-around items-center w-full" :class="{ 'text-black': isWritePath(), 'text-white': isWritePath(true) }">
      <li
        class="font-bold text-nowrap text-lg px-6 py-[4px] h-lg inline-block hover:bg-[#425aef] hover:text-white cursor-pointer rounded-[40px]"
        @click="toRoute('/Archives')"
      >
        归档
      </li>
      <li
        class="font-bold text-nowrap relative text-lg px-6 py-[4px] h-lg inline-block hover:bg-[#425aef] hover:text-white cursor-pointer rounded-[40px]"
        @mouseenter="isFiniteHome = true"
        @mouseleave="isFiniteHome = false"
      >
        逛逛
        <transition>
          <div
            v-show="isFiniteHome"
            class="py-2 absolute bottom-0 left-[50%] h-16 translate-x-[-50%] translate-y-1/1"
          >
            <div
              class="border-[#425aef] p-2 bg-white border-1 h-full flex flex-nowrap justify-center items-center rounded-[40px]"
            >
              <div
                v-for="menu in menus"
                :key="menu.name"
                class="px-5 py-2 rounded-2xl hover:bg-[#425aef] hover:text-white mx-10 w-full h-full text-center text-black text-sm flex justify-center items-center cursor-pointer"
                @click="toRoute(menu.path)"
              >
                <svg class="h-[20px] w-[20px]" aria-hidden="true">
                  <use :xlink:href="'#' + menu.icon"></use>
                </svg>
                <div class="ml-2 text-nowrap">{{ menu.name }}</div>
              </div>
            </div>
          </div>
        </transition>
      </li>
      <li
        class="font-bold text-nowrap text-lg px-6 py-[4px] h-lg inline-block hover:bg-[#425aef] hover:text-white cursor-pointer rounded-[40px]"
        @click="toRoute('/Find')"
      >
        发现
      </li>
    </ul>
    <div class="w-full text-[#333]" v-else>
      <div class="flex justify-center items-center p-[8px] rounded-[6px] bg-white border-[1px] border-[#efefef]" @click="toRoute('/')">
        <bk-svg iconName="icon-shouye" class="mr-[10px] h-[14px] w-[14px]"/>
        首页
      </div>
      <div class="flex mt-[20px] justify-center items-center p-[8px] rounded-[6px] bg-white border-[1px] border-[#efefef]" @click="toRoute('/Archives')">
        <bk-svg iconName="icon-guidang" class="mr-[10px] h-[14px] w-[14px]"/>
        归档
      </div>
      <div class="mt-[30px]">
        <span>逛逛</span>
        <ul class="flex flex-wrap justify-between items-center">
          <li class="flex w-[48%] mt-[10px] justify-center items-center p-[8px] rounded-[6px] bg-white border-[1px] border-[#efefef]" 
              :class="{'w-full': index === 0}"
              @click="toRoute(menu.path)"
              v-for="(menu, index) in menus" :key="menu.name">
              <bk-svg :iconName="menu.icon" class="mr-[5px] h-[14px] w-[14px]"/>
              <div class="ml-2 text-nowrap">{{ menu.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isFiniteHome = ref(false);
import {useUserStore} from '@/store/User'
const {isWritePath} = useUserStore()
const emit = defineEmits(['close'])
defineProps({
  size: {
    type: String,
    default: ''
  }
})
const menus = reactive([
  {
    name: "闲言碎语",
    icon: "icon-wenjuan",
    path: "/Moments",
  },
  {
    name: "友联",
    icon: "icon-A",
    path: "/Links",
  },
  {
    name: "树洞",
    icon: "icon-shudongliuyan",
    path: "/TreeHole",
  },
  {
    name: "留言板",
    icon: "icon-liuyanban",
    path: "/Message",
  },
  {
    name: "关于",
    icon: "icon-guanyu",
    path: "/About",
  },
]);
const router = useRouter();
const toRoute = (path: string) => {
  emit('close')
  router.push(path);
};
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>