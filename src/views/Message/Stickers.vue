<template>
    <!-- 贴纸容器 -->
    <div class="w-full h-[600px] relative" ref="stickerRefs" v-html="stickerHtml"></div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])
import timeReset from '@/utils/timeResert'
import { h, render } from 'vue'
import MdEditor from '@/components/MdEditor.vue'
const props = defineProps({
    modelValue: {
        type: Array<any>,
        default: () => []
    }
})
const stickerHtml = ref('')
const data = computed(() => props.modelValue)
const zIndex = ref(0)

const stickerRefs = ref(null as any) // 贴纸容器

// 渲染贴纸
const renderSticker = () => {
    const stickerContainer = stickerRefs.value
    if (!stickerContainer) return
    removeEventListener()
    stickerHtml.value = ''
    const stickerContainerWidth = stickerContainer.offsetWidth
    const children: any[] = []
    data.value.forEach((item) => {
        const topView = writeHeader(item)
        const contentView = writeContent(item)
        const BigView = writeSticker(stickerContainerWidth, [topView, contentView])
        children.push(BigView)
    })
    const temp = h('div', {}, children)
    render(temp, stickerContainer); // VNode → 真实 DOM:ml-citati
    // 监听点击事件
    nextTick(() => {
        eventListener()
    })
}
// 撰写大容器
const writeSticker = (width: number, children: any[]) => {
    // const div = document.createElement('div')
    const bgColor = randomColor()
    const left = randomLeft(width)
    const top = randomLeft(600)
    return h('div', {
        class: ` shadow-[0_2px_10px_1px_#0003] w-[200px] h-[200px] rounded-[400px_30px_30px_40px/40px_500px_400px_300px] absolute z-0 text-white overflow-hidden cursor-move sticker`,
        style: {backgroundColor: bgColor, left: left + 'px', top: top + 'px'}
    }, children)
}
// 撰写内容容器
const writeContent = (item: any) => {
    const div = h(MdEditor, {
        class: 'w-full bg-[transparent] flex items-center p-[10px]',
        modelValue: item.content,
        readonly: true,
        previewTheme: 'default',
        textColor: '#fff',
        fontSize: '14px',
    })
    return div
}
// 撰写头部容器
const writeHeader = (item: any) => {
    return h('div', {
        class: ` flex justify-between items-center w-full p-[5px_10px] border-b-[1px] border-dashed border-white`
    }, [
        h('div', {
            class: 'flex items-center'
        }, [
            h('img', {
                class: 'w-[20px] h-[20px] rounded-[50%] mr-[10px]',
                src: item.avatar
            }),
            h('span', {
                class: 'text-[14px]',
                textContent: item.nickname
            })
        ]),
        h('div', {
            class: 'flex items-center text-[14px]'
        }, [
            h('span', {
                textContent: timeReset(item.create_at)
            })
        ])
    ])
}
// 自定义随机rgba颜色
const randomColor = () => {
    const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`
    return color
}
// 自定义0-1000之间随机的left值
const randomLeft = (width: number) => {
    const left = Math.floor(Math.random() * (width - 200))
    return left
}
// 监听数据变化
watch(() => data.value, () => {
    renderSticker()
}, {immediate: true})
// 监听点击事件
const isDragging = ref(false)
let offsetX = 0
let offsetY = 0
// 监听鼠标移动事件
const handleMouseMove = (e: MouseEvent, dragElement: any) => {
    if (isDragging.value) {
        const stickerContainer = stickerRefs.value
        const stickerContainerWidth = stickerContainer.offsetWidth
        const stickerContainerHeight = stickerContainer.offsetHeight
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;
        x = Math.max(0, Math.min(x, stickerContainerWidth - dragElement.offsetWidth));
        y = Math.max(0, Math.min(y, stickerContainerHeight - dragElement.offsetHeight));
        dragElement.style.left = x + 'px';
        dragElement.style.top = y + 'px';
    }
}
// 监听鼠标抬起事件
const handleMouseUp = () => {
    isDragging.value = false;
}
// 监听鼠标按下事件
const handleMouseDown = (e: MouseEvent, dragElement: any) => {
    console.log('鼠标按下事件', e)
    // const dragElement = demo.target;
    isDragging.value = true;
    offsetX = e.clientX - dragElement.offsetLeft;
    offsetY = e.clientY - dragElement.offsetTop;
    ++zIndex.value
    dragElement.style.zIndex = zIndex.value.toString()
    console.log('鼠标按下事件', offsetX, offsetY)
}
// 事件监听
const eventListener = () => {
    const stickerList = stickerRefs.value?.querySelectorAll('.sticker') || []
    stickerList.forEach((item: any) => {
        item.addEventListener('mousedown', (e: any) => handleMouseDown(e, item))
        item.addEventListener('mousemove', (e: any) => handleMouseMove(e, item))
        window.addEventListener('mouseup', handleMouseUp)
    })
}
// 移除事件监听
const removeEventListener = () => {
    const stickerList = stickerRefs.value?.querySelectorAll('.sticker') || []
    stickerList.forEach((item: any) => {
        item.removeEventListener('mousedown', (e: any) => handleMouseDown(e, item))
        item.removeEventListener('mousemove', (e: any) => handleMouseMove(e, item))
        window.removeEventListener('mouseup', handleMouseUp)
    })
}
// 组件销毁时移除事件监听
onUnmounted(() => {
    removeEventListener()
})
</script>