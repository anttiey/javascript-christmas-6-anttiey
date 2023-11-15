import { Console } from '@woowacourse/mission-utils';
import Host from './Host.js';
import User from './User.js';
import Order from './Order.js';
import Discount from './Discount.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Validation from './utils/Validation.js';
import Condition from './constants/Condition.js';

const { ORDER_DELIMITER, MENU_COUNT_DELIMITER } = Condition;

class App {
  #user;
  #discount;
  #host;

  constructor() {
    this.#user = new User();
    this.#discount = new Discount();
    this.#host = new Host(this.#user, this.#discount);
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

        const orders = orderStr.split(ORDER_DELIMITER).map((order) => {
          Validation.validateOrderForm(order);
          const [menu, count] = order.split(MENU_COUNT_DELIMITER);
          return new Order([menu, Number(count)]);
        });

        this.#user.setOrders(orders);
        break;
      } catch (err) {
        Console.print(err.message);
      }
    }
  }

  async run() {
    OutputView.printStart();

    await this.getDate();
    await this.getOrder();

    OutputView.printNotice(this.#user.getDate());

    OutputView.printOrderResult(this.#user);
    this.#host.handleEventDiscount(this.#user, this.#discount);

    OutputView.printEventResult(this.#discount.getResult());
    OutputView.printDiscountTotal(this.#discount.calculateDiscountTotal());
    OutputView.printFinalOrderTotal(this.#host.calculateFinalOrderTotal());
    OutputView.printEventBadge(this.#host.handleEventBadge());
  }
}

export default App;
