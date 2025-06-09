<template>
  <div class="w-full flex commentListYL relative">
    <div v-show="commentStatus" class="w-full h-full absolute left-0 top-0 z-10 bg-[rgba(255,255,255,0.7)] text-(--theme-color) flex justify-center items-center">评论回复中。。。。。。</div>
    <div class="relative mr-[30px] hidden md:block">
      <img
        loading="lazy"
        :src="nickInfo.avatar || `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`"
        class="w-[40px] h-[40px] rounded-full"
        alt="avatar"
      />
      <img
        loading="lazy"
        :src="nickInfo.image"
        v-if="nickInfo.image"
        class="w-[65px] h-[65px] rounded-full absolute left-0 top-0 translate-x-[-12px] translate-y-[-15px] max-w-[100px]"
        alt="image"
      />
    </div>
    <div class="flex-1">
      <div class="flex w-full mb-[10px] flex-col md:flex-row">
        <el-input
          v-model="nickInfo.nickname"
          class="flex-1 mr-[30px]"
          placeholder="必填"
        >
          <template #prepend>昵称</template>
        </el-input>
        <el-input
          v-model="nickInfo.email"
          class="flex-1 mr-[30px] mt-[10px] md:mt-0"
          placeholder="必填"
        >
          <template #prepend>邮箱</template>
          <template #append>@qq.com</template>
        </el-input>
        <el-input v-model="nickInfo.url" class="flex-1 mt-[10px] md:mt-0" placeholder="选填">
          <template #prepend>网址</template>
        </el-input>
      </div>
      <div class="relative backgorund">
        <MdEditor
          class="relative z-2"
          v-model="content"
          :preview="false"
          :toolbars="[]"
          height="200px"
          :placeholder="placeholder"
          @focus="dm_bg = dm6"
          @blur="dm_bg = dm5"
        />
        <img
          loading="lazy"
          :src="dm_bg"
          class="absolute bottom-[25px] right-0 w-0 md:w-[100px]"
          alt="bg"
        />
        <div
          class="absolute top-[20px] left-[20px] opacity-[40%] flex flex-col"
          v-if="!content"
        >
          <span class="flex text-sm mb-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              style="width: 18px"
            >
              <path
                d="M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z"
              ></path>
            </svg>
            支持Mardown语法</span
          >
          <span class="flex text-sm mb-[10px]"
            >🐧 在邮箱处框输入QQ号会自动获取头像</span
          ><span class="flex text-sm"
            >📧本站已开启邮件通知，回复您评论的同时会发送通知邮箱给您，所以务必确保邮箱的有效性</span
          >
        </div>
      </div>
      <div class="flex justify-between my-[20px]">
        <div class="flex items-center">
          <div class="relative">
            <bk-svg iconName="icon-zu74" class="w-[30px] h-[30px] mr-[10px]" @click="isShowExpression = !isShowExpression" />
            <transition name="fade">
              <div
                class="w-[70vw] md:w-[400px] flex flex-wrap justify-center bg-white shadow-[0_0_10px_#ddd] absolute top-[40px] left-[0] z-10"
                v-if="isShowExpression"
              >
                <bk-tab
                  class="my-[20px] w-full"
                  :data="tabs"
                  v-model="activeTab"
                />
                <div class="flex flex-wrap w-full max-h-[300px] overflow-y-auto">
                  <div
                    v-for="(item, index) in expressionInfo[
                      tabs[activeTab].type
                    ] || []"
                    :key="index"
                    class="px-[10px] py-[10px] flex flex-col items-center justify-center w-[20%]"
                  >
                    <img
                      loading="lazy"
                      alt="avatar"
                      :src="item"
                      class="w-full h-full rounded-full mb-[10px] cursor-pointer"
                      @click="checkExpression(item)"
                    />
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div class="relative hidden md:block">
            <bk-button @click="isShowGj = !isShowGj" class="w-[80px] h-[25px] border-[4px] rounded-[30px]" title="挂件"></bk-button>
            <transition name="fade">
              <div
                class="w-[400px] flex flex-wrap justify-center bg-white shadow-[0_0_10px_#ddd] absolute top-[40px] left-[0] z-10"
                v-if="isShowGj"
              >
                <div class="flex w-full justify-between mb-[20px] px-[20px] py-[10px] border-b-[1px] border-gray-200">
                    <div class="flex items-center">
                        <bk-svg iconName="icon-icon-test" class="w-[20px] h-[20px] mr-[10px]" />
                        <span class="text-sm">挑选你的头像挂件</span>
                    </div>
                    <div class="text-(--theme-color) cursor-pointer text-sm" @click="nickInfo.image = ''">取消挂件</div>
                </div>
                <div class="flex flex-wrap w-full max-h-[300px] overflow-y-auto">
                  <div
                    v-for="(item, index) in avatarList"
                    :key="index"
                    class="px-[20px] py-[10px] flex flex-col items-center justify-center"
                    :class="{'w-[25%]': tabs[activeTab].type === 'hl', 'w-[20%]': tabs[activeTab].type === 'tl'}"
                  >
                    <img
                      loading="lazy"
                      alt="avatar"
                      :src="item"
                      class="w-full h-full rounded-full mb-[10px] cursor-pointer"
                      @click="nickInfo.image = item"
                    />
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="flex items-center">
            <el-button plain :disabled="!content" @click="isShowContent = !isShowContent">预览</el-button>
            <el-button type="primary" plain :disabled="!content || !nickInfo.nickname || !nickInfo.email" @click="submitComment">发表</el-button>
        </div>
      </div>
      <MdEditor class="w-full text-[18px] mt-[20px] p-[20px] border-[1px] border-gray-200" previewTheme="default" v-if="isShowContent" v-model="content"  readonly/>
      <div class="w-full flex justify-center mt-[20px]" v-if="!!id">
        <el-button type="primary" plain  @click="emit('cancel')">取消回复</el-button>
      </div>
    </div>
  </div>
