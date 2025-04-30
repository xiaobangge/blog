import hyRequest from "../server";
interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}

// 获取评论列表
export async function getCommentList(data: any) {
    return await hyRequest
     .request<DataType>({
        url: "/comment/list",
        method: "post",
        data,
        showLoading: false,
      })
     .then((res: { data: any }) => {
        return res.data;
      });
  }

// 新增评论
export async function addComment(data: any) {
    return await hyRequest
     .request<DataType>({
        url: "/comment/add",
        method: "POST",
        data,
        showLoading: false,
      })
     .then((res: { data: any }) => {
        return res.data;
      });
  }