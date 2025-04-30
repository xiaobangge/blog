<template>
  <div
    class="h-[100vh] flex flex-col justify-center items-center bg-[url('@/assets/images/bg/bg10.png')] bg-cover bg-center"
    ref="treeholeRef"
  >
    <h1 class="text-5xl font-bold tracking-[5px]">树洞</h1>

    <div class="flex justify-center items-center mt-10  relative z-30">
      <div class="input-container relative w-full max-w-[270px]">
        <input
          v-model="content"
          autocomplete="off"
          class="input w-full h-[60px] p-[12px] text-[20px] text-[#333] outline-none bg-[#fff] border-[4px] border-[#000] rounded-0 transition-all duration-300 shadow-[8px_8px_0_#000] hover:translate-[-4px_-4px] hover:shadow-[12px_12px_0_#000] focus:bg-[#010101] focus:text-[#fff] focus:border-[#d6d9dd]"
          name="text"
          type="text"
          placeholder="在这留下你的足迹吧..."
        />
      </div>

      <div
        class="cta cursor-pointer flex px-[33px] py-[10px] text-decoration-none text-[25px] text-[#fff] bg-[#6225e6] transition-all duration-1000 shadow-[6px_6px_0_black] transform-[skewX(-15deg)] border-none hover:shadow-[10px_10px_0_#fbc638] hover:transition-all hover:duration-500 focus:outline-none"
        @click="addTree"
      >
        <span class="span text-nowrap">发送</span>
        <span class="second flex items-center">
          <svg
            class="w-[50px] h-[30px]"
            viewBox="0 0 66 43"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="arrow"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <path
                class="one"
                d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                fill="#FFFFFF"
              ></path>
              <path
                class="two"
                d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                fill="#FFFFFF"
              ></path>
              <path
                class="three"
                d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                fill="#FFFFFF"
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
    <div class="fixed w-[100vw] h-[100vh] top-0 left-0 z-10 pt-[120px]">
      <!-- 弹幕 -->
      <vue-danmaku
        ref="danmakuRef"
        v-model="holeList"
        class="w-full h-full"
        :speeds="100"
        :debounce="500"
        :randomChannel="true"
        :isSuspend="true"
        useSlot
        @play-end="playEnd"
      >
        <template v-slot:dm="{ danmu }">
          <div class="dmDiv" :style="{ color: getRandomColor() }">
            <span>{{ danmu.content }}</span>
            <p class="text-[20px]">{{ moment(danmu.create_at).format("YYYY-MM-DD HH:mm:ss") }}</p>
          </div>
        </template>
      </vue-danmaku>
    </div>
  </div>
</template>
<script setup lang="ts">
import vueDanmaku from "vue3-danmaku";
import { getTreeHoleList, addTreeHole } from "@/api/TreeHole";
// import { vanta } from "@/utils/vanta";
import moment from "moment";
const treeholeRef = ref(null as any);
const content = ref("");
const holeList = ref<any[]>([]);
const danmakuRef = ref(null as any);

const getHoleList = async () => {
  const res = await getTreeHoleList({});
  if (res.code === 200) {
    const list = res.data.list.filter((rr: { id: any; }) => holeList.value.findIndex(item => item.id === rr.id) === -1);
    danmakuRef.value.stop();
    danmakuRef.value.reset();
    setTimeout(() => {
        holeList.value = res.data.list;
        list?.forEach((item: any) => {
        danmakuRef.value.add(item);
      });
    }, 100);
  }
};
//播放结束，重新查询
const playEnd = () => {
    getHoleList();
};

const addTree = async () => {
  if (content.value.trim() === "") {
    return;
  }
  const res = await addTreeHole({ content: content.value });
  if (res.code === 200) {

    ElNotification.success({
        title: "发送成功！",
    });
    content.value = "";
    getHoleList()
  }
};
const colorList = ref(['rgb(204,255,255)', 'white', 'rgb(204,255,204)', 'white', 'rgb(0,255,255)', 'white', 'rgb(255,204,255)', 'pink'],)
// 生成随机颜色的函数  
function getRandomColor() {
    const color = colorList.value[Math.floor(Math.random() * 8)]
    return color
}

onMounted(() => {
  getHoleList();
//   vantaEffect.value = vanta(treeholeRef.value, "rings", {
//     backgroundColor: 0x7070,
//   });
});
</script>
<style lang="scss" scoped>
.barrage {
  width: 100%;
  height: 80%;
  position: absolute;
  top: 100px;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
  font-size: 20px;
  color: #ffffff;
  z-index: 1;
}

.dmDiv {
  user-select: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
.dmDiv p {
  font-size: 14px;
  opacity: 0;
}

.dmDiv:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dmDiv:hover p {
  opacity: 1;
}

/* -------------input--------------- */
.input:focus::placeholder {
  color: #fff;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

.input:focus::after {
  content: "|";
  position: absolute;
  right: 10px;
  animation: blink 0.7s step-end infinite;
}

.input:valid {
  animation: typing 2s steps(30, end);
}
.input::placeholder {
  color: #888;
}

.input:focus::placeholder {
  color: #fff;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px) rotate(-5deg);
  }
  50% {
    transform: translateX(5px) rotate(5deg);
  }
  75% {
    transform: translateX(-5px) rotate(-5deg);
  }
  100% {
    transform: translateX(0);
  }
}

.input:focus {
  animation: shake 0.5s ease-in-out;
}

@keyframes glitch {
  0% {
    transform: none;
    opacity: 1;
  }
  7% {
    transform: skew(-0.5deg, -0.9deg);
    opacity: 0.75;
  }
  10% {
    transform: none;
    opacity: 1;
  }
  27% {
    transform: none;
    opacity: 1;
  }
  30% {
    transform: skew(0.8deg, -0.1deg);
    opacity: 0.75;
  }
  35% {
    transform: none;
    opacity: 1;
  }
  52% {
    transform: none;
    opacity: 1;
  }
  55% {
    transform: skew(-1deg, 0.2deg);
    opacity: 0.75;
  }
  50% {
    transform: none;
    opacity: 1;
  }
  72% {
    transform: none;
    opacity: 1;
  }
  75% {
    transform: skew(0.4deg, 1deg);
    opacity: 0.75;
  }
  80% {
    transform: none;
    opacity: 1;
  }
  100% {
    transform: none;
    opacity: 1;
  }
}

.input:not(:placeholder-shown) {
  animation: glitch 1s linear infinite;
}

.input:focus + .input-container::after {
  color: #fff;
}

.input:not(:placeholder-shown) {
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 0px 0px 0 #000;
}

/* ###############按钮 */

.cta .second {
  transition: 0.5s;
  margin-right: 0px;
}

.cta:hover .second {
  transition: 0.5s;
  margin-right: 45px;
}

.span {
  transform: skewX(15deg);
}

.second {
  width: 30px;
  margin-left: 30px;
  position: relative;
  top: 12%;
}

.one {
  transition: 0.4s;
  transform: translateX(-60%);
}

.two {
  transition: 0.5s;
  transform: translateX(-30%);
}

.cta:hover .three {
  animation: color_anim 1s infinite 0.2s;
}

.cta:hover .one {
  transform: translateX(0%);
  animation: color_anim 1s infinite 0.6s;
}

.cta:hover .two {
  transform: translateX(0%);
  animation: color_anim 1s infinite 0.4s;
}

@keyframes color_anim {
  0% {
    fill: white;
  }

  50% {
    fill: #fbc638;
  }

  100% {
    fill: white;
  }
}
</style>