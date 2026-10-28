
const {
  vetores1000,
  vetores10000,
  vetores50000,
  vetores100000
} = require("../vetores");

function heapSort(arr) {
  let comparacoes = 0;
  let movimentacoes = 0;
  const n = arr.length;

  function trocar(i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    movimentacoes++;
  }

  function heapify(n, i) {
    let maior = i;
    let esquerda = 2 * i + 1;
    let direita = 2 * i + 2;

    if (esquerda < n) {
      comparacoes++;

      if (arr[esquerda] > arr[maior]) {
        maior = esquerda;
      }
    }

    if (direita < n) {
      comparacoes++;

      if (arr[direita] > arr[maior]) {
        maior = direita;
      }
    }

    if (maior !== i) {
      trocar(i, maior);
      heapify(n, maior);
    }
  }

  // Construir a Heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Ordenar o vetor
  for (let i = n - 1; i > 0; i--) {
    trocar(0, i);
    heapify(i, 0);
  }

  return {
    vetor: arr,
    comparacoes: comparacoes,
    movimentacoes: movimentacoes
  };
}

function testarVetor(nome, vetor) {
  console.log(`\n[${nome}]`);

  const copia = [...vetor];
  const resultado = heapSort(copia);

  console.log("Quantidade de elementos:", vetor.length);
  console.log("Quantidade de comparações:", resultado.comparacoes);
  console.log("Quantidade de movimentações:", resultado.movimentacoes);
}

console.log("\n========================================");
console.log("            TESTE - HEAP SORT");
console.log("========================================");

console.log("\n========== N = 1.000 ==========");

testarVetor("1 - VETOR ALEATÓRIO", vetores1000.aleatorio);
testarVetor("2 - VETOR CRESCENTE", vetores1000.crescente);
testarVetor("3 - VETOR DECRESCENTE", vetores1000.decrescente);
testarVetor("4 - VETOR PARCIALMENTE ORDENADO", vetores1000.parcialmenteOrdenado);

console.log("\n========== N = 10.000 ==========");

testarVetor("1 - VETOR ALEATÓRIO", vetores10000.aleatorio);
testarVetor("2 - VETOR CRESCENTE", vetores10000.crescente);
testarVetor("3 - VETOR DECRESCENTE", vetores10000.decrescente);
testarVetor("4 - VETOR PARCIALMENTE ORDENADO", vetores10000.parcialmenteOrdenado);

console.log("\n========== N = 50.000 ==========");

testarVetor("1 - VETOR ALEATÓRIO", vetores50000.aleatorio);
testarVetor("2 - VETOR CRESCENTE", vetores50000.crescente);
testarVetor("3 - VETOR DECRESCENTE", vetores50000.decrescente);
testarVetor("4 - VETOR PARCIALMENTE ORDENADO", vetores50000.parcialmenteOrdenado);

console.log("\n========== N = 100.000 ==========");

testarVetor("1 - VETOR ALEATÓRIO", vetores100000.aleatorio);
testarVetor("2 - VETOR CRESCENTE", vetores100000.crescente);
testarVetor("3 - VETOR DECRESCENTE", vetores100000.decrescente);
testarVetor("4 - VETOR PARCIALMENTE ORDENADO", vetores100000.parcialmenteOrdenado);

console.log("\n========================================");
console.log("             FIM DOS TESTES");
console.log("========================================\n");
