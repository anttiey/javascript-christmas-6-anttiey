import Menu from './constants/Menu.js';
import Condition from './constants/Condition.js';

const { FREE_MENU, CHRISTMAS_EVENT, DISCOUNT_EVENT } = Condition;

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
    if (total >= FREE_MENU.min) {
      this.#free = FREE_MENU.count * FREE_MENU.price;
    }

    this.#free = 0;
  }

  applyChristmasDiscount(date) {
    this.#christmas = CHRISTMAS_EVENT.default + (date - 1) * CHRISTMAS_EVENT.increase;
  }

  applyWeekdayDiscount(orders) {
    this.#weekday =
      orders
        .filter(([menu]) => Menu.DESSERT.some((dessert) => menu === dessert.name))
        .reduce((acc, [, count]) => acc + count, 0) * DISCOUNT_EVENT.weekday;
  }

  applyHolidayDiscount(orders) {
    this.#holiday =
      orders
        .filter(([menu]) => Menu.MAIN.some((main) => menu === main.name))
        .reduce((acc, [, count]) => acc + count, 0) * DISCOUNT_EVENT.holiday;
  }

  applySpecialDiscount() {
    this.#special = DISCOUNT_EVENT.special;
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
