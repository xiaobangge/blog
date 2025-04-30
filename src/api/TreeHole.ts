
import hyRequest from "../server";

interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}
// 获取文章列表
export async function getTreeHoleList(data: any) {
  return await hyRequest
   .request<DataType>({
      url: "/treehole/list",
      method: "post",
      data,
      showLoading: false,
    })
   .then((res: any) => {
      return res.data;
    });
}
// 新增树洞

export async function addTreeHole(data: any = {}) {
    return await hyRequest
     .request<DataType>({
        url: "/treehole/add",
        method: "post",
        data,
        showLoading: false,
      })
     .then((res:any) => {
        return res.data;
      });
  }