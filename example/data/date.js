let yearBegin = 1990;
const dayList = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31];
const date = [];
const d = new Date();
let yearNow = d.getFullYear();
let monthNow = d.getMonth() + 1;
let dayNow = d.getDate();
while (yearBegin <= yearNow) {
  const currentYear = {
    label: yearBegin + '年',
    value: yearBegin,
    children: [],
  };
  let monthBegin = 1, months = [];
  while (monthBegin <= 12) {
    months.push(monthBegin);
    let maxDay = 31;
    if ([4, 6, 9, 11].includes(monthBegin)) {
      maxDay = 30;
    }
    if (monthBegin === 2) {
      if (yearBegin % 4 === 0) {
        maxDay = 29;
      } else {
        maxDay = 28;
      }
    }
    if (yearBegin === yearNow) {
      if (monthBegin === monthNow) {
        maxDay = dayNow;
      }
      if (monthBegin > monthNow) {
        break;
      }
    }
    currentYear.children.push({
      label: monthBegin + '月',
      value: monthBegin,
      children: dayList.slice(0, maxDay).map(i => {
        return {
          label: i + '日',
          value: i,
        };
      }),
    });
    monthBegin++;
  }
  date.push(currentYear);
  yearBegin++;
}
export default date;