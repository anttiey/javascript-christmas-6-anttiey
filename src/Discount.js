class Discount {
  #free;
  #christmas;
  #weekday;
  #holiday;
  #special;

  constructor() {
    this.#free = 0;
    this.#christmas = 0;
    this.#weekday = 0;
    this.#holiday = 0;
    this.#special = 0;
  }

  setFree(free) {
    this.#free = free;
  }

  setChristmas(christmas) {
    this.#christmas = christmas;
  }

  setWeekday(weekday) {
    this.#weekday = weekday;
  }

  setHoliday(holiday) {
    this.#holiday = holiday;
  }

  setSpecial(special) {
    this.#special = special;
  }

  getResult() {
    return {
      free: this.#free,
      christmas: this.#christmas,
      weekday: this.#weekday,
      holiday: this.#holiday,
      special: this.#special,
    };
  }

  calculateDiscountTotal() {
    return this.#free + this.#christmas + this.#weekday + this.#holiday + this.#special;
  }

  calculateRealDiscountTotal() {
    return this.#christmas + this.#weekday + this.#holiday + this.#special;
  }
}

export default Discount;
