(() => {
  /**
   * 组合模式
   */
  abstract class Component {
    protected parent!: Component | null;

    public setParent(parent: Component | null) {
      this.parent = parent;
    }

    public getParent(): Component | null {
      return this.parent;
    }

    public add(component: Component) {}

    public remove(component: Component) {}

    public isComposite() {
      return false;
    }

    public abstract operation(): string;
  }

  class Leaf extends Component {
    public operation(): string {
      return "叶子";
    }
  }

  class Composite extends Component {
    protected children: Component[] = [];

    public add(component: Component): void {
      this.children.push(component);
      component.setParent(this);
    }

    public remove(component: Component): void {
      const componentIndex = this.children.indexOf(component);
      this.children.splice(componentIndex, 1);
      component.setParent(null);
    }

    public isComposite(): boolean {
      return true;
    }

    public operation(): string {
      const results = [];
      for (const child of this.children) {
        results.push(child.operation());
      }
      return `分支(${results.join("+")})`;
    }
  }

  function clientCode(component: Component) {
    console.log(`结果: ${component.operation()}`);
  }

  function clientCode2(component1: Component, component2: Component) {
    if (component1.isComposite()) {
      component1.add(component2);
    }
    console.log(`结果2: ${component1.operation()}`);
  }

  const simple = new Leaf();

  clientCode(simple);

  const tree = new Composite();

  const branch1 = new Composite();

  branch1.add(new Leaf());
  branch1.add(new Leaf());
  const branch2 = new Composite();
  branch2.add(new Leaf());
  tree.add(branch1);
  tree.add(branch2);
  clientCode(tree);

  clientCode2(tree, simple);
})();
