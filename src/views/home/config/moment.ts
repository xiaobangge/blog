import { getMomentsList } from "@/api/Moments";
export const momentsList = ref([] as any[]);
export const MomentsRef = ref(null);
export const isNeedTran = ref(true);
export const isMoveIng = ref(false);
// 当前动画的索引
const MomentsIndex = ref(1);
// 获取动态列表
export const queryMoments = async () => {
  const res = await getMomentsList({});
  momentsList.value = res.data;
  createMomentsInterval();
};
const setTimeer = ref(null as any)
// 手写动态列表轮播效果
export const createMomentsInterval = () => {
  const Moments: any = MomentsRef.value;
  if (momentsList.value.length < 2) {
    setTimeer.value && clearTimeout(setTimeer.value)
    setTimeer.value = null
    return
  };
  isNeedTran.value = true;
  setTimeer.value = setTimeout(() => {
    if (isMoveIng.value) {
      setTimeer.value && clearTimeout(setTimeer.value)
      setTimeer.value = null
      return
    }
    Moments.style.transform = `translateY(-${MomentsIndex.value * 50}px)`;
    if (MomentsIndex.value === momentsList.value.length+ 1) {
      isNeedTran.value = false;
      MomentsIndex.value = 1;
      Moments.style.transform = `translateY(0)`;
      setTimeout(() => {
        createMomentsInterval();
      }, 100);
    } else {
      ++MomentsIndex.value;
      createMomentsInterval();
    }
  }, 2000);
};
