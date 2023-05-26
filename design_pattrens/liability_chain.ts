(() => {
  /**
   * 责任链模式
   */

  interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): string | null;
  }

  abstract class AbstractHandler implements Handler {
    private nextHandler!: Handler;
    public setNext(handler: Handler): Handler {
      this.nextHandler = handler;
      return handler;
    }
    handle(request: string): string | null {
      if (this.nextHandler) {
        return this.nextHandler.handle(request);
      }
      return null;
    }
  }

  class MonkeyHandler extends AbstractHandler {
    public handle(request: string) {
      if (request === "Banana") {
        return `猴子: 我要吃${request}`;
      }
      return super.handle(request);
    }
  }

  class SquirrelHandler extends AbstractHandler {
    public handle(request: string) {
      if (request === "Nut") {
        return `松鼠: 我要吃${request}`;
      }
      return super.handle(request);
    }
  }

  class DogHandler extends AbstractHandler {
    public handle(request: string) {
      if (request === "MeatBall") {
        return `狗子: 我要吃${request}`;
      }
      return super.handle(request);
    }
  }

  function clientCode(handler: Handler) {
    const foods = ["Nut", "Banana", "Cup of coffee"];

    for (const food of foods) {
      console.log(`客户: 谁需要一个 ${food}?`);

      const result = handler.handle(food);
      if (result) {
        console.log(`  ${result}`);
      } else {
        console.log(`  ${food} 被遗忘了`);
      }
    }
  }

  const monkey = new MonkeyHandler();
  const squirrel = new SquirrelHandler();
  const dog = new DogHandler();

  monkey.setNext(squirrel).setNext(dog);

  console.log("链子: Monkey > Squirrel > Dog\n");
  clientCode(monkey);
  console.log(
    "================================================================"
  );

  console.log("子链: Squirrel > Dog\n");
  clientCode(squirrel);
})();
