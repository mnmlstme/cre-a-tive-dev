// const list = [1, 2, 3, 6, 5, 7, 8];
// const list = [1];
const list = [1, 2, 2, 4];

function isSorted(list) {
  for (i = 0; i < list.length - 1; i++) {
    if (list[i] > list[i + 1]) {
      return false;
    }
  }

  return true;
}
