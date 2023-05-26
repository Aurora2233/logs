(() => {
  /**
   * 享元模式
   */
  class Flyweight {
    private sharedState: any;
    constructor(sharedState: any) {
      this.sharedState = sharedState;
    }

    public operation(uniqueState: any) {
      const shared = JSON.stringify(this.sharedState);
      const unique = JSON.stringify(uniqueState);
      console.log(`共享状态:${shared}, 唯一状态: ${unique}`);
    }
  }

  class FlyweightFactory {
    private flyweight: { [key: string]: Flyweight } = {};

    constructor(initialFlyweight: string[][]) {
      for (const state of initialFlyweight) {
        this.flyweight[this.getKey(state)] = new Flyweight(state);
      }
    }

    private getKey(state: string[]): string {
      return state.join("_");
    }

    public getFlyweight(state: string[]): Flyweight {
      const key = this.getKey(state);

      if (!(key in this.flyweight)) {
        console.log("找到一个变量，创建新变量");
        this.flyweight[key] = new Flyweight(state);
      } else {
        console.log("出现重复的变量");
      }

      return this.flyweight[key];
    }

    public listFlyweights() {
      const count = Object.keys(this.flyweight).length;
      console.log(`总数${count}`);

      for (const key in this.flyweight) {
        console.log(key);
      }
    }
  }

  const factory = new FlyweightFactory([
    ["Chevrolet", "Camaro2018", "pink"],
    ["Mercedes Benz", "C300", "black"],
    ["Mercedes Benz", "C500", "red"],
    ["BMW", "M5", "red"],
    ["BMW", "X6", "white"],
    // ...
  ]);
  factory.listFlyweights();

  // ...

  function addCarToPoliceDatabase(
    ff: FlyweightFactory,
    plates: string,
    owner: string,
    brand: string,
    model: string,
    color: string
  ) {
    console.log("\nClient: Adding a car to database.");
    const flyweight = ff.getFlyweight([brand, model, color]);

    // The client code either stores or calculates extrinsic state and passes it
    // to the flyweight's methods.
    flyweight.operation([plates, owner]);
  }

  addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "M5", "red");

  addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "X1", "red");

  factory.listFlyweights();
})();
