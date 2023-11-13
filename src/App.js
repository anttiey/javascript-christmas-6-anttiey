import { Console } from '@woowacourse/mission-utils';
import User from './User.js';
import Discount from './Discount.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Validation from './utils/Validation.js';
import Menu from './constants/Menu.js';
import Date from './constants/Date.js';

class App {
  #user;
  #discount;

  constructor() {
    this.#user = new User();
    this.#discount = new Discount();
  }

  async getDate() {
    while (true) {
      try {
        const date = await InputView.readDate();
        this.#user.setDate(Number(date));
        break;
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

        this.#user.setOrders(orders);
        break;
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
    await this.getDate();
    await this.getOrder();

    OutputView.printMenu(this.#user.getOrders());

    const total = this.calculateOrderTotal(this.#user.getOrders());
    OutputView.printOrderTotal(total);

    if (total >= 10000) {
      this.applyFreeMenu(total);

      if (this.#user.getDate() >= 1 && this.#user.getDate() <= 25) {
        this.applyChristmasDiscount(this.#user.getDate());
      }

      if (Date.HOLIDAY.includes(this.#user.getDate())) {
        this.applyHolidayDiscount(this.#user.getOrders());
      } else {
        this.applyWeekdayDiscount(this.#user.getOrders());
      }

      if (Date.SPECIAL.includes(this.#user.getDate())) {
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
