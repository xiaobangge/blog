import hyRequest from "../server";

interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}
// 上传图片
export async function UploadImg(newsform: FormData) {
  return await hyRequest
    .request<DataType>({
      url: "/upload/image",
      method: "POST",
      showLoading: false,
      data: newsform,
    })
    .then((res: { data: any }) => {
      return res.data;
    });
}
// 上传视频
export async function UploadVideo(newsform: FormData) {
  return await hyRequest
    .request<DataType>({
      url: "/upload/video",
      method: "POST",
      showLoading: false,
      data: newsform,
    })
    .then((res: { data: any }) => {
      return res.data;
    });
}
