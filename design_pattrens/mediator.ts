(() => {
  interface Mediator {
    notify(sender: object, event: string): void;
  }

  class ConcreteMediator implements Mediator {
    private component1: Component1;
    private component2: Component2;
    constructor(component1: Component1, component2: Component2) {
      this.component1 = component1;
      this.component1.setMediator(this);
      this.component2 = component2;
      this.component2.setMediator(this);
    }

    public notify(sender: object, event: string): void {
      if (event === "A") {
        this.component2.doC();
      }

      if (event === "D") {
        this.component1.doB();
        this.component2.doC();
      }
    }
  }

  class BaseComponent {
    protected mediator: Mediator;

    constructor(mediator?: Mediator) {
      this.mediator = mediator!;
    }

    public setMediator(mediator: Mediator) {
      this.mediator = mediator;
    }
  }

  class Component1 extends BaseComponent {
    public doA(): void {
      console.log("组件 1 文档 A.");
      this.mediator.notify(this, "A");
    }

    public doB(): void {
      console.log("组件 1 文档 B.");
      this.mediator.notify(this, "B");
    }
  }

  class Component2 extends BaseComponent {
    public doC(): void {
      console.log("组件 2 文档 C.");
      this.mediator.notify(this, "C");
    }

    public doD(): void {
      console.log("组件 2 文档 D.");
      this.mediator.notify(this, "D");
    }
  }

  const c1 = new Component1();
  const c2 = new Component2();
  const mediator = new ConcreteMediator(c1, c2);

  console.log("客户触发操作A。");
  c1.doA();

  console.log("");
  console.log("客户触发操作D。");
  c2.doD();
})();
