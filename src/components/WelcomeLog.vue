<template>
    <!-- 这是欢迎icon -->
    <div class="center-body">
      <div class="loader-shape-3"></div>
    </div>
  </template>
      <script setup>
  </script>
      <style  scoped>
  .center-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  
  .loader-shape-3 {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 50px;
  }
  .loader-shape-3:after {
    width: 30px;
    height: 20px;
    border-radius: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 15px;
  }
  .loader-shape-3:before {
    width: 20px;
    height: 20px;
    border-radius: 100% 100% 100% 0;
    box-shadow: 0px 0px 0px 2px rgb(57, 221, 243);
    animation: anm-SL-3-move 1s linear infinite;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-46deg);
    margin-top: 20px;
  }
  .loader-shape-3:before,
  .loader-shape-3:after {
    position: absolute;
    content: "";
  }
  @keyframes anm-SL-3-move {
    0% {
      top: 0;
    }
    50% {
      top: -5px;
    }
    100% {
      top: 0;
    }
  }
  </style>