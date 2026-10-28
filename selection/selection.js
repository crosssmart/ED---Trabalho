const {
  vetores1000,
  vetores10000,
  vetores50000,
  vetores100000
} = require("../vetores");

function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) if (arr[j] < arr[minIndex]) minIndex = j;
    if (minIndex !== i) { let temp = arr[i]; arr[i] = arr[minIndex]; arr[minIndex] = temp; }
  }
  return arr;
}

function testarVetor(nome, vetor) {
  console.log(`\n[${nome}]`);

  const copia = [...vetor];
  const resultado = selectionSort(copia);

  console.log("Quantidade de elementos:", vetor.length);
  console.log("Quantidade de comparações:", resultado.comparacoes);
  console.log("Quantidade de movimentações:", resultado.movimentacoes);
}


console.log("\n========================================");
console.log("            TESTE DE VETORES");
console.log("========================================");

console.log("\n========== N = 1.000 ==========");

// testarVetor("1 - VETOR ALEATÓRIO", vetores1000.aleatorio);
// testarVetor("2 - VETOR CRESCENTE", vetores1000.crescente);
// testarVetor("3 - VETOR DECRESCENTE", vetores1000.decrescente);
// testarVetor("4 - VETOR PARCIALMENTE ORDENADO", vetores1000.parcialmenteOrdenado);

console.log("\n========== N = 10.000 ==========");

// testarVetor("1 - VETOR ALEATÓRIO", vetores10000.aleatorio);
// testarVetor("2 - VETOR CRESCENTE", vetores10000.crescente);
// testarVetor("3 - VETOR DECRESCENTE", vetores10000.decrescente);
// testarVetor("4 - VETOR PARCIALMENTE ORDENADO", vetores10000.parcialmenteOrdenado);

// Atenção: Bubble Sort pode demorar bastante nesses tamanhos.

console.log("\n========== N = 50.000 ==========");

// testarVetor("1 - VETOR ALEATÓRIO", vetores50000.aleatorio);
// testarVetor("2 - VETOR CRESCENTE", vetores50000.crescente);
// testarVetor("3 - VETOR DECRESCENTE", vetores50000.decrescente);
// testarVetor("4 - VETOR PARCIALMENTE ORDENADO", vetores50000.parcialmenteOrdenado);

console.log("\n========== N = 100.000 ==========");

testarVetor("1 - VETOR ALEATÓRIO", vetores100000.aleatorio);
testarVetor("2 - VETOR CRESCENTE", vetores100000.crescente);
testarVetor("3 - VETOR DECRESCENTE", vetores100000.decrescente);
testarVetor("4 - VETOR PARCIALMENTE ORDENADO", vetores100000.parcialmenteOrdenado);

console.log("\n========================================");
console.log("             FIM DOS TESTES");
console.log("========================================\n");