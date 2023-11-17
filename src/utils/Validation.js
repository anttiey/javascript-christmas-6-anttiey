import Menu from '../constants/Menu.js';
import Condition from '../constants/Condition.js';
import Messages from '../constants/Messages.js';

const { EVENT, ORDER } = Condition;
const { ALL_MENU, EXCEPT_DRINK_MENU } = Menu;
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
    if (input < EVENT.start || input > EVENT.end) {
      throw new Error(ERROR.date);
    }
  }

  static validateOrderForm(input) {
    if (!ORDER.regex.test(input)) {
      throw new Error(ERROR.order);
    }
  }

  static validateMenu(input) {
    if (!ALL_MENU.some((menu) => menu.name === input)) {
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
    if (!input.some((el) => EXCEPT_DRINK_MENU.some((menu) => menu.name === el))) {
      throw new Error(ERROR.only_drink);
    }
  }

  static validateMenuCountTotal(input) {
    if (input.reduce((total, amount) => total + amount) > ORDER.max) {
      throw new Error(ERROR.menu_count);
    }
  }
}

export default Validation;
