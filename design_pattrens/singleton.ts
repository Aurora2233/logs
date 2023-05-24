(() => {
  /**
   * 单例模式
   * 示例
   */
  class Singleton {
    private static instance: Singleton;
    public static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      }
      return Singleton.instance;
    }
  }

  /**
   * 测试
   */

  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();

  if (s1 === s2) {
    console.log("两个实例的变量相同");
  } else {
    console.log("单例模式失败，两个实例的变量不同");
  }
})();
