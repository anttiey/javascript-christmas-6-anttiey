const ORDER_DELIMITER = ',';
const MENU_COUNT_DELIMITER = '-';

const EVENT_TOTAL_MIN = 10000;

const FREE_MENU = {
  min: 120000,
  count: 1,
  price: 25000,
};

const CHRISTMAS_EVENT = {
  start: 1,
  end: 25,
  default: 1000,
  increase: 100,
};

const DISCOUNT_EVENT = {
  weekday: 2023,
  holiday: 2023,
  special: 1000,
};

const BADGE_NAME = {
  santa: '산타',
  tree: '트리',
  star: '별',
  none: '없음',
};

const BADGE_PRICE = {
  santa: 20000,
  tree: 10000,
  star: 5000,
};

export default {
  ORDER_DELIMITER,
  MENU_COUNT_DELIMITER,
  EVENT_TOTAL_MIN,
  FREE_MENU,
  CHRISTMAS_EVENT,
  DISCOUNT_EVENT,
  BADGE_NAME,
  BADGE_PRICE,
};
