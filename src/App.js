import { Console } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Validation from './utils/Validation.js';
import Menu from './constants/Menu.js';

class App {
  async getDate() {
    while (true) {
      try {
        const date = await InputView.readDate();

        Validation.validateDateNumber(Number(date));
        Validation.validateDateRange(Number(date));

        return date;
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

  async run() {
    const date = await this.getDate();
    const orders = await this.getOrder();

    OutputView.printMenu(orders);

    const total = this.calculateOrderTotal(orders);
    OutputView.printOrderTotal(total);
  }
}

export default App;