</template> 
<script lang="ts" setup>
import dm5 from "@/assets/images/dm/dm5.png";
import dm6 from "@/assets/images/dm/dm6.png";
import { getAvatarApi, getExpressionApi } from "@/api/Main";
import {addComment} from '@/api/Comment'
import {useUserStore} from '@/store/User'

const userStore = useUserStore();
const {nickInfo} = toRefs(userStore);
const {setNickInfo} = userStore;

const emit =defineEmits(['update:modelValue', 'reset', 'cancel']);
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'comment', // 评论类型，可选值：comment、link、article
  },
  id: {
    type: String,
    default: '', // 评论的id，当回复他人评论时，需要传id
  },
  pid: {
    type: String,
    default: '', // 回复评论的id，当回复他人评论时，需要传pid
  },
  commentStatus: {
    type: Boolean,
    default: false, // 是否为评论状态，true为回复状态，false为评论状态
  },
  stopFetch: {
    type: Boolean,
    default: false, // 是否为评论状态，true为回复状态，false为评论状态
  },
  uid: {
    type: String,
    default: '', // 当评论文章时，需要传uid
  },
});
const dm_bg = ref(dm5 as any);
const isShowExpression = ref(false);
const isShowContent = ref(false);
const isShowGj = ref(false);
const placeholder = "";
const tabs = reactive([
  { name: "黄脸", type: "hl" },
  { name: "阿鲁", type: "tl" },
]);
const activeTab = ref(0);
const content = computed({
    get: () => props.modelValue,
    set: (val: string) => {
        emit('update:modelValue', val);
    },
})
// 头像挂件列表
const avatarList = ref([] as string[]);
// 表情包信息
const expressionInfo = ref({
  hl: [],
  tl: [],
} as any);
const initAvatar = async () => {
  const response = await getAvatarApi();
  avatarList.value = response.data;
  const res = await getExpressionApi();
  expressionInfo.value.hl = res.data.hl;
  expressionInfo.value.tl = res.data.tl;
};
const submitComment = () => {
  const info = JSON.parse(JSON.stringify(nickInfo.value));
    const from = {
        nickname: info.nickname,
        email: info.email + '@qq.com',
        url: info.url,
        avatar: info.avatar,
        image: info.image,
        target_id: props.id === props.uid ? '' : props.id,
        pid: props.pid,
        uid: props.uid,
    }
    const data = {
        type: props.type,
        content: content.value,
    }
    addComment({...from, ...data}).then((res: { code: number; message: any; }) => {
        if (res.code === 200) {
            setNickInfo(from);
            ElNotification({
                title: "",
                message: res.message,
                type: "success",
                duration: 1000,
                zIndex: 10000
            });
            content.value = "";
            emit('reset');
        } else {
            ElNotification({
                title: "",
                message: res.message,
                type: "error",
                duration: 1000,
                zIndex: 10000
            });
        }
    })
}
onMounted(() => {
  initAvatar();
});

const checkExpression = (expression: string) => {
  content.value = `${content.value}<img loading="lazy" src="${expression}" alt="expression" class="w-[35px]">`;
};
watch(
  () => nickInfo.value.email,
  (newVal) => {
    nickInfo.value.avatar =
      (newVal && `https://q1.qlogo.cn/g?b=qq&nk=${newVal}&s=100`) ||
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
  },
  { immediate: true }
);
</script> 
<style lang="scss" scoped>
.backgorund {
  ::v-deep(.md-editor),
  ::v-deep(.ͼ15) {
    background-color: transparent;
    font-family: inherit;
  }
}
</style>