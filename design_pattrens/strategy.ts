(() => {
  /**
   * 策略模式
   */

  interface Strategy {
    doAlgorithm(data: string[]): string[];
  }
  class Context {
    private strategy: Strategy;

    constructor(strategy: Strategy) {
      this.strategy = strategy;
    }

    public setStrategy(strategy: Strategy) {
      this.strategy = strategy;
    }

    public doSomeBusinessLogic() {
      const result = this.strategy.doAlgorithm(["a", "b", "c", "d", "e"]);
      console.log("result:", result.join(","));
    }
  }

  class ConcreteStrategyA implements Strategy {
    doAlgorithm(data: string[]): string[] {
      return data.sort();
    }
  }

  class ConcreteStrategyB implements Strategy {
    public doAlgorithm(data: string[]): string[] {
      return data.reverse();
    }
  }

  const context = new Context(new ConcreteStrategyA());
  console.log("排序策略");
  context.doSomeBusinessLogic();

  console.log("");

  console.log("反转策略");
  context.setStrategy(new ConcreteStrategyB());
  context.doSomeBusinessLogic();
})();
