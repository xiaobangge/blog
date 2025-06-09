import hyRequest from "../server";

interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}
export async function getMusicList() {
  return await hyRequest
    .request<DataType>({
      url: "/music/list",
      method: "GET",
      showLoading: false,
    })
    .then((res: { data: any }) => {
      return res.data;
    });
}
export async function getMusic(data: any) {
  return await hyRequest
    .request<DataType>({
      url: "/music/get",
      method: "POST",
      showLoading: false,
      data,
      responseType: "arraybuffer",
    })
    .then((res: { data: any }) => {
      // 处理ArrayBuffer
      const arrayBuffer = res.data;
      // 例如，转换为Uint8Array以便进一步处理
      const uint8Array = new Uint8Array(arrayBuffer);
      return new Blob([uint8Array], { type: "audio/mp3" });
    });
}
// import axios from 'axios'

// const instance = axios.create({
//   baseURL: '/music',
//   timeout: 100000,
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8'
//   }
// })

// // 请求获取音乐列表
// export async function getMusicList() {
//   const res = await instance.post('/api/music/rank-list-info/52144')
//   return res.data
// }
// // 请求获取音乐列表
// export async function getMusic(params: string) {
//   const res = await instance.get(`/song/media/outer/url?${params}`)
//   // 处理ArrayBuffer
//   const arrayBuffer = res.data;
//   // 例如，转换为Uint8Array以便进一步处理
//   const uint8Array = new Uint8Array(arrayBuffer);
//   console.log(uint8Array);
//   return uint8Array
// }

// 获取视频列表
export async function getVideoList(type: string) {
  return await hyRequest
    .request<DataType>({
      url: `/video/list/${type}`,
      method: "POST",
      showLoading: false
    })
    .then((res: { data: any }) => {
      return res.data
    });
}
// 获取视频详情
export async function getVideoDetail(vid: string) {
  return await hyRequest
    .request<DataType>({
      url: `/video/get/${vid}`,
      method: "POST",
      showLoading: false
    })
    .then((res: { data: any }) => {
      return res.data
    });
}
