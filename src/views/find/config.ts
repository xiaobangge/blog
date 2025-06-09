import { getFindTypeListApi, addFindListApi, type FindType, type FindParams } from "@/api/Find";

export const findType = ref([] as FindType[])

export const findData = ref([] as FindParams[])

export const findIndex = ref(0)

export const findRow = ref({} as FindParams)

export const mouseId = ref(0)

const colors = ['#12b7f5', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de']

export const getFindTypeList = async () => {
    const res = await getFindTypeListApi()
    findType.value = res.data?.map((item: any, index: number) => {
        return {
            ...item,
            color: colors[index % colors.length]
        }
    })
    findIndex.value = findType.value[0]?.id || 0
    changeFindType(findIndex.value);
}

export const getFindData = async () => {
    const info = {type: findIndex.value}
    const res = await addFindListApi(info)
    findData.value = res.data.list || []
    findRow.value = findData.value[0] || {}
}

export const changeFindType = (id: number) => {
    findIndex.value = id
    getFindData()
}
