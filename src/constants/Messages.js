const INPUT = {
  date: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  order:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
};

const OUTPUT = {
  start: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  notice: (date) => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  order: '<주문 메뉴>',
  order_detail: (menu, count) => `${menu} ${count}개`,
  order_total: (total) => `<할인 전 총주문 금액>\n${total.toLocaleString('ko-KR')}원`,
  free_none: '<증정 메뉴>\n없음',
  free_exist: '<증정 메뉴>\n샴페인 1개',
  discount: '<혜택 내역>',
  discount_detail: (name, discount) => `${name}: -${discount.toLocaleString('ko-KR')}원`,
  discount_none: '없음',
  discount_total: (totalDiscount) => `<총혜택 금액>\n${totalDiscount.toLocaleString('ko-KR')}원`,
  final_order_total: (total) => `<할인 후 예상 결제 금액>\n${total.toLocaleString('ko-KR')}원`,
  badge: (badge) => `<12월 이벤트 배지>\n${badge}`,
};

const EVENT = {
  free: '증정 이벤트',
  christmas: '크리스마스 디데이 할인',
  weekday: '평일 할인',
  holiday: '주말 할인',
  special: '특별 할인',
};

const ERROR = {
  null: '[ERROR] 입력이 없습니다.',
  date: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  order: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  only_drink: '[ERROR] 음료만 주문 시, 주문할 수 없습니다. 다시 입력해 주세요.',
  menu_count: '[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다. 다시 입력해 주세요.',
};

export default { INPUT, OUTPUT, EVENT, ERROR };
