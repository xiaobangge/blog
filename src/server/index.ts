// service 统一出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
 
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config: { headers: { Authorization: string } }) => {
      const token = ''
      if (token) {
        config.headers.Authorization = `Bear ${token}`
      }
      // console.log('请求成功拦截')
      return config
    },
    requestInterceptorCatch: (err: any) => {
      // console.log('请求失败拦截')
      return err
    },
    responseInterceptor: (res: any) => {
      // console.log('响应成功拦截')
      return res
    },
    responseInterceptorCatch: (err: any) => {
      // console.log('响应成功拦截')
      return err
    }
  }
})
 
export default hyRequest