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

describe('크리스마스 디데이 할인 헤택 계산 테스트', () => {
  test.each([
    [1, 1000],
    [5, 1400],
    [10, 1900],
    [15, 2400],
    [20, 2900],
    [25, 3400],
  ])(
    '1일부터 25일 사이의 기간이라면, 1000원으로 시작하여 날마다 100원씩 증가하는 할인 혜택을 제공한다.',
    (date, value) => {
      const discount = new Discount();
      discount.applyChristmasDiscount(date);

      expect(discount.getResult().christmas).toEqual(value);
    }
  );

  test('1일부터 25일 사이의 기간이 아니라면, 할인 혜택을 제공하지 않는다.', () => {
    const discount = new Discount();
    discount.applyChristmasDiscount(31);

    expect(discount.getResult().christmas).toEqual(0);
  });
});

describe('평일 할인 헤택 계산 테스트', () => {
  test.each([
    [5, [new Order(['티본스테이크', 1])], 0],
    [5, [new Order(['티본스테이크', 1]), new Order(['초코케이크', 1])], 2023],
    [5, [new Order(['티본스테이크', 1]), new Order(['초코케이크', 2])], 4046],
  ])('평일이라면, 디저트 메뉴를 메뉴 1개당 2,023원 할인한다.', (date, orders, value) => {
    const discount = new Discount();
    discount.applyWeekdayDiscount(date, orders);

    expect(discount.getResult().weekday).toEqual(value);
  });

  test('평일이 아니라면, 할인 혜택을 제공하지 않는다.', () => {
    const discount = new Discount();
    discount.applyWeekdayDiscount(15, [
      new Order(['티본스테이크', 1]),
      new Order(['초코케이크', 1]),
    ]);

    expect(discount.getResult().weekday).toEqual(0);
  });
});

describe('주말 할인 헤택 계산 테스트', () => {
  test.each([
    [15, [new Order(['초코케이크', 1])], 0],
    [15, [new Order(['티본스테이크', 1]), new Order(['초코케이크', 1])], 2023],
    [15, [new Order(['티본스테이크', 2]), new Order(['초코케이크', 1])], 4046],
  ])('주말이라면, 메인 메뉴를 메뉴 1개당 2,023원 할인한다.', (date, orders, value) => {
    const discount = new Discount();
    discount.applyHolidayDiscount(date, orders);

    expect(discount.getResult().holiday).toEqual(value);
  });

  test('주말이 아니라면, 할인 혜택을 제공하지 않는다.', () => {
    const discount = new Discount();
    discount.applyHolidayDiscount(5, [
      new Order(['티본스테이크', 1]),
      new Order(['초코케이크', 1]),
    ]);

    expect(discount.getResult().holiday).toEqual(0);
  });
});

describe('특별 할인 헤택 계산 테스트', () => {
  test.each([3, 10, 17, 24, 25, 31])('달력에 별이 있는 날이라면, 1000원 할인한다.', (date) => {
    const discount = new Discount();
    discount.applySpecialDiscount(date);

    expect(discount.getResult().special).toEqual(1000);
  });

  test.each([4, 5, 11, 12, 26])(
    '달력에 별이 있는 날이 아니라면, 할인 혜택을 제공하지 않는다.',
    (date) => {
      const discount = new Discount();
      discount.applySpecialDiscount(date);

      expect(discount.getResult().special).toEqual(0);
    }
  );
});
