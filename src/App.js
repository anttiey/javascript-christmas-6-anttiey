import { Console } from '@woowacourse/mission-utils';
import Host from './Host.js';
import User from './User.js';
import Discount from './Discount.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Validation from './utils/Validation.js';

class App {
  #host;
  #user;
  #discount;

  constructor() {
    this.#host = new Host();
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

  calculateFinalOrderTotal(total) {
    return total - this.#discount.calculateRealDiscountTotal();
  }

  async run() {
    await this.getDate();
    await this.getOrder();

    OutputView.printMenu(this.#user.getOrders());

    const total = this.#user.calculateOrderTotal();
    OutputView.printOrderTotal(total);

    this.#host.handleEventDiscount(
      this.#user.getDate(),
      this.#user.getOrders(),
      total,
      this.#discount
    );

    const result = this.#discount.getResult();

    OutputView.printFreeMenu(result);
    OutputView.printAllDiscountDetails(result);

    OutputView.printDiscountTotal(this.#discount.calculateDiscountTotal());

    const totalOrder = this.calculateFinalOrderTotal(total);
    OutputView.printFinalOrderTotal(totalOrder);

    const badge = this.#host.handleEventBadge(this.#discount.calculateDiscountTotal());
    OutputView.printEventBadge(badge);
  }
}

export default App;
