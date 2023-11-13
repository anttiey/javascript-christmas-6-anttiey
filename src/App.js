import { Console } from '@woowacourse/mission-utils';
import Discount from './Discount.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Validation from './utils/Validation.js';
import Menu from './constants/Menu.js';
import Date from './constants/Date.js';

class App {
  #discount;

  constructor() {
    this.#discount = new Discount();
  }

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
      this.#discount.setFree(1 * 25000);
    }

    this.#discount.setFree(0);
  }

  applyChristmasDiscount(date) {
    const discount = 1000 + (date - 1) * 100;
    this.#discount.setChristmas(discount);
  }

  applyWeekdayDiscount(orders) {
    const discount =
      orders
        .filter(([menu]) => Menu.DESSERT.some((dessert) => menu === dessert.name))
        .reduce((acc, [, count]) => acc + count, 0) * 2023;

    this.#discount.setWeekday(discount);
  }

  applyHolidayDiscount(orders) {
    const discount =
      orders
        .filter(([menu]) => Menu.MAIN.some((main) => menu === main.name))
        .reduce((acc, [, count]) => acc + count, 0) * 2023;

    this.#discount.setHoliday(discount);
  }

  applySpecialDiscount() {
    return this.#discount.setSpecial(1000);
  }

  applyEventBadge() {
    const totalDiscount = this.#discount.calculateDiscountTotal();

    switch (true) {
      case totalDiscount >= 20000:
        return '산타';
      case totalDiscount >= 10000:
        return '트리';
      case totalDiscount >= 5000:
        return '별';
      default:
        return '없음';
    }
  }

  calculateFinalOrderTotal(total) {
    return total - this.#discount.calculateRealDiscountTotal();
  }

  async run() {
    const date = await this.getDate();
    const orders = await this.getOrder();

    OutputView.printMenu(orders);

    const total = this.calculateOrderTotal(orders);
    OutputView.printOrderTotal(total);

    if (total >= 10000) {
      this.#discount.setFree = this.applyFreeMenu(total);

      if (date >= 1 && date <= 25) {
        this.applyChristmasDiscount(date);
      }

      if (Date.HOLIDAY.includes(date)) {
        this.applyHolidayDiscount(orders);
      } else {
        this.applyWeekdayDiscount(orders);
      }

      if (Date.SPECIAL.includes(date)) {
        this.applySpecialDiscount();
      }
    }

    const result = this.#discount.getResult();

    OutputView.printFreeMenu(result);
    OutputView.printAllDiscountDetails(result);

    OutputView.printDiscountTotal(this.#discount.calculateDiscountTotal());

    const totalOrder = this.calculateFinalOrderTotal(total);
    OutputView.printFinalOrderTotal(totalOrder);

    const badge = this.applyEventBadge();
    OutputView.printEventBadge(badge);
  }
}

export default App;
