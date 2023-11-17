import Date from './constants/Date.js';
import Menu from './constants/Menu.js';
import Condition from './constants/Condition.js';

const { FREE_MENU, CHRISTMAS_EVENT, DISCOUNT_EVENT } = Condition;
const { DESSERT, MAIN } = Menu;

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

  applyFreeMenuDiscount(total) {
    if (total >= FREE_MENU.min) {
      this.#free = FREE_MENU.count * FREE_MENU.price;
    }
  }

  applyChristmasDiscount(date) {
    if (date >= CHRISTMAS_EVENT.start && date <= CHRISTMAS_EVENT.end) {
      this.#christmas = CHRISTMAS_EVENT.default + (date - 1) * CHRISTMAS_EVENT.increase;
    }
  }

  applyWeekdayDiscount(date, orders) {
    if (!Date.HOLIDAY.includes(date)) {
      this.#weekday =
        orders
          .filter((order) => DESSERT.some((dessert) => order.getMenu() === dessert.name))
          .reduce((acc, order) => acc + order.getCount(), 0) * DISCOUNT_EVENT.weekday;
    }
  }

  applyHolidayDiscount(date, orders) {
    if (Date.HOLIDAY.includes(date)) {
      this.#holiday =
        orders
          .filter((order) => MAIN.some((main) => order.getMenu() === main.name))
          .reduce((acc, order) => acc + order.getCount(), 0) * DISCOUNT_EVENT.holiday;
    }
  }

  applySpecialDiscount(date) {
    if (Date.SPECIAL.includes(date)) {
      this.#special = DISCOUNT_EVENT.special;
    }
  }

  getDiscountResult() {
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

  calculateDiscountTotalExceptFree() {
    return this.#christmas + this.#weekday + this.#holiday + this.#special;
  }
}

export default Discount;
