(() => {
  /**
   * 状态模式
   */

  class Context {
    private state!: State;

    constructor(state: State) {
      this.transitionTo(state);
    }

    public transitionTo(state: State) {
      console.log(`过渡至${(<any>state).constructor.name}`);

      this.state = state;
      this.state.setContext(this);
    }

    public request1() {
      this.state.handle1();
    }

    public request2() {
      this.state.handle2();
    }
  }

  abstract class State {
    protected context!: Context;

    public setContext(context: Context) {
      this.context = context;
    }

    public abstract handle1(): void;

    public abstract handle2(): void;
  }

  class ConcreteStateA extends State {
    public handle1(): void {
      console.log("ConcreteStateA 处理请求1");

      console.log("需要去改变这个状态的上下文");

      this.context.transitionTo(new ConcreteStateB());
    }

    public handle2(): void {
      console.log("ConcreteStateA 处理请求2");
    }
  }

  class ConcreteStateB extends State {
    public handle1(): void {
      console.log("ConcreteStateB 去处理请求1");
    }

    public handle2(): void {
      console.log("ConcreteStateB 处理请求2");
      console.log("需要去改变这个状态的上下文");
      this.context.transitionTo(new ConcreteStateA());
    }
  }

  const context = new Context(new ConcreteStateA());
  context.request1();
  console.log("================================================");

  context.request2();
})();
