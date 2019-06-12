import Vue from 'vue';

export const eventBus = new Vue();

// 递归查找所有默认项，抽取出来作为一个新的数组
export const getDefault = (arr, defaultValue) => {
  if (defaultValue.length === 0) {
    return [];
  }
  const currentIndex = defaultValue.shift();
  const currentArr = arr[currentIndex] || arr[0];
  if (!currentArr.children) return [];
  return [currentArr.children].concat(
      getDefault(currentArr.children, defaultValue));
};

// 获取默认索引
export const getDefaultIndex = (items) => {
  let current = Math.floor(items.length / 2);
  let count = 0;
  while (!!items[current] && items[current].disabled) {
    current = ++current % items.length;
    count++;
    if (count > items.length) {
      throw new Error('No selectable item.');
    }
  }
  return current;
};

// 获取默认偏移量
export const getDefaultTranslate = (offset, rowHeight, items) => {
  const currentIndex = getDefaultIndex(items);
  return (offset - currentIndex) * rowHeight;
};


export const getMax = (offset, rowHeight) => {
  return offset * rowHeight;
};


export const getMin = (offset, rowHeight, length) => {
  return -(rowHeight * (length - offset - 1));
};
