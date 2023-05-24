(() => {
  /**
   * 生成器模式
   * 示例
   */
  interface Builder {
    ProductPartA(): void;
    ProductPartB(): void;
    ProductPartC(): void;
  }

  class ConcreteProductPart1 implements Builder {
    private product!: ProductA;

    constructor() {
      this.reset();
    }
    public reset() {
      this.product = new ProductA();
    }
    public ProductPartA() {
      this.product.parts.push("ProductA");
    }
    public ProductPartB() {
      this.product.parts.push("ProductB");
    }
    public ProductPartC() {
      this.product.parts.push("ProductC");
    }

    public getProduct() {
      const results = this.product;
      this.reset();
      return results;
    }
  }

  class ProductA {
    public parts: string[] = [];
    public listParts() {
      return this.parts;
    }
  }

  class Director {
    private builder!: Builder;

    public setBuilder(builder: Builder) {
      this.builder = builder;
    }

    public buildMinimalViableProduct() {
      this.builder.ProductPartA();
    }

    public buildFullFeaturedProduct() {
      this.builder.ProductPartA();
      this.builder.ProductPartB();
      this.builder.ProductPartC();
    }
  }

  function clientCode(director: Director) {
    const builder = new ConcreteProductPart1();
    director.setBuilder(builder);

    console.log("获取普通套餐");
    director.buildMinimalViableProduct();
    const minimalCombo = builder.getProduct().listParts();
    console.log("普通套餐" + minimalCombo);

    console.log("获取完整套餐(豪华套餐)");
    director.buildFullFeaturedProduct();
    const fullCombo = builder.getProduct().listParts();
    console.log("完整套餐" + fullCombo);

    console.log("自定义套餐");
    builder.ProductPartB();
    builder.ProductPartC();
    const customCombo = builder.getProduct().listParts();
    console.log("自定义套餐" + customCombo);
  }

  const director = new Director();

  clientCode(director);
})();
