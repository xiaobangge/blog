<!-- 星空背景 -->
<template>
  <div
    id="bg"
    class="fixed top-0 left-0 w-[100vw] h-[100vh] overflow-hidden cursor-none bg-linear-to-b form-[#000] to-[#5788fe]"
  >
    <div
      class="absolute top-0 left-0 w-[100%] h-[100%] bg-[url(@/assets/images/xkbg.png)] bg-size-[1000px_250px] bg-repeat-x bg-position-[center_bottom]"
    ></div>
    <div
      class="w-full h-full absolute top-0 left-0 bg-[#fe5757] animate-[colorChange_30s_ease-in-out_infinite_both] mix-blend-overlay"
    ></div>
    <canvas id="canvas" ref="canvasRef"></canvas>
  </div>
</template>
  <script lang="ts" setup>
  import {Star} from './config/Star'
  import {Dot} from './config/Dot'

const canvasRef = ref(null);
onMounted(() => {
  initDemo();
});
const initDemo = () => {
  const canvas: any = canvasRef.value;
  const ctx = canvas.getContext("2d");
  let stars: Star[] = [];
  let dots: Dot[] = [];
  let mouseMoving = false;
  let mouseMoveChecker: any;
  let mouseX: number;
  let mouseY: number;
  let dotsMinDist = 2;
  let maxDistFromCursor = 50;
  let initStarsPopulation = 120;
  let HEIGHT: number;
  let WIDTH: number;

  // 设置画布尺寸
  setCanvasSize();
  // 初始化星星和动画
  init();

  function setCanvasSize() {
    (WIDTH = document.documentElement.clientWidth),
      (HEIGHT = document.documentElement.clientHeight);

    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);
  }

  function init() {
    ctx.strokeStyle = "white";
    ctx.shadowColor = "white";
    for (let i = 0; i < initStarsPopulation; i++) {
      stars[i] = new Star(
        i,
        Math.floor(Math.random() * WIDTH),
        Math.floor(Math.random() * HEIGHT)
      );
    }
    ctx.shadowBlur = 0;
    // 开始动画循环
    animate();
  }

  function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let i in stars) {
      stars[i].move(HEIGHT, ctx);
    }
    for (let i in dots) {
      dots[i].move(ctx, getPreviousDot);
    }
    // 如果鼠标移动，绘制新的点
    drawIfMouseMoving();
    requestAnimationFrame(animate);
  }

  window.onmousemove = function (e) {
    mouseMoving = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    clearInterval(mouseMoveChecker);
    // 设置鼠标停止移动后的延迟
    mouseMoveChecker = setTimeout(function () {
      mouseMoving = false;
    }, 100);
  };

  function getPreviousDot(id: any, stepback: number) {
    if (id == 0 || id - stepback < 0) return false;
    if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
    else return false; 
  }

  function drawIfMouseMoving() {
    if (!mouseMoving) return;

    if (dots.length == 0) {
      dots[0] = new Dot(0, mouseX, mouseY);
      dots[0].draw(ctx);
      return;
    }

    let previousDot = getPreviousDot(dots.length, 1);
    let prevX = previousDot.x;
    let prevY = previousDot.y;

    let diffX = Math.abs(prevX - mouseX);
    let diffY = Math.abs(prevY - mouseY);

    if (diffX < dotsMinDist || diffY < dotsMinDist) return;

    let xVariation = Math.random() > 0.5 ? -1 : 1;
    xVariation = xVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
    let yVariation = Math.random() > 0.5 ? -1 : 1;
    yVariation = yVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
    dots[dots.length] = new Dot(
      dots.length,
      mouseX + xVariation,
      mouseY + yVariation
    );
    dots[dots.length - 1].draw(ctx);
    // 连接最新的点到前一个点
    dots[dots.length - 1].link(ctx, getPreviousDot);
  }
};
</script>