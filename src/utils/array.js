function arraymove(arr, fromIndex, toIndex) {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

const moveUp = (arr, idx) => {
  if (idx >= arr.length - 1) {
    return;
  }
  arraymove(arr, idx, idx + 1);
};

const moveDown = (arr, idx) => {
  if (idx <= 0) {
    return;
  }
  arraymove(arr, idx, idx - 1);
};

const moveTop = (arr, idx) => {
  if (idx >= arr.length - 1) {
    return;
  }
  arraymove(arr, idx, arr.length);
};

const moveBottom = (arr, idx) => {
  if (idx <= 0) {
    return;
  }
  arraymove(arr, idx, 0);
};

export default {
  moveUp,
  moveDown,
  moveTop,
  moveBottom,
};
