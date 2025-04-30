<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from "vue";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import {Upload} from '@/utils/Upload'
const emit = defineEmits(['change'])
const editorRef = shallowRef();
const valueHtml = ref(``);
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

watch(
  () => valueHtml.value,
  (newVal) => {
    emit("change", newVal)
  },
  {
    immediate: true,
  }
);
onMounted(() => {
  console.log(props.content);
  valueHtml.value = props.content;
});
const toolbarConfig = {
  excludeKeys: [],
};
const editorConfig = {
  placeholder: "请输入内容...",
  readOnly: props.readonly,
  MENU_CONF: {
    // 上传图片配置
    uploadImage: {
      //   server: "/api/upload/image",
      fieldName: "wangeditor-uploaded-image",
      // "tenant-id": "1",
      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ["image/*"],
      //   fieldName: "file", // 这里有个坑，如果返回的响应结果是没有上传文件，跟这里关系很大
      customInsert(
        res: { code: number; data: any },
        insertFn: (arg0: any, arg1: any, arg2: any) => void
      ) {
        console.log(res);
        if (res.code == 0) {
          insertFn(res.data, null, res.data);
        }
      },

      async customUpload(file: string|Blob, insertFn: (arg0: string) => void) {
        // JS 语法
        /* file 即选中的文件
         */
        const result = await Upload(file, 'img')
        const url = "/file/images/" + result.data.url;
        // 最后插入图片
        insertFn(url);
      },
    },
    // 上传视频配置
    uploadVideo: {
        fieldName: "wangeditor-uploaded-video",
        allowedFileTypes: ["video/*"],
        customInsert(
          res: { code: number; data: any },
          insertFn: (arg0: any, arg1: any, arg2: any) => void
        ) {
          console.log(res);
          if (res.code == 0) {
            insertFn(res.data, null, res.data);
          }
        },
        async customUpload(file: string|Blob, insertFn: (arg0: string) => void) {
          // JS 语法
          /* file 即选中的文件
           */
            const result = await Upload(file, 'video')
          const url = "/file/video/" + result.data.url;
          // 最后插入图片
          insertFn(url);
        }
    }
  },
};
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<template>
  <div class="w-full">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="default"
      v-if="!props.readonly"
    />
    <Editor
      style="height: 500px;overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      mode="default"
      @onCreated="handleCreated"
    />
  </div>
</template>