// import hyRequest from '../server'

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
// export async function getMusicList() {
// return await hyRequest
// .request<DataType>({
//   url: '/music/list',
//   method: 'GET',
//   showLoading: false
// }).then((res: { data: any }) => {
//   return res.data
// })
// } 

import axios from 'axios'

const instance = axios.create({
  baseURL: '/music',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求获取音乐列表
export async function getMusicList() {
  const res = await instance.post('/api/music/rank-list-info/52144')
  return res.data
}