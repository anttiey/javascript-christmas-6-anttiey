import Menu from './constants/Menu.js';
import Validation from './utils/Validation.js';

const { ALL_MENU } = Menu;

class Order {
  #menu;
  #count;

  constructor([menu, count]) {
    this.#validateMenu(menu);
    this.#validateCount(count);

    this.#menu = menu;
    this.#count = count;
  }

  #validateMenu(menu) {
    Validation.validateMenu(menu);
  }

  #validateCount(count) {
    Validation.validateMenuCountRange(count);
  }

  getMenu() {
    return this.#menu;
  }

  getCount() {
    return this.#count;
  }

  calculateOrderPrice() {
    const { price } = ALL_MENU.find((el) => el.name === this.#menu);
    return price * this.#count;
  }
}

export default Order;
