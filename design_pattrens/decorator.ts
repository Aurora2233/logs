(() => {
  /**
   * 装饰器模式
   */

  interface Component {
    operation(): string;
  }

  class ConcreteComponent implements Component {
    operation(): string {
      return "原始对象";
    }
  }

  class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
      this.component = component;
    }

    operation(): string {
      return this.component.operation();
    }
  }

  class ConcreteDecoratorA extends Decorator {
    public operation(): string {
      return `装饰器A(${super.operation()})`;
    }
  }

  class ConcreteDecoratorB extends Decorator {
    public operation(): string {
      return `装饰器B(${super.operation()})`;
    }
  }

  function clientCode(component: Component) {
    console.log(`结果: ${component.operation()}`);
  }

  // 原始对象
  const simple = new ConcreteComponent();
  clientCode(simple);

  /**使用装饰器之后的对象 */
  const decorator1 = new ConcreteDecoratorA(simple);
  const decorator2 = new ConcreteDecoratorB(decorator1);
  clientCode(decorator2);
})();
