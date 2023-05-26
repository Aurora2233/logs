(() => {
  /**
   * 迭代器模式
   */
  interface Iterator<T> {
    current(): T;

    next(): T;

    key(): number;

    valid(): boolean;

    rewind(): void;
  }

  interface Aggregate {
    getIterator(): Iterator<string>;
  }

  class AlphabeticalOrderIterator implements Iterator<string> {
    private collection: WordsCollection;

    private position: number = 0;

    private reverse: boolean = false;

    constructor(collection: WordsCollection, reverse: boolean = false) {
      this.collection = collection;
      this.reverse = reverse;

      if (reverse) {
        this.position = collection.getCount() - 1;
      }
    }

    current(): string {
      return this.collection.getItems()[this.position];
    }
    next(): string {
      const item = this.collection.getItems()[this.position];
      this.position += this.reverse ? -1 : 1;
      return item;
    }
    key(): number {
      return this.position;
    }
    valid(): boolean {
      if (this.reverse) {
        return this.position >= 0;
      }
      return this.position < this.collection.getCount();
    }
    rewind(): void {
      this.position = this.reverse ? this.collection.getCount() - 1 : 0;
    }
  }

  class WordsCollection implements Aggregate {
    private items: string[] = [];

    public getItems(): string[] {
      return this.items;
    }

    public getCount(): number {
      return this.items.length;
    }

    public addItem(item: string): void {
      this.items.push(item);
    }

    public getIterator(): Iterator<string> {
      return new AlphabeticalOrderIterator(this);
    }

    public getReverseIterator(): Iterator<string> {
      return new AlphabeticalOrderIterator(this, true);
    }
  }

  /**
   * 测试
   */
  const collection = new WordsCollection();
  collection.addItem("First");
  collection.addItem("Second");
  collection.addItem("Third");

  const iterator = collection.getIterator();

  console.log("直线遍历");
  while (iterator.valid()) {
    console.log(iterator.next());
  }

  console.log("=======================");
  console.log("反向遍历");
  const reverseIterator = collection.getReverseIterator();
  while (reverseIterator.valid()) {
    console.log(reverseIterator.next());
  }
})();
