import { Console } from '@woowacourse/mission-utils';
import Messages from '../constants/Messages.js';

const { OUTPUT, EVENT } = Messages;

const OutputView = {
  printStart() {
    Console.print(OUTPUT.start);
  },

  printNotice(date) {
    Console.print(OUTPUT.notice(date));
  },

  printMenu(orders) {
    Console.print(OUTPUT.order);
    orders.forEach((order) =>
      Console.print(OUTPUT.order_detail(order.getMenu(), order.getCount()))
    );
  },

  printOrderTotal(total) {
    Console.print(OUTPUT.order_total(total));
  },

  printOrderResult(user) {
    this.printMenu(user.getOrders());
    this.printOrderTotal(user.calculateTotalOrderPrice());
  },

  printFreeMenu(free) {
    if (free === 0) {
      Console.print(OUTPUT.free_none);
    } else {
      Console.print(OUTPUT.free_exist);
    }
  },

  printSingleDiscountDetails(name, discount) {
    if (discount !== 0) {
      Console.print(OUTPUT.discount_detail(name, discount));
    }
  },

  printAllDiscountDetails(result) {
    Console.print(OUTPUT.discount);

    if (Object.values(result).every((discount) => discount === 0)) {
      Console.print(OUTPUT.discount_none);
    }

    this.printSingleDiscountDetails(EVENT.free, result.free);
    this.printSingleDiscountDetails(EVENT.christmas, result.christmas);
    this.printSingleDiscountDetails(EVENT.weekday, result.weekday);
    this.printSingleDiscountDetails(EVENT.holiday, result.holiday);
    this.printSingleDiscountDetails(EVENT.special, result.special);
  },

  printEventResult(result) {
    this.printFreeMenu(result.free);
    this.printAllDiscountDetails(result);
  },

  printDiscountTotal(totalDiscount) {
    Console.print(OUTPUT.discount_total(totalDiscount));
  },

  printFinalOrderTotal(totalOrder) {
    Console.print(OUTPUT.final_order_total(totalOrder));
  },

  printEventBadge(badge) {
    Console.print(OUTPUT.badge(badge));
  },
};

export default OutputView;
