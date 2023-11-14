import Menu from '../constants/Menu.js';
import Messages from '../constants/Messages.js';

const { ERROR } = Messages;

class Validation {
  static validateInputEmpty(input) {
    if (input === '') {
      throw new Error(ERROR.null);
    }
  }

  static validateDateNumber(input) {
    if (Number.isNaN(input)) {
      throw new Error(ERROR.date);
    }
  }

  static validateDateRange(input) {
    if (input < 1 || input > 31) {
      throw new Error(ERROR.date);
    }
  }

  static validateOrderForm(input) {
    const orderRegex = /^[a-zA-Z가-힣]+-\d+$/;

    if (!orderRegex.test(input)) {
      throw new Error(ERROR.order);
    }
  }

  static validateMenu(input) {
    if (!Menu.ALL_MENU.some((menu) => menu.name === input)) {
      throw new Error(ERROR.order);
    }
  }

  static validateMenuDuplicate(input) {
    if (new Set(input).size !== input.length) {
      throw new Error(ERROR.order);
    }
  }

  static validateMenuCountRange(input) {
    if (input < 1) {
      throw new Error(ERROR.order);
    }
  }

  static validateOnlyDrink(input) {
    if (!input.some((el) => Menu.EXCEPT_DRINK_MENU.some((menu) => menu.name === el))) {
      throw new Error(ERROR.only_drink);
    }
  }

  static validateMenuCountTotal(input) {
    if (input.reduce((total, amount) => total + amount) > 20) {
      throw new Error(ERROR.menu_count);
    }
  }
}

export default Validation;
