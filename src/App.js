import { Console } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Validation from './utils/Validation.js';
import Menu from './constants/Menu.js';
import Date from './constants/Date.js';

class App {
  async getDate() {
    while (true) {
      try {
        const date = await InputView.readDate();

        Validation.validateDateNumber(Number(date));
        Validation.validateDateRange(Number(date));

        return Number(date);
      } catch (err) {
        Console.print(err.message);
      }
    }
  }

  async getOrder() {
    while (true) {
      try {
        const orderStr = await InputView.readOrder();

        const orders = orderStr.split(',').map((order) => {
          Validation.validateOrderForm(order);
          const [menu, count] = order.split('-');
          return [menu, Number(count)];
        });

        orders.forEach(([menu, count]) => {
          Validation.validateMenu(menu);
          Validation.validateMenuCountRange(count);
        });

        const menus = orders.map(([menu]) => menu);
        Validation.validateMenuDuplicate(menus);
        Validation.validateOnlyDrink(menus);

        const counts = orders.map(([, count]) => count);
        Validation.validateMenuCountTotal(counts);

        return orders;
      } catch (err) {
        Console.print(err.message);
      }
    }
  }

  calculateOrderTotal(orders) {
    const menuList = [...Menu.APPETIZER, ...Menu.MAIN, ...Menu.DESSERT, ...Menu.DRINK];

    let total = 0;

    orders.forEach(([menu, count]) => {
      const { price } = menuList.find((el) => el.name === menu);
      total += count * price;
    });

    return total;
  }

  applyFreeMenu(total) {
    if (total >= 120000) {
      return 1 * 25000;
    }

    return 0;
  }

  applyChristmasDiscount(date) {
    return 1000 + (date - 1) * 100;
  }

  applyWeekdayDiscount(orders) {
    return (
      orders
        .filter(([menu]) => Menu.DESSERT.some((dessert) => menu === dessert.name))
        .reduce((acc, [, count]) => acc + count, 0) * 2023
    );
  }

  applyHolidayDiscount(orders) {
    return (
      orders
        .filter(([menu]) => Menu.MAIN.some((main) => menu === main.name))
        .reduce((acc, [, count]) => acc + count, 0) * 2023
    );
  }

  applySpecialDiscount() {
    return 1000;
  }

  calculateDiscountTotal(result) {
    return Object.values(result).reduce((acc, discount) => (acc += discount));
  }

  async run() {
    const date = await this.getDate();
    const orders = await this.getOrder();

    OutputView.printMenu(orders);

    const total = this.calculateOrderTotal(orders);
    OutputView.printOrderTotal(total);

    const result = { free: 0, christmas: 0, weekday: 0, holiday: 0, special: 0 };

    if (total >= 10000) {
      result.free = this.applyFreeMenu(total);

      if (date >= 1 && date <= 25) {
        result.christmas = this.applyChristmasDiscount(date);
      }

      if (Date.HOLIDAY.includes(date)) {
        result.holiday = this.applyHolidayDiscount(orders);
      } else {
        result.weekday = this.applyWeekdayDiscount(orders);
      }

      if (Date.SPECIAL.includes(date)) {
        result.special = this.applySpecialDiscount();
      }
    }

    OutputView.printFreeMenu(result);
    OutputView.printAllDiscountDetails(result);

    const totalDiscount = this.calculateDiscountTotal(result);
  }
}

export default App;
