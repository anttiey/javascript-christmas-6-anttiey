import Validation from './utils/Validation.js';
import Menu from './constants/Menu.js';
import Condition from './constants/Condition.js';

const { ORDER_DELIMITER, MENU_COUNT_DELIMITER } = Condition;

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

  setDate(date) {
    this.#validateDate(date);
    this.#date = date;
  }

  setOrders(orders) {
    this.#validateOrders(orders);
    this.#orders = orders;
  }

  getDate() {
    return this.#date;
  }

  getOrders() {
    return this.#orders;
  }

  calculateOrderTotal() {
    return this.#orders.reduce((total, order) => total + order.calculateOrderPrice(), 0);
  }
}

export default User;
