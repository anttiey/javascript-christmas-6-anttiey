import Validation from './utils/Validation.js';
import Menu from './constants/Menu.js';

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

  #validateMenu(menu) {
    Validation.validateMenu(menu);
  }

  #validateCount(count) {
    Validation.validateMenuCountRange(count);
  }

  #validateMenus(menus) {
    Validation.validateMenuDuplicate(menus);
    Validation.validateOnlyDrink(menus);
  }

  #validateCounts(counts) {
    Validation.validateMenuCountTotal(counts);
  }

  #validateOrders(orders) {
    const menus = orders.map(([menu]) => {
      this.#validateMenu(menu);
      return menu;
    });

    const counts = orders.map(([count]) => {
      this.#validateCount;
      return count;
    });

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
    let total = 0;

    this.#orders.forEach(([menu, count]) => {
      const { price } = Menu.ALL_MENU.find((el) => el.name === menu);
      total += count * price;
    });

    return total;
  }
}

export default User;
