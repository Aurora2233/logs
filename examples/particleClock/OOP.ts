(() => {
  const canvas = document.querySelector("canvas");

  if (canvas) {
    (() => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
    })();

    class Particle {
      el: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      x: number;
      y: number;
      size: number;
      constructor(canvas: HTMLCanvasElement) {
        this.el = canvas;
        this.ctx = canvas.getContext("2d", { willReadFrequently: true })!;
        const r = Math.min(canvas.width, canvas.height) / 2;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const red = this.getRandom(0, 360) + Math.PI / 100;
        this.x = cx + r * Math.cos(red);
        this.y = cy + r * Math.sin(red);
        this.size = this.getRandom(2 * devicePixelRatio, 5 * devicePixelRatio);
      }

      draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#f6bec8";
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        this.ctx.fill();
      }

      moveTo(tx: number, ty: number) {
        const duration = 500;
        const sx = this.x,
          sy = this.y;
        const xSpeed = (tx - sx) / duration;
        const ySpeed = (ty - sy) / duration;
        const startTime = Date.now();

        const _moveTo = () => {
          const t = Date.now() - startTime;

          if (t >= duration) {
            this.x = tx;
            this.y = ty;
            return;
          }

          const x = sx + xSpeed * t;
          const y = sy + ySpeed * t;
          this.x = x;
          this.y = y;
          requestAnimationFrame(_moveTo);
        };
        _moveTo();
      }

      getRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
      }
    }

    class Clock {
      public gap: number;
      private el: HTMLCanvasElement;
      private ctx: CanvasRenderingContext2D;
      private text: string = "";
      private particles: Particle[] = [];

      constructor(canvas: HTMLCanvasElement) {
        this.el = canvas;
        const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
        this.ctx = ctx;
        this.gap = 4;
        const draw = () => {
          this.clear();
          this.update();
          this.particles.forEach((p) => p.draw());
          requestAnimationFrame(draw);
        };
        draw();
      }

      clear() {
        this.ctx.clearRect(0, 0, this.el.width, this.el.height);
      }

      getText() {
        return new Date().toTimeString().substring(0, 8);
      }

      update() {
        const newText = this.getText();
        if (newText === this.text) return;
        this.text = newText;

        const { width, height } = this.el;

        this.ctx.fillStyle = "#000";
        this.ctx.textBaseline = "middle";
        this.ctx.font = `${240 * devicePixelRatio}px DS-Digital, sans-serif`;
        this.ctx.fillText(
          this.text,
          (width - this.ctx.measureText(this.text).width) / 2,
          height / 2
        );

        const points = this.getPoints();

        this.clear();

        for (let i = 0; i < points.length; i++) {
          let p = this.particles[i];
          if (!p) {
            p = new Particle(this.el);
            this.particles.push(p);
          }

          const [x, y] = points[i];
          p.moveTo(x, y);
        }

        if (points.length < this.particles.length) {
          this.particles.splice(points.length);
        }
      }

      getPoints() {
        const { width, height, data } = this.ctx.getImageData(
          0,
          0,
          this.el.width,
          this.el.height
        );

        const points: number[][] = [];
        for (let i = 0; i < width; i += this.gap) {
          for (let j = 0; j < height; j += this.gap) {
            const index = (i + j * width) * 4;

            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const a = data[index + 3];
            if (r === 0 && g === 0 && b == 0 && a === 255) {
              points.push([i, j]);
            }
          }
        }
        return points;
      }
    }

    const clock = new Clock(canvas);
    (window as any).clock = clock;
  }
})();
