import { Console } from '@woowacourse/mission-utils';
import Host from './Host.js';
import User from './User.js';
import Discount from './Discount.js';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';

class App {
  #user;
  #discount;
  #host;

  constructor() {
    this.#user = new User();
    this.#discount = new Discount();
    this.#host = new Host(this.#user, this.#discount);
  }

  async readUserDate() {
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

  async readUserOrders() {
    while (true) {
      try {
        const orderStr = await InputView.readOrders();
        this.#user.setOrders(orderStr);
        break;
      } catch (err) {
        Console.print(err.message);
      }
    }
  }

  async run() {
    OutputView.printStart();

    await this.readUserDate();
    await this.readUserOrders();

    OutputView.printOrderResult(this.#user);

    this.#host.handleEventDiscounts(this.#user, this.#discount);

    OutputView.printEventResults(this.#host, this.#discount);
  }
}

export default App;
