(() => {
  class SubsystemA {
    operation() {
      return "子系统A:准备就绪\n";
    }
    operationX() {
      return "子系统A:出发\n";
    }
  }

  class SubsystemB {
    operation() {
      return "子系统B:准备就绪\n";
    }
    operationY() {
      return "子系统B:开火\n";
    }
  }

  class Facade {
    protected subsystemA: SubsystemA;
    protected subsystemB: SubsystemB;

    constructor(subsystemA?: SubsystemA, subsystemB?: SubsystemB) {
      this.subsystemA = subsystemA ?? new SubsystemA();
      this.subsystemB = subsystemB ?? new SubsystemB();
    }

    public operation() {
      let result = "外观模式：初始化子系统\n";
      result += this.subsystemA.operation();
      result += this.subsystemB.operation();
      result += "外观模式: 订单子系统执行操作\n";
      result += this.subsystemA.operationX();
      result += this.subsystemB.operationY();

      return result;
    }
  }

  function clientCode(facade: Facade) {
    console.log(facade.operation());
  }

  const subsystem1 = new SubsystemA();
  const subsystem2 = new SubsystemB();
  const facade = new Facade(subsystem1, subsystem2);
  clientCode(facade);
})();
