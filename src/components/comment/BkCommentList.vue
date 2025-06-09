<template>
    <div ref="highlightRef">
      <div class="flex flex-col justify-between items-center rounded-xl p-[20px] pb-0 bg-[#fff] text-[#333]"
          v-for="(item, index) in data" :key="index">
        <div class="flex w-full">
          <img :src="item?.avatar ?? (stopFetch && userInfo.avatar)" class="w-[50px] h-[50px] rounded-full mr-[10px]" alt="" loading="lazy"/>
          <div class="flex flex-col">
            <div class="text-[20px] font-bold flex items-center">
                {{item?.nickname ?? (stopFetch && userInfo.username)}}
                <div class="font-normal text-[14px] ml-[30px] text-[#999]" v-if="item.pName">回复 <span class="text-(--theme-color)">{{item?.pName}}</span></div>
            </div>
            <div class="text-[16px]">{{ timeReset(item.create_at) }}</div>
          </div>
          <div class="flex flex-1 justify-end">
            <bk-svg @click="isShowById = item.id" iconName="icon-dianzan1" color="var(--theme-color)" class="w-[20px] h-[20px] mr-[20px] cursor-pointer"/>
            <bk-svg @click="isShowById = item.id" iconName="icon-pinglun" color="var(--theme-color)" class="w-[20px] h-[20px] cursor-pointer"/>
          </div>
        </div>
          <MdEditor class="w-full text-[18px] mt-[20px] leading-[30px] pl-[70px] shadow-[0px_0px_10px_rgba(0, 0, 0, 0.1)] bg-size-[100%_30px]" :class="{'backgorund': type === 'comment'}" v-model="item.content"  readonly/>
          <transtion name="fade" mode="out-in" class="w-full">
            <div class="p-[20px] w-full" v-if="isShowById === item.id">
                 <write-comment v-model="content" :type="type" @reset="resetEvent" :stopFetch="stopFetch" :uid="uid || (stopFetch ? item.id : uid)" :id="item.id" :pid="item.pid || item.id" @cancel="isShowById = ''"/>
            </div>
          </transtion>
          <div class="w-full border-b-[1px] border-dashed border-[#999] mt-[20px]"></div>
          <div class="md:p-[20px] w-full" v-if="item.children?.length">
            <bk-comment-list :data="item.children" :level="level + 1" :stopFetch="stopFetch" :uid="uid || (stopFetch ? item.id : uid)" @comment_status="emit('comment_status', $event)" :type="type"/>
          </div>
      </div>
      <div class="mt-[30px] flex justify-center" v-if="level === 0">
        <el-pagination background layout="prev, pager, next" :page-size="pageSize" :current-page="page" @current-change="emit('currentChange', $event)" :total="total" hide-on-single-page/>
      </div>
    </div>
</template>
<script lang="ts" setup>
import timeReset from '@/utils/timeResert'
const emit = defineEmits(['currentChange', 'reset', 'comment_status'])
import {useUserStore} from '@/store/User'
const {userInfo} = toRefs(useUserStore())
defineProps({
    type: {
        type: String,
        default: "link"
    },
    pageSize: {
        type: Number,
        default: 5
    },
    total: {
        type: Number,
        default: 0
    },
    page: {
        type: Number,
        default: 1
    },
    data: {
        type: Array<any>,
        default: () => []
    },
    level: {
        type: Number,
        default: 0
    },
    uid: {
        type: String,
        default: ''
    },
    stopFetch: {
        type: Boolean,
        default: false
    }
})
const content = ref('')
const isShowById = ref('')

const resetEvent = () => {
    content.value = ''
    isShowById.value = ''
    emit('reset');
}
watch(() => isShowById.value, (val) => {
    emit('comment_status', !!val)
})
</script>
<style lang="scss" scoped>
.backgorund {
  background-image: linear-gradient(90deg,transparent 50px,#ffb4b8 50px,#ffb4b8 52px,transparent 52px),linear-gradient(#e1e1e1 .1em,transparent .1em);
  min-height: 100px;
  ::v-deep(.md-editor) {
    background-color: transparent;
    font-family: inherit;
  }
}
</style>