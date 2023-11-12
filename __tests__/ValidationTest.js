import { Console } from '@woowacourse/mission-utils';
import InputView from '../src/InputView.js';
import Validation from '../src/utils/Validation.js';

const mockQuestions = (input) => {
  Console.readLineAsync = jest.fn();

  Console.readLineAsync.mockImplementation(() => {
    return Promise.resolve(input);
  });
};

describe('입력 유효성 테스트', () => {
  test('입력된 값이 없을 때, 예외가 발생한다.', () => {
    const input = '';
    mockQuestions(input);
    expect(() => InputView.read()).rejects.toThrow('[ERROR] 입력이 없습니다.');
  });
});

describe('식당 예상 방문 날짜 유효성 테스트', () => {
  test('날짜가 숫자가 아닌 경우, 예외가 발생한다.', () => {
    expect(() => Validation.validateDateNumber(Number('가'))).toThrow(
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.'
    );
  });

  test('날짜가 1 이상 31 이하가 아닌 경우, 예외가 발생한다.', () => {
    const input = '32';
    expect(() => Validation.validateDateRange(Number('32'))).toThrow(
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.'
    );
  });
});
