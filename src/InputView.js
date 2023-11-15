import { Console } from '@woowacourse/mission-utils';
import Validation from './utils/Validation.js';
import Messages from './constants/Messages.js';

const { INPUT } = Messages;

const InputView = {
  async readDate() {
    const input = await this.read(INPUT.date);

    return input.trim();
  },

  async readOrders() {
    const input = await this.read(INPUT.order);

    return input.trim();
  },

  async read(message) {
    const input = await Console.readLineAsync(message);
    Validation.validateInputEmpty(input);
    return input;
  },
};

export default InputView;
