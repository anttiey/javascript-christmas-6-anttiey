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
};

export default OutputView;
