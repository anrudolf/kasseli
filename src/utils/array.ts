function arraymove(arr: any[], fromIndex: number, toIndex: number) {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

const moveUp = (arr: any[], idx: number) => {
  if (idx >= arr.length - 1) {
    return;
  }
  arraymove(arr, idx, idx + 1);
};

const moveDown = (arr: any[], idx: number) => {
  if (idx <= 0) {
    return;
  }
  arraymove(arr, idx, idx - 1);
};

const moveTop = (arr: any[], idx: number) => {
  if (idx >= arr.length - 1) {
    return;
  }
  arraymove(arr, idx, arr.length);
};

const moveBottom = (arr: any[], idx: number) => {
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
