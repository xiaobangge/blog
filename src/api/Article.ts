import hyRequest from "../server";

interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}
// 获取文章类型列表
export async function getArticleTypeList() {
  return await hyRequest
   .request<DataType>({
      url: "/article/type/list",
      method: "GET",
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}

// 获取文章列表
export async function getArticleList(data) {
  return await hyRequest
   .request<DataType>({
      url: "/article/list",
      method: "post",
      data,
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}

// 新增文章
export async function addArticle(data: any) {
  return await hyRequest
   .request<DataType>({
      url: "/article/add",
      method: "POST",
      data,
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}
// 获取文章详情
export async function getArticleOne(id: any) {
  return await hyRequest
   .request<DataType>({
      url: `/article/detail/${id}`,
      method: "GET",
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}
// 按年份获取文章列表
export async function getArticleByYear(year: any) {
  return await hyRequest
   .request<DataType>({
      url: `/article/list/${year}`,
      method: "GET",
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}
// 按年份获取文章统计
export async function getArticleTotalByYear() {
  return await hyRequest
   .request<DataType>({
      url: `/article/year`,
      method: "GET",
      showLoading: false,
    })
   .then((res: { data: any }) => {
      return res.data;
    });
}