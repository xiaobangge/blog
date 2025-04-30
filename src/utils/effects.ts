import $ from "jquery";

export default function init() {
  // 设备检测
  // var md = new MobileDetect(window.navigator.userAgent);

  // PC生效，手机/平板不生效
  // md.mobile(); md.phone();
  // if (!md.phone()) {
  //   if (!md.tablet()) {
  // 雪花
  // $.getScript("https://cdn.jsdelivr.net/gh/huangwb8/bloghelper@latest/js/xiaxue.js");

  // 樱花
//   $.getScript("https://cdn.jsdelivr.net/gh/huangwb8/bloghelper@latest/js/yinghua.js");

  // 小烟花特效
  // $.getScript(
  //   "https://cdn.jsdelivr.net/gh/huangwb8/bloghelper@latest/js/mouse-click.js"
  // );

  // // 大烟花特效
//   $.getScript(
//     "https://cdn.jsdelivr.net/gh/huangwb8/bloghelper@latest/mouse/mouse-click-02/mouse-canvas.js"
//   );
//   document.write(
//     "<style>#mouse-canvas {z-index:217483647; pointer-events: none;  box-sizing: border-box !important; display: block !important; position: fixed !important; left: 0; right: 0; top: 0; bottom: 0; width: 100%; height: 100vh;}</style>"
//   );
  // 鼠标移动的仙女棒特效。
  $.getScript(
    "https://cdn.jsdelivr.net/gh/huangwb8/bloghelper@latest/mouse/halo-dream/fairyDustCursor.min.js"
  );

  // 鼠标移动的泡泡特效
  // $.getScript("@/assets/js/censor.js");
}
