import Date from './constants/Date.js';
import Condition from './constants/Condition.js';

const { EVENT_TOTAL_MIN, CHRISTMAS_EVENT, BADGE_NAME, BADGE_PRICE } = Condition;

class Host {
  handleEventDiscount(date, orders, total, discount) {
    if (total < EVENT_TOTAL_MIN) {
      return;
    }

    discount.applyFreeMenu(total);
    discount.applyChristmasDiscount(date);
    discount.applyHolidayDiscount(date, orders);
    discount.applyWeekdayDiscount(date, orders);
    discount.applySpecialDiscount(date);
  }

  handleEventBadge(totalDiscount) {
    switch (true) {
      case totalDiscount >= BADGE_PRICE.santa:
        return BADGE_NAME.santa;
      case totalDiscount >= BADGE_PRICE.tree:
        return BADGE_NAME.tree;
      case totalDiscount >= BADGE_PRICE.star:
        return BADGE_NAME.star;
      default:
        return BADGE_NAME.none;
    }
  }
}

export default Host;
