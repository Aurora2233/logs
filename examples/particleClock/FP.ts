(() => {
    /**
     * TODO: 没有想好怎么写，怎么运用函数式编程范式、柯里化、高级函数怎么写合适
     * @returns 
     */
  function getCanvas() {
    const dom = document.querySelector("canvas");
    if (dom) {
      return dom;
    } else {
      const canvas = document.createElement("canvas");
      document.body.appendChild(canvas);
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.background = "radial-gradient(#fff, #8c738c)";
      return canvas;
    }
  }

  function generateParticle() { 

  }

  const canvas = getCanvas();

  (() => {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
  })();
})();
