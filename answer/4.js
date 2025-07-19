const array1 = [2, 5, 8, 9];
const array2 = [1, 2, 3, 4, 5, 6, 7];
const array3 = array2.filter((num) => !array1.includes(num));
console.log(array3);
