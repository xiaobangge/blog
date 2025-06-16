// 存储用户信息 - userinfo
import { defineStore } from 'pinia'
import {getUserInfoApi, saveVisitor} from '@/api/Main'
const userinfo: any = localStorage.getItem('userInfo')
console.log(userinfo, 'userinfo')
const nickInfo: any = localStorage.getItem('nickInfo')
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: userinfo && userinfo !== 'undefined' ? JSON.parse(userinfo) : {},
    writePath: ['/home', '/TreeHole', '/Archives', '/Find'], //白名单 - 控制头部菜单背景显示
    nickInfo: nickInfo? JSON.parse(nickInfo) : {},
  }),
  getters: {
    getUserInfo(state) {
      return state.userInfo
    }
  },
  actions: {
    // 判断当前路由是否在白名单内
    isWritePath(type: boolean = false) {
      const route = useRoute()
      const path = route.path
      const isWrite = this.writePath.includes(path)
      return type? isWrite : !isWrite
    },
    setUserInfo(userInfo: {}) {
      this.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    setNickInfo(nickInfo: {}) {
      this.nickInfo = nickInfo
      localStorage.setItem('nickInfo', JSON.stringify(nickInfo))
    },
    // 储存访客信息
    async saveVisitInfo(data: any) {
         await saveVisitor(data)
    },
    // 获取用户信息
    async initUserInfo() {
        const res = await getUserInfoApi()
        if (res.code === 200) {
            console.log(res.data)
            this.setUserInfo(res.data)
        }
    }
  }
})