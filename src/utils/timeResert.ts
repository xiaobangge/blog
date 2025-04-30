import moment from "moment";

const timeReset = (time: string) => {
  const now = moment();
  const resetTime = moment(time);
  //   分钟
  const minutes = now.diff(resetTime, "minutes");
  if (minutes < 60) return minutes + "分钟前";
  // 小时
  const hours = now.diff(resetTime, "hours");
  if (hours < 24) return hours + "小时前";
  //   天
  const days = now.diff(resetTime, "days");
  if (days < 30) return days + "天前";
  else return resetTime.format("MM-DD HH:mm");
};
export default timeReset;
