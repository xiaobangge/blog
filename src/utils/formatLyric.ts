/**
 * 将歌词字符串解析为歌词数组
 * @param {*} lyric 歌词字符串 如 ""
 * @returns array 如： [{ time: "31.52", words: "你是 遥遥的路" }]
 */
export const formatLyric = (lyric: any) => {
    const lyricList: any[] = [];
    // 定义一个暂存变量接收日期字符串
    let timeStr = "";
    // 把歌词数组用换行符\n分割成数组
    lyric.split("\n").forEach((item: string) => {
      // 去除最后一行分割的空字符串
      if (item === "") return;
      // item 如 "[00:31.52]你是 遥遥的路"
      // parts 如 ["[00:31.52","你是 遥遥的路"]
      const parts = item.split("]");
      // timeStr 如 00:31.52
      timeStr = parts[0].slice(1);
      // 空歌词不要
      if (parts[1] !== " " && parts[1] !== "") {
        lyricList.push({
          time: parseTime(timeStr),
          words: parts[1],
          // 人造id
          uid: Math.random().toString().slice(-6),
        });
      }
    });
    return lyricList;
  };
  /**
   * 将时间字符串解析为秒
   * @param {*} timeStr 时间字符串
   * @returns 秒
   */
  const parseTime = (timeStr: any) => {
    const parts = timeStr.split(":");
    return +parts[0] * 60 + +parts[1];
  };
  