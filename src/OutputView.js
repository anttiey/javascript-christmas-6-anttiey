import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMenu(orders) {
    Console.print('<주문 메뉴>');
    orders.forEach(([menu, count]) => Console.print(`${menu} ${count}개`));
  },

  printOrderTotal(total) {
    Console.print('<할인 전 총주문 금액>');
    Console.print(`${total.toLocaleString('ko-KR')}원`);
  },

  printFreeMenu(result) {
    if (result.free === 0) {
      Console.print('<증정 메뉴>\n없음');
    } else {
      Console.print('<증정 메뉴>\n샴페인 1개');
    }
  },

  printSingleDiscountDetails(name, discount) {
    if (discount !== 0) {
      Console.print(`${name}: -${discount.toLocaleString('ko-KR')}원`);
    }
  },

  printAllDiscountDetails(result) {
    Console.print('<혜택 내역>');

    if (Object.values(result).every((discount) => discount === 0)) {
      Console.print('없음');
    }

    this.printSingleDiscountDetails('증정 이벤트', result.free);
    this.printSingleDiscountDetails('크리스마스 디데이 할인', result.christmas);
    this.printSingleDiscountDetails('평일 할인', result.weekday);
    this.printSingleDiscountDetails('주말 할인', result.holiday);
    this.printSingleDiscountDetails('특별 할인', result.special);
  },
};

export default OutputView;
