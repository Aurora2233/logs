(() => {
  /**
   * 模版方法模式
   */

  abstract class AbstractClass {
    public templateMethod() {
      this.baseOperation1();
      this.requiredOperations1();
      this.baseOperation2();
      this.hook1();
      this.requiredOperations2();
      this.baseOperation3();
      this.hook2();
    }

    protected baseOperation1() {
      console.log("我正在做大部分工作");
    }
    protected baseOperation2() {
      console.log("子类覆盖了一些工作");
    }
    protected baseOperation3() {
      console.log("无论如何我做了大部分工作");
    }

    protected abstract requiredOperations1(): void;
    protected abstract requiredOperations2(): void;

    protected hook1(): void {}

    protected hook2(): void {}
  }

  class ConcreteClass1 extends AbstractClass {
    protected requiredOperations1(): void {
      console.log("ConcreteClass1:实施操作1");
    }

    protected requiredOperations2(): void {
      console.log("ConcreteClass1:实施操作2");
    }
  }

  class ConcreteClass2 extends AbstractClass {
    protected requiredOperations1(): void {
      console.log("ConcreteClass2:实施操作1");
    }

    protected requiredOperations2(): void {
      console.log("ConcreteClass2:实施操作2");
    }
    protected hook1(): void {
      console.log("覆盖钩子1");
    }
  }

  function clientCode(abstractClass: AbstractClass) {
    abstractClass.templateMethod();
  }

  console.log("同样的客户代码可以在不同的子类中工作");
  clientCode(new ConcreteClass1());
  console.log("");

  console.log("同样的客户代码可以在不同的子类中工作:");
  clientCode(new ConcreteClass2());
})();
