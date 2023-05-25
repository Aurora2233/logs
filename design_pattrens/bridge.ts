(() => {
  /**
   * 桥接模式
   */
  interface Implementation {
    operationImplementation(): string;
  }

  class Abstraction {
    protected implementation: Implementation;
    constructor(implementation: Implementation) {
      this.implementation = implementation;
    }

    public operation(): string {
      const result = this.implementation.operationImplementation();
      return `抽象：基本操作与${result}`;
    }
  }

  class ExtendedAbstraction extends Abstraction {
    public operation(): string {
      const result = this.implementation.operationImplementation();
      return "扩展抽象: 扩展operation方法和" + result;
    }
  }

  class ConcreteImplementationA implements Implementation {
    public operationImplementation(): string {
      return "这是A平台上的结果";
    }
  }

  class ConcreteImplementationB implements Implementation {
    public operationImplementation(): string {
      return "这是B平台上的结果";
    }
  }

  function clientCode(abstraction: Abstraction) {
    console.log(abstraction.operation());
  }

  let implementation = new ConcreteImplementationA();
  let abstraction = new Abstraction(implementation);
  clientCode(abstraction);

  implementation = new ConcreteImplementationB();
  abstraction = new ExtendedAbstraction(implementation);
  clientCode(abstraction);
})();
