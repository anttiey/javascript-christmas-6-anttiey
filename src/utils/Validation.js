class Validation {
  static validateInputEmpty(input) {
    if (input === '') {
      throw new Error('[ERROR] 입력이 없습니다.');
    }
  }

  static validateDateNumber(input) {
    if (Number.isNaN(input)) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }

  static validateDateRange(input) {
    if (input < 1 || input > 31) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }
}

export default Validation;
