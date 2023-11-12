import { Console } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import Validation from './utils/Validation.js';

class App {
  async getDate() {
    while (true) {
      try {
        const date = await InputView.readDate();

        Validation.validateDateNumber(Number(date));
        Validation.validateDateRange(Number(date));
        return;
      } catch (err) {
        Console.print(err.message);
      }
    }
  }

  async run() {
    await this.getDate();
  }
}

export default App;
