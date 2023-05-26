(() => {
  /**
   * 命令模式
   */

  interface Command {
    execute(): void;
  }

  class SimpleCommand implements Command {
    private payload: string;

    constructor(payload: string) {
      this.payload = payload;
    }

    execute(): void {
      console.log(`简单命令：可以做一些简单的事情,比如打印、${this.payload}`);
    }
  }

  class ComplexCommand implements Command {
    private receiver: Receiver;
    private a: string;
    private b: string;

    constructor(receiver: Receiver, a: string, b: string) {
      this.receiver = receiver;
      this.a = a;
      this.b = b;
    }
    execute(): void {
      console.log("复杂的东西应该由一个接收对象来完成。");
      this.receiver.doSomething(this.a);
      this.receiver.doSomethingElse(this.b);
    }
  }

  class Receiver {
    public doSomething(a: string) {
      console.log(`正在执行${a}`);
    }
    public doSomethingElse(b: string) {
      console.log(`也在执行${b}`);
    }
  }

  class Invoker {
    private onStart!: Command;
    private onFinish!: Command;

    public setOnStart(onStart: Command) {
      this.onStart = onStart;
    }

    public setOnFinish(onFinish: Command) {
      this.onFinish = onFinish;
    }

    public doSomethingImportant() {
      console.log("调用: 是否要在我之前执行一些事件");
      if (this.isCommand(this.onStart)) {
        this.onStart.execute();
      }

      console.log("做一些重要的事");

      console.log("结束后做一些处理");
      if (this.isCommand(this.onFinish)) {
        this.onFinish.execute();
      }
    }
    private isCommand(object: Command): object is Command {
      return object.execute !== undefined;
    }
  }

  const invoker = new Invoker();
  invoker.setOnStart(new SimpleCommand("打招呼"));
  const receiver = new Receiver();
  invoker.setOnFinish(
    new ComplexCommand(receiver, "发送邮件", "保存报告")
  );

  invoker.doSomethingImportant();
})();
