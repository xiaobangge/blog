import hyRequest from "../server";

interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}
// 获取用户信息
export async function getUserInfoApi(data: any) {
  return await hyRequest
   .request<DataType>({
      url: "/user/info",
      method: "POST",
      data,
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}

// 获取文章、访客统计数据
export async function getStatisticsApi() {
  return await hyRequest
   .request<DataType>({
      url: "/statistics",
      method: "GET",
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}
// 获取头像
export async function getAvatarApi() {
  return await hyRequest
   .request<DataType>({
      url: `/avatar`,
      method: "GET",
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}
// 获取表情包
export async function getExpressionApi() {
  return await hyRequest
   .request<DataType>({
      url: `/expression`,
      method: "GET",
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}