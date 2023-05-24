(() => {
  interface Animal {
    call: () => void;
  }

  class Cat implements Animal {
    call() {
      console.log("喵喵喵");
    }
  }

  class Dog implements Animal {
    call() {
      console.log("汪汪汪");
    }
  }

  class Bird implements Animal {
    call() {
      console.log("喳喳喳");
    }
  }

  class AnimalFactory {
    getAnimal(animal: string) {
      switch (animal) {
        case "Dog":
          return new Dog();
        case "Cat":
          return new Cat();
        case "Bird":
          return new Bird();
        default:
          return null;
      }
    }
  }

  /**
   * 测试
   */

  const animal = new AnimalFactory();

  const dog = animal.getAnimal("Dog");

  dog?.call();

  const cat = animal.getAnimal("Cat");

  cat?.call();

  const bird = animal.getAnimal("Bird");

  bird?.call();
})();
