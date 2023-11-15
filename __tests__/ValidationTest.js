import { Console } from '@woowacourse/mission-utils';
import InputView from '../src/view/InputView.js';
import User from '../src/User.js';

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
    expect(() => new User().setDate(Number('가'))).toThrow(
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.'
    );
  });

  test('날짜가 1 이상 31 이하가 아닌 경우, 예외가 발생한다.', () => {
    expect(() => new User().setDate(Number('32'))).toThrow(
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.'
    );
  });
});

describe('주문 메뉴와 개수 유효성 테스트', () => {
  test('메뉴 형식이 예시와 다른 경우, 예외가 발생한다.', () => {
    const order = '마라탕-1';
    expect(() => new User().setOrders(order)).toThrow(
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.'
    );
  });

  test('메뉴판에 없는 메뉴를 입력하는 경우, 예외가 발생한다.', () => {
    const order = '마라탕-1';
    expect(() => new User().setOrders(order)).toThrow(
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.'
    );
  });

  test('메뉴의 개수가 1 이상이 아닌 경우, 예외가 발생한다.', () => {
    const order = '해산물파스타-0';
    expect(() => new User().setOrders(order)).toThrow(
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.'
    );
  });

  test('중복 메뉴를 입력한 경우, 예외가 발생한다.', () => {
    const order = '해산물파스타-1,해산물파스타-1';
    expect(() => new User().setOrders(order)).toThrow(
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.'
    );
  });

  test('음료만 주문한 경우, 예외가 발생한다.', () => {
    const order = '제로콜라-1';
    expect(() => new User().setOrders(order)).toThrow(
      '[ERROR] 음료만 주문 시, 주문할 수 없습니다. 다시 입력해 주세요.'
    );
  });

  test('메뉴를 한 번에 20개 이상 주문한 경우, 예외가 발생한다.', () => {
    const order = '해산물파스타-21';
    expect(() => new User().setOrders(order)).toThrow(
      '[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다. 다시 입력해 주세요.'
    );
  });
});
