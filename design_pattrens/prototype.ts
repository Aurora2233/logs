(() => {
  /**
   * 原型模式
   */
  class Prototype {
    public primitive: any;
    public component!: Object;
    public circularReference!: ComponentWithBackReference;

    public clone(): this {
      const clone = Object.create(this);
      clone.component = Object.create(this.component);

      clone.circularReference = {
        ...this.circularReference,
        prototype: {
          ...this,
        },
      };
      return clone;
    }
  }

  class ComponentWithBackReference {
    public prototype: unknown;

    constructor(prototype: unknown) {
      this.prototype = prototype;
    }
  }

  function clientCode() {
    const client = new Prototype();

    client.primitive = "AuroraClient";
    client.component = new Date();
    client.circularReference = new ComponentWithBackReference(client);

    const cloneClient = client.clone();

    if (client.primitive === cloneClient.primitive) {
      console.log("原始值已经转移到克隆对象中");
    } else {
      console.log("未克隆原始值");
    }
    if (client.component === cloneClient.component) {
      console.log("组件未克隆");
    } else {
      console.log("组件已克隆");
    }

    if (client.circularReference === cloneClient.circularReference) {
      console.log("循环引用未克隆");
    } else {
      console.log("循环引用已克隆");
    }

    if (
      client.circularReference.prototype ===
      cloneClient.circularReference.prototype
    ) {
      console.log("引用组件链接到原始对象");
    } else {
      console.log("引用组件链接到克隆");
    }
  }

  clientCode();
})();
