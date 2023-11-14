import Menu from '../constants/Menu.js';

class Validation {
  static validateInputEmpty(input) {
    if (input === '') {
      throw new Error('[ERROR] 입력이 없습니다.');
    }
  }

  static validateDateNumber(input) {
    if (Number.isNaN(input)) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }

  static validateDateRange(input) {
    if (input < 1 || input > 31) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }

  static validateOrderForm(input) {
    const orderRegex = /^[a-zA-Z가-힣]+-\d+$/;

    if (!orderRegex.test(input)) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  static validateMenu(input) {
    if (!Menu.ALL_MENU.some((menu) => menu.name === input)) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  static validateMenuDuplicate(input) {
    if (new Set(input).size !== input.length) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  static validateMenuCountRange(input) {
    if (input < 1) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  static validateOnlyDrink(input) {
    if (!input.some((el) => Menu.EXCEPT_DRINK_MENU.some((menu) => menu.name === el))) {
      throw new Error('[ERROR] 음료만 주문 시, 주문할 수 없습니다. 다시 입력해 주세요.');
    }
  }

  static validateMenuCountTotal(input) {
    if (input.reduce((total, amount) => total + amount) > 20) {
      throw new Error(
        '[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다. 다시 입력해 주세요.'
      );
    }
  }
}

export default Validation;
