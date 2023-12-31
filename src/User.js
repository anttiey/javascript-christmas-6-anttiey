import Validation from './utils/Validation.js';
import Order from './Order.js';
import Condition from './constants/Condition.js';

const { DELIMITERS } = Condition;

class User {
  #date;
  #orders;

  constructor() {
    this.#date = 0;
    this.#orders = [];
  }

  #validateDate(date) {
    Validation.validateDateNumber(date);
    Validation.validateDateRange(date);
  }

  #validateOrder(order) {
    Validation.validateOrderForm(order);
  }

  #validateMenus(menus) {
    Validation.validateMenuDuplicate(menus);
    Validation.validateOnlyDrink(menus);
  }

  #validateCounts(counts) {
    Validation.validateMenuCountTotal(counts);
  }

  #validateOrders(orders) {
    const menus = orders.map((order) => order.getMenu());
    const counts = orders.map((order) => order.getCount());

    this.#validateMenus(menus);
    this.#validateCounts(counts);
  }

  #parseOrder(order) {
    this.#validateOrder(order);
    const [menu, count] = order.split(DELIMITERS.menu_count);
    return new Order([menu, Number(count)]);
  }

  #parseOrders(orderStr) {
    return orderStr.split(DELIMITERS.order).map((order) => this.#parseOrder(order));
  }

  setDate(date) {
    this.#validateDate(date);
    this.#date = date;
  }

  setOrders(orderStr) {
    const orders = this.#parseOrders(orderStr);
    this.#validateOrders(orders);
    this.#orders = orders;
  }

  getDate() {
    return this.#date;
  }

  getOrders() {
    return this.#orders;
  }

  calculateTotalOrderPrice() {
    return this.#orders.reduce((total, order) => total + order.calculateOrderPrice(), 0);
  }
}

export default User;
