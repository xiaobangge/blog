import type {
    // InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosRequestConfig
  } from 'axios'
  export interface HYRequestInterceptors {
    // 这里config的类型报错用AxiosRequestConfig和InternalAxiosRequestConfig都不行，还不知道解决方案暂用any
    requestInterceptor?: (
      config: any
    ) => any
    requestInterceptorCatch?: (error: any) => any
    responseInterceptor?: (config: AxiosResponse) => AxiosResponse
    responseInterceptorCatch?: (error: any) => any
  }
  export interface HYRequestConfig extends AxiosRequestConfig {
    interceptors?: HYRequestInterceptors
  }