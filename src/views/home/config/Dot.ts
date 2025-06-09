export class Dot {
  // 圆点的x坐标
  x: number;
  // 圆点的y坐标
  y: number;
  // 圆点的半径
  r: number;
  // 圆点的最大连接数
  maxLinks: number;
  // 圆点的移动速度
  speed: number;
  // 圆点的移动方向角度
  dir: number;
  // 圆点的颜色透明度
  a: number;
  // 每次移动后颜色透明度的减少量
  aReduction: number;
  // 圆点的颜色
  color: string;
  // 连接线的颜色
  linkColor: string;
  // 圆点的唯一标识符
  id: number | null;

  // 构造函数，初始化圆点的位置和属性
  constructor(id: number | null, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * 5) + 1;
    this.maxLinks = 2;
    this.speed = 0.5;

    this.a = 0.5;
    this.aReduction = 0.005;
    this.color = "rgba(255,255,255," + this.a + ")";
    this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";

    this.dir = Math.floor(Math.random() * 140) + 200;
  }
  // 在画布上绘制圆点
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.r * 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }
  // 在画布上绘制连接线
  link(
    ctx: CanvasRenderingContext2D,
    getPreviousDot: (id: number | null, stepback: number) => Dot | false
  ) {
    if (this.id == 0) return;
    let previousDot1 = getPreviousDot(this.id, 1);
    let previousDot2 = getPreviousDot(this.id, 2);
    let previousDot3 = getPreviousDot(this.id, 3);
    if (!previousDot1) return;
    ctx.strokeStyle = this.linkColor;
    ctx.moveTo(previousDot1.x, previousDot1.y);
    ctx.beginPath();
    ctx.lineTo(this.x, this.y);
    if (previousDot2 !== false) ctx.lineTo(previousDot2.x, previousDot2.y);
    if (previousDot3 !== false) ctx.lineTo(previousDot3.x, previousDot3.y);
    ctx.stroke();
    ctx.closePath();
  }
  // 移动圆点并更新其属性
  move(ctx: CanvasRenderingContext2D, getPreviousDot: (id: number | null, stepback: number) => Dot | false) {
    this.a -= this.aReduction;
    if (this.a <= 0) {
      this.die();
      return;
    }
    this.color = "rgba(255,255,255," + this.a + ")";
    this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
    (this.x = this.x + Math.cos(this.degToRad(this.dir)) * this.speed),
      (this.y = this.y + Math.sin(this.degToRad(this.dir)) * this.speed);

    this.draw(ctx);
    this.link(ctx, getPreviousDot);
  }
  // 销毁圆点，将其id设为null
  die() {
    this.id = null;
  }
  // 将角度转换为弧度
  degToRad(deg: number) {
    return deg * (Math.PI / 180);
  }
}