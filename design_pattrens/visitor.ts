(() => {
  /**
   * 访问者模式
   */

  interface Component {
    accept(visitor: Visitor): void;
  }

  interface Visitor {
    visitConcreteComponentA(component: ConcreteComponentA): void;
    visitConcreteComponentB(component: ConcreteComponentB): void;
  }

  class ConcreteComponentA implements Component {
    accept(visitor: Visitor): void {
      visitor.visitConcreteComponentA(this);
    }
    public exclusiveMethodOfConcreteComponentA(): string {
      return "A";
    }
  }
  class ConcreteComponentB implements Component {
    accept(visitor: Visitor): void {
      visitor.visitConcreteComponentB(this);
    }
    public exclusiveMethodOfConcreteComponentB(): string {
      return "B";
    }
  }

  class ConcreteVisitor1 implements Visitor {
    visitConcreteComponentA(component: ConcreteComponentA): void {
      console.log(
        `${component.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`
      );
    }
    visitConcreteComponentB(component: ConcreteComponentB): void {
      console.log(
        `${component.exclusiveMethodOfConcreteComponentB()} + ConcreteVisitor1`
      );
    }
  }
  class ConcreteVisitor2 implements Visitor {
    visitConcreteComponentA(component: ConcreteComponentA): void {
      console.log(
        `${component.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`
      );
    }
    visitConcreteComponentB(component: ConcreteComponentB): void {
      console.log(
        `${component.exclusiveMethodOfConcreteComponentB()} + ConcreteVisitor2`
      );
    }
  }
  function clientCode(components: Component[], visitor: Visitor) {
    for (const component of components) {
      component.accept(visitor);
    }
  }

  const components = [
    new ConcreteComponentA(),
    new ConcreteComponentB(),
];

console.log('客户通过基本访问者界面与所有访问者一起使用:');
const visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);
console.log('');

console.log('它允许相同的客户端代码与不同类型的访问者一起工作:');
const visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);

})();
