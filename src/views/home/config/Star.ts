export class Star {
  id: number | null;
  x: number;
  y: number;
  r: number;
  color: string;

  // 构造函数，初始化星星的 id, x 和 y 坐标，并随机生成半径和颜色
  constructor(id: number | null, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * 2) + 1;
    const alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = `rgba(255,255,255,${alpha})`;
  }

  // 绘制星星到指定的 2D 上下文中
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.r * 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }

  // 移动星星并绘制到指定高度的 2D 上下文中
  move(height: number, cxt: CanvasRenderingContext2D) {
    this.y -= 0.15;
    if (this.y <= -10) this.y = height + 10;
    this.draw(cxt);
  }

  // 设置星星的 id 为 null，表示星星死亡
  die() {
    this.id = null;
  }
}