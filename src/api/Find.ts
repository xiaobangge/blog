import hyRequest from "../server";

export interface FindType {
    id: number;
    title: string;
    image_url: string;
    color: string;
}

interface DataType {
  data: FindType[];
  code: string;
  message: string;
}
export interface FindParams {
    id: number;
    title: string;
    image_url: string;
    content: string;
    type: number;
}
interface RequestFindParams {
    data: FindParams[];
    code: string;
    message: string;
}
// 获取发现类型列表

export async function getFindTypeListApi() {
  return await hyRequest
   .request<DataType>({
      url: "/find/type",
      method: "POST",
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}
// 获取发现列表
export async function addFindListApi(data: any) {
  return await hyRequest
   .request<RequestFindParams>({
      url: "/find/list",
      method: "POST",
      data,
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}