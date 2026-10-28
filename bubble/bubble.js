const {
  vetores1000,
  vetores10000,
  vetores50000,
  vetores100000
} = require("../vetores");

function bubbleSort(arr) {
  let n = arr.length;
  let comparacoes = 0;
  let movimentacoes = 0;

  for (let i = 0; i < n - 1; i++) {
    let trocou = false;

    for (let j = 0; j < n - 1 - i; j++) {
      comparacoes++;

      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        movimentacoes++;

        arr[j] = arr[j + 1];
        movimentacoes++;

        arr[j + 1] = temp;
        movimentacoes++;

        trocou = true;
      }
    }

    // Se não houve trocas, o array já está ordenado
    if (!trocou) {
      break;
    }
  }

  return {
    comparacoes,
    movimentacoes
  };
}

function testarVetor(nome, vetor) {
  console.log(`\n[${nome}]`);

  const copia = [...vetor];
  const resultado = bubbleSort(copia);

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