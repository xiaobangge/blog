// 存储用户信息 - userinfo
import { defineStore } from 'pinia'
export const useConfigStore = defineStore('config', {
  state: () => ({
    isLoading: false
  }),
  getters: {
    getIsLoading(state) {
      return state.isLoading
    }
  },
  actions: {
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },
  }
})