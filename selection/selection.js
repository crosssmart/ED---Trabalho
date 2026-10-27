function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) if (arr[j] < arr[minIndex]) minIndex = j;
    if (minIndex !== i) { let temp = arr[i]; arr[i] = arr[minIndex]; arr[minIndex] = temp; }
  }
  return arr;
}
// Exemplo:
const numeros = [5, 3, 8, 1, 2];
console.log(selectionSort(numeros)); // [1, 2, 3, 5, 8]