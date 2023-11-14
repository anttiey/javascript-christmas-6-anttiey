import Date from './constants/Date.js';

class Host {
  handleEventDiscount(date, orders, total, discount) {
    if (total >= 10000) {
      discount.applyFreeMenu(total);

      if (date >= 1 && date <= 25) {
        discount.applyChristmasDiscount(date);
      }

      if (Date.HOLIDAY.includes(date)) {
        discount.applyHolidayDiscount(orders);
      } else {
        discount.applyWeekdayDiscount(orders);
      }

      if (Date.SPECIAL.includes(date)) {
        discount.applySpecialDiscount();
      }
    }
  }

  handleEventBadge(totalDiscount) {
    switch (true) {
      case totalDiscount >= 20000:
        return '산타';
      case totalDiscount >= 10000:
        return '트리';
      case totalDiscount >= 5000:
        return '별';
      default:
        return '없음';
    }
  }
}

export default Host;
