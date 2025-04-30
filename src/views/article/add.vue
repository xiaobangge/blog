<template>
  <div class="w-full h-[100vh]  bg-[url('@/assets/images/bg/bg3.png')] bg-cover bg-center">
  <div class="max-w-[1200px] my-0 mx-auto pt-[200px]">
    <el-form
      :form="form"
      label-width="80px"
      label-position="top"
      class="text-[#fff]"
    >
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type">
            <el-option v-for="item in articleTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
            <img v-if="form.image" :src="form.image" alt="avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon" size="30px"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容">
         <div class="w-full h-[500px] justify-center items-center">
          <MdEditor v-model="form.content"/>
         </div>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="submit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script setup lang="ts">
import {Upload} from '@/utils/Upload'
import {getArticleTypeList, addArticle} from '@/api/Article'
// 定义文章model
const form = reactive({
  title: "",
  content: "",
  type: "",
  image: ''
});
// 获取文章类型列表 
const articleTypeList = ref([] as {
    label: string;
    value: string;
}[])
getArticleTypeList().then(res => {
  articleTypeList.value = res.data?.map((item: { name: any; id: any; }) => {
    return {
        label: item.name,
        value: item.id
    }
  })
})

const customUploader = async (row: any) => {
    console.log(row.file)
    const result = await Upload(row.file, 'img')
    return result
};

const handleSuccess = (res: any) => {
    console.log(res)
    form.image = '/file/images/' + res.data.url
};
const submit = () => {
  addArticle(form).then(res => {
    console.log(res)
    ElNotification.success('发布成功')
  })
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  color: #fff;
  font-size: 24px;
}
</style>