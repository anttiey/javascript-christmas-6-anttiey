import User from '../src/User.js';
import Order from '../src/Order.js';
import Discount from '../src/Discount.js';

describe('할인 전 총 주문 금액 계산 테스트', () => {
  test.each([
    [[['해산물파스타', 1]], 35000],
    [[['해산물파스타', 2]], 70000],
    [
      [
        ['해산물파스타', 1],
        ['바비큐립', 1],
      ],
      89000,
    ],
    [
      [
        ['양송이수프', 1],
        ['해산물파스타', 1],
        ['초코케이크', 1],
        ['제로콜라', 1],
      ],
      59000,
    ],
  ])('주문 메뉴와 개수를 입력하면, 알맞은 할인 전 총 주문 금액을 반환한다.', (orders, total) => {
    const user = new User();
    user.setOrders(orders.map((order) => new Order(order)));

    expect(user.calculateOrderTotal()).toEqual(total);
  });
});

describe('증정 메뉴 헤택 계산 테스트', () => {
  test.each([120000, 130000, 200000])(
    '총 주문 금액이 12만 원 이상이면, 증정 메뉴 혜택은 25000원이다.',
    (total) => {
      const discount = new Discount();
      discount.applyFreeMenu(total);

      expect(discount.getResult().free).toEqual(25000);
    }
  );

  test.each([10000, 70000, 119999])(
    '총 주문 금액이 12만 원 이하이면, 증정 메뉴 혜택은 0원이다.',
    (total) => {
      const discount = new Discount();
      discount.applyFreeMenu(total);

      expect(discount.getResult().free).toEqual(0);
    }
  );
});
