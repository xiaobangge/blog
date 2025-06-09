import hyRequest from "../server";

interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}
// 获取项目列表

export async function getProjectListApi(data: any) {
  return await hyRequest
   .request<DataType>({
      url: "/project/list",
      method: "POST",
      data,
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}