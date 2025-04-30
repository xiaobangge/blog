import hyRequest from "../server";
interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}

export function getMoments() {
  return hyRequest.request({
    url: "/moments/get",
    method: "GET",
  });
}

// 获取动态列表
export async function getMomentsList(data: any) {
    return await hyRequest
     .request<DataType>({
        url: "/moments/list",
        method: "post",
        data,
        showLoading: false,
      })
     .then((res: any) => {
        return res.data;
      });
  }

// 新增动态
export async function addMoments(data: any) {
    return await hyRequest
     .request<DataType>({
        url: "/moments/add",
        method: "POST",
        data,
        showLoading: false,
      })
     .then((res: any) => {
        return res.data;
      });
  }