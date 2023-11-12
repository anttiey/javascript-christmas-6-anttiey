import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMenu(orders) {
    Console.print('<주문 메뉴>');
    orders.forEach(([menu, count]) => Console.print(`${menu} ${count}개`));
  },
};

export default OutputView;
