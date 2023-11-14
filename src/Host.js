import Condition from './constants/Condition.js';

const { EVENT_TOTAL_MIN, BADGE_NAME, BADGE_PRICE } = Condition;

class Host {
  #user;
  #discount;

  constructor(user, discount) {
    this.#user = user;
    this.#discount = discount;
  }

  handleEventDiscount() {
    if (this.#user.calculateOrderTotal() < EVENT_TOTAL_MIN) {
      return;
    }

    this.#discount.applyFreeMenu(this.#user.calculateOrderTotal());
    this.#discount.applyChristmasDiscount(this.#user.getDate());
    this.#discount.applyHolidayDiscount(this.#user.getDate(), this.#user.getOrders());
    this.#discount.applyWeekdayDiscount(this.#user.getDate(), this.#user.getOrders());
    this.#discount.applySpecialDiscount(this.#user.getDate());
  }

  handleEventBadge() {
    const totalDiscount = this.#discount.calculateDiscountTotal();

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

  calculateFinalOrderTotal() {
    return this.#user.calculateOrderTotal() - this.#discount.calculateRealDiscountTotal();
  }
}

export default Host;
