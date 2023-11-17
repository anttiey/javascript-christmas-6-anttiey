import Condition from './constants/Condition.js';

const { EVENT, BADGE_NAME, BADGE_PRICE } = Condition;

class Host {
  #user;
  #discount;

  constructor(user, discount) {
    this.#user = user;
    this.#discount = discount;
  }

  handleEventDiscounts() {
    if (this.#user.calculateTotalOrderPrice() < EVENT.min) {
      return;
    }

    this.#discount.applyFreeMenuDiscount(this.#user.calculateTotalOrderPrice());
    this.#discount.applyChristmasDiscount(this.#user.getDate());
    this.#discount.applyHolidayDiscount(this.#user.getDate(), this.#user.getOrders());
    this.#discount.applyWeekdayDiscount(this.#user.getDate(), this.#user.getOrders());
    this.#discount.applySpecialDiscount(this.#user.getDate());
  }

  calculateEventBadge() {
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
    return (
      this.#user.calculateTotalOrderPrice() - this.#discount.calculateDiscountTotalExceptFree()
    );
  }
}

export default Host;
