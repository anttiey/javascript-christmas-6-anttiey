import { Console } from '@woowacourse/mission-utils';
import Host from './Host.js';
import User from './User.js';
import Discount from './Discount.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Validation from './utils/Validation.js';
import Condition from './constants/Condition.js';

const { ORDER_DELIMITER, MENU_COUNT_DELIMITER } = Condition;

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

        const orders = orderStr.split(ORDER_DELIMITER).map((order) => {
          Validation.validateOrderForm(order);
          const [menu, count] = order.split(MENU_COUNT_DELIMITER);
          return [menu, Number(count)];
        });

        this.#user.setOrders(orders);
        break;
      } catch (err) {
        Console.print(err.message);
      }
    }
  }

  async run() {
    await this.getDate();
    await this.getOrder();

    OutputView.printMenu(this.#user.getOrders());
    OutputView.printOrderTotal(this.#user.calculateOrderTotal());

    this.#host.handleEventDiscount(
      this.#user.getDate(),
      this.#user.getOrders(),
      this.#user.calculateOrderTotal(),
      this.#discount
    );

    OutputView.printFreeMenu(this.#discount.getResult());
    OutputView.printAllDiscountDetails(this.#discount.getResult());
    OutputView.printDiscountTotal(this.#discount.calculateDiscountTotal());
    OutputView.printFinalOrderTotal(
      this.#user.calculateFinalOrderTotal(this.#discount.calculateRealDiscountTotal())
    );
    OutputView.printEventBadge(
      this.#host.handleEventBadge(this.#discount.calculateDiscountTotal())
    );
  }
}

export default App;
