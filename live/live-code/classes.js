class BankAccount {
  #balance; // private
  constructor(owner, startingBalance = 0) {
    this.owner = owner; // public
    this.#balance = startingBalance;
  }
  deposit(amount) {
    this.#balance += amount;
  }
  withdraw(amount) {
    if (amount > this.#balance) throw new Error('Insufficient funds');
    this.#balance -= amount;
  }
  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount('Alice', 100);
acc.deposit(50);
console.log(acc.getBalance());

class Sensor {
  constructor(id) {
    this.id = id;
  }
  describe() {
    return `sensor ${this.id}`;
  }
}

class PressureSensor extends Sensor {
  constructor() {
    super(id); // ⭐ before any use of `this`
    this.unit = unit;
  }
  describe() {
    return `${super.describe()} in ${this.unit}`;
  }
}

console.log(new PressureSensor('PS-0310', 'bar').describe());
