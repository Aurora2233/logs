(() => {
  /**
   * 适配器模式
   */
  class Target {
    public request() {
      return "请求";
    }
  }

  class Adapted {
    public specificRequest() {
      return "具体请求";
    }
  }

  class Adapter extends Target {
    private adapted: Adapted;

    constructor(adapted: Adapted) {
      super();
      this.adapted = adapted;
    }

    public request(): string {
      const result = this.adapted
        .specificRequest()
        .split("")
        .reverse()
        .join("");

      return `适配器: (反转) ${result}`;
    }
  }

  function clientCode(target: Target) {
    console.log(target.request());
  }
  const target = new Target();
  clientCode(target);
  const adapted = new Adapted();
  console.log(`具体请求: ${adapted.specificRequest()}`);
  const adapter = new Adapter(adapted);
  clientCode(adapter);
})();
