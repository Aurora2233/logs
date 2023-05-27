(() => {
  /**
   * 备忘录模式 (快照模式)
   */

  interface Memento {
    getState(): string;
    getName(): string;
    getDate(): string;
  }

  class Originator {
    private state: string;

    constructor(state: string) {
      this.state = state;
      console.log(`初始化状态为: ${state}`);
    }
    public doSomething(): void {
      this.state = this.generateRandomString(10);
    }

    private generateRandomString(length: number): string {
      const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return Array.apply(null, { ...new Array(), length })
        .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
        .join("");
    }

    public save() {
      return new ConcertoMemento(this.state);
    }

    public restore(memento: Memento) {
      this.state = memento.getState();
      console.log(`状态发生改变:${this.state}`);
    }
  }

  class ConcertoMemento implements Memento {
    private state: string;

    private date: string;

    constructor(state: string) {
      this.state = state;
      this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
    }

    getState(): string {
      return this.state;
    }
    getName(): string {
      return `${this.state} / (${this.state.substring(0, 9)}...)`;
    }
    getDate(): string {
      return this.date;
    }
  }

  class Caretaker {
    private mementos: Memento[] = [];

    private originator: Originator;

    constructor(originator: Originator) {
      this.originator = originator;
    }

    public backup(): void {
      this.mementos.push(this.originator.save());
    }

    public undo(): void {
      if (!this.mementos.length) {
        return;
      }

      const memento = this.mementos.pop();

      console.log(`恢复状态为${memento?.getName()}`);

      this.originator.restore(memento!);
    }

    public showHistory() {
      console.log("备忘录列表");
      for (const memento of this.mementos) {
        console.log(memento.getName());
      }
    }
  }

  const originator = new Originator("Super-duper-super-puper-super.");
  const caretaker = new Caretaker(originator);

  caretaker.backup();
  originator.doSomething();

  caretaker.backup();
  originator.doSomething();

  caretaker.backup();
  originator.doSomething();

  console.log("");
  caretaker.showHistory();

  console.log("\n现在回滚状态\n");
  caretaker.undo();

  console.log("\n再一次回滚\n");
  caretaker.undo();

  console.log("\n再一次回滚\n");
  caretaker.undo();
})();
