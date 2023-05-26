(() => {
  /**
   * 代理模式
   */
  interface Subject {
    request(): void;
  }

  class RealSubject implements Subject {
    public request() {
      console.log("无头请求");
    }
  }

  class Proxy implements Subject {
    private realSubject: Subject;

    constructor(realSubject: Subject) {
      this.realSubject = realSubject;
    }

    public request(): void {
      if (this.checkAccess()) {
        this.realSubject.request();
        this.logAccess();
      }
    }

    private checkAccess() {
      console.log("发送请求前检查访问状态");
      return true;
    }

    private logAccess() {
      console.log(`记录请求时间${new Date().toLocaleDateString()}`);
    }
  }

  function clientCode(subject: Subject) {
    // ...

    subject.request();

    // ...
  }

  console.log("无代理");
  const realSubject = new RealSubject();
  clientCode(realSubject);

  console.log("================================================");

  console.log("代理模式");
  const proxy = new Proxy(realSubject);
  clientCode(proxy);
})();
