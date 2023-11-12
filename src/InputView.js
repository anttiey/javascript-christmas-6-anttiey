import { Console } from '@woowacourse/mission-utils';
import Validation from './utils/Validation.js';

const InputView = {
  async readDate() {
    const input = await this.read(
      '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n'
    );

    return input.trim();
  },

  async read(message) {
    const input = await Console.readLineAsync(message);
    Validation.validateInputEmpty(input);
    return input;
  },
};

export default InputView;
