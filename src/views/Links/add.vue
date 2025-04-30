<template>
  <div
    class="w-full h-[100vh] bg-[url('@/assets/images/bg/bg3.png')] bg-cover bg-center"
  >
    <div class="max-w-[1200px] my-0 mx-auto pt-[200px]">
      <el-form
        :form="form"
        label-width="80px"
        label-position="top"
        class="text-[#fff]"
      >
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type">
            <el-option
              v-for="item in articleTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章头图">
          <el-upload
            class="w-[100px] h-[100px] rounded-2xl leading-[100px] text-center"
            :class="{ 'border-[1px] border-[#fff]': !form.image }"
            :http-request="customUploader"
            :on-success="handleSuccess"
            multiple
          >
            <img
              v-if="form.image"
              :src="form.image"
              alt="avatar"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon" size="30px"
              ><Plus
            /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { Upload } from "@/utils/Upload";
import { addLinkListApi } from "@/api/Link";
// 定义文章model
const form = reactive({
  name: "",
  remark: "",
  type: "",
  url: "",
  image: "",
});
// 获取文章类型列表
const articleTypeList = ref([
  { label: "全站友联", value: 1 },
  { label: "推荐链接", value: 2 },
] as {
  label: string;
  value: number;
}[]);

const customUploader = async (row: any) => {
  const result = await Upload(row.file, "img");
  return result;
};

const handleSuccess = (res: any) => {
  form.image = "/file/images/" + res.data.url;
};
const submit = () => {
  addLinkListApi(form).then((res: any) => {
    ElNotification({
      title: "",
      message: res.message,
      type: "success",
      duration: 1000,
      zIndex: 10000,
    });
  });
};
</script>
  
  <style lang="scss" scoped>
::v-deep .el-form-item__label {
  color: #fff;
  font-size: 24px;
}
</style>