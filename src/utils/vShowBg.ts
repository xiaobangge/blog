
// 自定义指令 v-show-bg
export const vShowBg = {
  mounted(el: any) {
    const enterEvent = () => {
        const div = document.createElement("div");
        div.classList.add(
            "w-[800px]", 
            "h-[10px]",
            "rotate-[-45deg]",
            "shadow-[0px_0_35px_60px_#fff]",
            "bg-white",
            "absolute",
            "top-[20%]",
            "left-[-12%]",  // 注意此处可能存在无效字符"]"
            "z-10",
            "animate-ltr"
          )
        el.appendChild(div);
    }
    const leaveEvent = () => {
        for (const element of el.children) {
            if (element.classList.contains("w-[800px]")) {
                element.classList.add("animate-rtl");
                setTimeout(() => el.removeChild(element), 500);
            }
        }
    }
    el.addEventListener("mouseenter", enterEvent);
    el.addEventListener("mouseleave", leaveEvent);

    // 清理函数
    el._cleanup = () => {
        el.removeEventListener('mouseenter', enterEvent)
        el.removeEventListener('mouseleave', leaveEvent)
        leaveEvent()
      }
  },
  unmounted(el: any) {
    el._cleanup()
  },
};
