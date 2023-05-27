(() => {
  /**
   * 观察者模式
   */

  interface Subject {
    attach(observer: Observer): void;

    detach(observer: Observer): void;

    notify(): void;
  }

  interface Observer {
    update(subject: Subject): void;
  }

  class ConcreteSubject implements Subject {
    public state!: number;

    private observers: Observer[] = [];

    public attach(observer: Observer): void {
      const isExist = this.observers.includes(observer);
      if (isExist) {
        console.log("已添加观察者");
        return;
      }
      console.log("添加观察者");
      this.observers.push(observer);
    }

    public detach(observer: Observer): void {
      const observerIndex = this.observers.indexOf(observer);
      if (observerIndex === -1) {
        console.log("该观察者不存在");

        return;
      }
      this.observers.splice(observerIndex, 1);
      console.log("观察者已被移出");
    }
    public notify(): void {
      console.log("通知观察者");
      for (const observer of this.observers) {
        observer.update(this);
      }
    }

    public someBusinessLogic(): void {
      this.state = Math.floor(Math.random() * 10 + 1);
      console.log("状态发生改变:" + this.state);
      this.notify();
    }
  }

  class ConcreteObserverA implements Observer {
    public update(subject: Subject): void {
      if (subject instanceof ConcreteSubject && subject.state < 3) {
        console.log("观察者A:更新");
      }
    }
  }

  class ConcreteObserverB implements Observer {
    public update(subject: Subject): void {
      if (
        subject instanceof ConcreteSubject &&
        (subject.state === 0 || subject.state >= 2)
      ) {
        console.log("观察者B:更新.");
      }
    }
  }

  const subject = new ConcreteSubject();

  const observer1 = new ConcreteObserverA();
  subject.attach(observer1);

  const observer2 = new ConcreteObserverB();
  subject.attach(observer2);

  subject.someBusinessLogic();
  subject.someBusinessLogic();

  subject.detach(observer2);

  subject.someBusinessLogic();
})();
