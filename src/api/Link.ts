import hyRequest from "../server";

interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}
// 获取友联列表

export async function getLinkListApi(data: any) {
  return await hyRequest
   .request<DataType>({
      url: "/link/list",
      method: "POST",
      data,
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}
// 添加友联列表

export async function addLinkListApi(data: any) {
  return await hyRequest
   .request<DataType>({
      url: "/link/add",
      method: "POST",
      data,
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}