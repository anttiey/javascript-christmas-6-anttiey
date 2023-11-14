import Menu from './constants/Menu.js';

class Discount {
  #free;
  #christmas;
  #weekday;
  #holiday;
  #special;

  constructor() {
    this.#free = 0;
    this.#christmas = 0;
    this.#weekday = 0;
    this.#holiday = 0;
    this.#special = 0;
  }

  applyFreeMenu(total) {
    if (total >= 120000) {
      this.#free = 1 * 25000;
    }

    this.#free = 0;
  }

  applyChristmasDiscount(date) {
    this.#christmas = 1000 + (date - 1) * 100;
  }

  applyWeekdayDiscount(orders) {
    this.#weekday =
      orders
        .filter(([menu]) => Menu.DESSERT.some((dessert) => menu === dessert.name))
        .reduce((acc, [, count]) => acc + count, 0) * 2023;
  }

  applyHolidayDiscount(orders) {
    this.#holiday =
      orders
        .filter(([menu]) => Menu.MAIN.some((main) => menu === main.name))
        .reduce((acc, [, count]) => acc + count, 0) * 2023;
  }

  applySpecialDiscount() {
    this.#special = 1000;
  }

  getResult() {
    return {
      free: this.#free,
      christmas: this.#christmas,
      weekday: this.#weekday,
      holiday: this.#holiday,
      special: this.#special,
    };
  }

  calculateDiscountTotal() {
    return this.#free + this.#christmas + this.#weekday + this.#holiday + this.#special;
  }

  calculateRealDiscountTotal() {
    return this.#christmas + this.#weekday + this.#holiday + this.#special;
  }
}

export default Discount;
