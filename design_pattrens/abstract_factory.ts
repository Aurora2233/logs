/**
 * 抽象工厂模式：通过工厂去创建其他工厂
 */
(() => {
  interface Combo {
    createProductA(): ProductA;
    createProductB(): ProductB;
  }

  class ComboProduct implements Combo {
    createProductA(): ProductA {
      return new Hamburger();
    }
    createProductB(): ProductB {
      return new Cola();
    }
  }

  interface ProductA {
    handleEventA: () => void;
  }

  interface ProductB {
    handleEventB: () => void;
  }

  class Hamburger implements ProductA {
    handleEventA() {
      console.log("吃汉堡");
    }
  }

  class Cola implements ProductB {
    handleEventB() {
      console.log("喝可乐");
    }
  }

  /**
   * 测试
   */

  const combo = new ComboProduct();
  const productA = combo.createProductA();
  const productB = combo.createProductB();

  productA.handleEventA();
  productB.handleEventB();
})();
