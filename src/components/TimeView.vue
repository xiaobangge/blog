<template>
    <div class="w-full rounded-2xl bg-linear-to-rb from-[#7cafe3] to-[#046ac1] flex flex-col items-center justify-center px-[20px]">
      <div class="clockBox">
        <canvas ref="canvas" height="150" width="150"></canvas>
      </div>
      <div class="flex text-[20px] my-[10px]">{{ time.time }}:{{ time.second }}</div>
      <div class="flex flex-col justify-center items-center">
        <div class="week">{{ time.week }}</div>
        <div class="date">{{ time.date }}</div>
      </div>
    </div>
  </template>
   
  <script lang="ts" setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import moment from'moment';
    const timer: any = ref(null);
    const time: any = ref({});
    const getDate = () => {
      time.value = parseTime(new Date());
    };
    // 根据传入的时间，处理成需要的对象函数
    const parseTime = (time) => {
      draw(time);
      let resObj: any = {};
      let week = ['日', '一', '二', '三', '四', '五', '六'];
      resObj.date = moment(time).format('YYYY年MM月DD日');
      resObj.week = `星期${week[moment(time).day()]}`;
      resObj.time = moment(time).format('HH:mm');
      resObj.second = moment(time).format('ss');
      return resObj;
    };
    const canvas = ref();
    //描绘时分秒小数和小数点
    // 绘制表盘
    const radius = 50;
    const cWidth = 150;
    const drawBackground = () => {
      ctx.value.save();
      const width = cWidth;
      const height = cWidth;
      const R = width / 2; //圆半径
      const r = (R / 3) * 2;
      //设置坐标轴原点
      ctx.value.translate(width / 2, height / 2);
      // 圆心
      ctx.value.beginPath();
      // ctx.value.arc(0, 0, 10, 0, 2 * Math.PI, true);
      ctx.value.fill();
      ctx.value.closePath();
      // 表盘刻度（大格）
      ctx.value.beginPath();
      ctx.value.lineWidth = 2;
      for (var i = 0; i < 12; i++) {
        ctx.value.beginPath();
        ctx.value.strokeStyle = 'rgba(255,255,255,1)';
        ctx.value.rotate(Math.PI / 6);
        ctx.value.moveTo(R, 0);
        ctx.value.lineTo(r, 0);
        ctx.value.stroke();
      }
      ctx.value.closePath();
      // 表盘刻度（小格）
      ctx.value.beginPath();
      ctx.value.lineWidth = 1;
      for (var i = 0; i < 60; i++) {
        ctx.value.beginPath();
        ctx.value.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.value.rotate(Math.PI / 30);
        ctx.value.moveTo(R, 0);
        ctx.value.lineTo(R - 10, 0);
        ctx.value.stroke();
      }
      ctx.value.closePath();
    };
   
    //描绘时针
    const drawHour = (hour, minute) => {
      ctx.value.save();
      ctx.value.beginPath();
      ctx.value.strokeStyle = '#FFFFFF';
      let rad = ((2 * Math.PI) / 12) * hour;
      let mrad = ((2 * Math.PI) / 12 / 60) * minute;
      ctx.value.rotate(rad + mrad);
      ctx.value.lineWidth = 4;
      ctx.value.lineCap = 'round';
      ctx.value.moveTo(0, 10);
      ctx.value.lineTo(0, -radius + 30);
      ctx.value.stroke();
      ctx.value.restore();
    };
    //描绘分针
    const drawMinute = (minute) => {
      ctx.value.save();
      ctx.value.beginPath();
      let rad = ((2 * Math.PI) / 60) * minute;
      ctx.value.rotate(rad);
      ctx.value.strokeStyle = '#FFFFFF';
      ctx.value.lineWidth = 3;
      ctx.value.lineCap = 'round';
      ctx.value.moveTo(0, 10);
      ctx.value.lineTo(0, -radius + 20);
      ctx.value.stroke();
      ctx.value.restore();
    };
    //描绘秒针
    const drawSecond = (second) => {
      ctx.value.save();
      ctx.value.beginPath();
      ctx.value.fillStyle = '#C14543';
      ctx.value.lineWidth = 2;
      ctx.value.lineCap = 'round';
      let rad = ((2 * Math.PI) / 60) * second;
      ctx.value.rotate(rad);
      ctx.value.moveTo(-2, 20);
      ctx.value.lineTo(2, 20);
      ctx.value.lineTo(1, -radius + 10);
      ctx.value.lineTo(-1, -radius + 10);
      ctx.value.fill();
      ctx.value.restore();
    };
    //中间固定园点
    const drawDot = () => {
      ctx.value.beginPath();
      ctx.value.fillStyle = '#C14543';
      ctx.value.arc(0, 0, 4, 0, 2 * Math.PI, false);
      ctx.value.fill();
    };
    const draw = (now) => {
      ctx.value.clearRect(0, 0, cWidth, cWidth);
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      drawBackground();
      drawHour(hour, minute);
      drawMinute(minute);
      drawSecond(second);
      drawDot();
      ctx.value.restore();
    };
   
    const ctx = ref();
    onMounted(() => {
      ctx.value = canvas.value.getContext('2d');
      timer.value = setInterval(() => {
        getDate();
      }, 1000);
    });
    onBeforeUnmount(() => {
      clearInterval(timer.value);
      timer.value = null;
    });
  </script>
  <style lang="scss" scoped>
  </style>