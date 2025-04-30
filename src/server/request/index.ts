import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'
 
class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
 
    //请求拦截器->先添加得后执行，响应拦截器->先添加得先响应
 
    //从config中取出得拦截器是对应得实例得拦截器
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
 
    //添加所有实例都有得拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都有得拦截器： 请求拦截成功')
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        // console.log('所有实例都有得拦截器： 响应拦截成功')
        return config
      },
      (err) => {
        return err
      }
    )
  }
 
  async request(config: HYRequestConfig): Promise<void> {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    const res: any = await this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        return config.interceptors.responseInterceptor(res)
      }
      return res
    })
    return res
  }
}
 
export default HYRequest