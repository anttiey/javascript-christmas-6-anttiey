import User from '../src/User.js';
import Host from '../src/Host.js';
import Discount from '../src/Discount.js';

describe('할인 전 총 주문 금액 계산 테스트', () => {
  test.each([
    ['해산물파스타-1', 35000],
    ['해산물파스타-2', 70000],
    ['해산물파스타-1,바비큐립-1', 89000],
    ['양송이수프-1,해산물파스타-1,초코케이크-1,제로콜라-1', 59000],
  ])('주문 메뉴와 개수를 입력하면, 알맞은 할인 전 총 주문 금액을 반환한다.', (orders, total) => {
    const user = new User();
    user.setOrders(orders);

    expect(user.calculateTotalOrderPrice()).toEqual(total);
  });
});

describe('총 혜택 금액 계산 테스트', () => {
  test.each([
    [7, '양송이수프-1', 0],
    [7, '양송이수프-1,티본스테이크-1,초코케이크-1', 3623],
    [8, '양송이수프-1,티본스테이크-1,초코케이크-1', 3723],
    [10, '양송이수프-1,티본스테이크-1,초코케이크-1', 4923],
    [10, '양송이수프-1,티본스테이크-2,초코케이크-1', 29923],
  ])(
    '할인 금액의 합계와 증정 메뉴의 가격을 더해, 알맞은 총 혜택 금액을 반환한다.',
    (date, orders, value) => {
      const user = new User();
      const discount = new Discount();
      const host = new Host(user, discount);

      user.setDate(date);
      user.setOrders(orders);

      host.handleEventDiscounts();

      expect(discount.calculateDiscountTotal()).toEqual(value);
    }
  );
});

describe('할인 후 예상 결제 금액 계산 테스트', () => {
  test.each([
    [7, '양송이수프-1', 6000],
    [10, '양송이수프-1,티본스테이크-1,초코케이크-1', 71077],
    [10, '양송이수프-1,티본스테이크-2,초코케이크-1', 126077],
  ])(
    '할인 전 총 주문 금액에서 할인 금액을 빼, 알맞은 할인 후 예상 결제 금액을 반환한다.',
    (date, orders, value) => {
      const user = new User();
      const discount = new Discount();
      const host = new Host(user, discount);

      user.setDate(date);
      user.setOrders(orders);

      host.handleEventDiscounts();

      expect(host.calculateFinalOrderTotal()).toEqual(value);
    }
  );
});

describe('이벤트 배지 부여 테스트', () => {
  test('총 혜택 금액이 2만 원 이상이면, 산타를 부여한다.', () => {
    const user = new User();
    const discount = new Discount();
    const host = new Host(user, discount);

    user.setDate(1);
    user.setOrders('양송이수프-1,티본스테이크-2,초코케이크-1');

    host.handleEventDiscounts();

    expect(host.calculateEventBadge()).toEqual('산타');
  });

  test('총 혜택 금액이 1만 원 이상 2만 원 미만이면, 트리를 부여한다.', () => {
    const user = new User();
    const discount = new Discount();
    const host = new Host(user, discount);

    user.setDate(25);
    user.setOrders('양송이수프-1,티본스테이크-1,초코케이크-3');

    host.handleEventDiscounts();

    expect(host.calculateEventBadge()).toEqual('트리');
  });

  test('총 혜택 금액이 5천 원 이상 1만 원 미만이면, 별을 부여한다.', () => {
    const user = new User();
    const discount = new Discount();
    const host = new Host(user, discount);

    user.setDate(25);
    user.setOrders('양송이수프-1,티본스테이크-1,초코케이크-1');

    host.handleEventDiscounts();

    expect(host.calculateEventBadge(5000)).toEqual('별');
  });

  test('총 혜택 금액이 5천 원 미만이면, 이벤트 배지를 부여하지 않는다.', () => {
    const user = new User();
    const discount = new Discount();
    const host = new Host(user, discount);

    user.setDate(26);
    user.setOrders('양송이수프-1,티본스테이크-1,초코케이크-1');

    host.handleEventDiscounts();

    expect(host.calculateEventBadge(1000)).toEqual('없음');
  });
});
