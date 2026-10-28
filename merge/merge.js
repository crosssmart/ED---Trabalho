
const {
  vetores1000,
  vetores10000,
  vetores50000,
  vetores100000
} = require("../vetores");

function mergeSort(arr) {
  let comparacoes = 0;
  let movimentacoes = 0;

  function ordenar(inicio, fim) {
    if (inicio >= fim) {
      return;
    }

    const meio = Math.floor((inicio + fim) / 2);

    ordenar(inicio, meio);
    ordenar(meio + 1, fim);
    intercalar(inicio, meio, fim);
  }

  function intercalar(inicio, meio, fim) {
    let esquerda = inicio;
    let direita = meio + 1;
    let temporario = [];

    while (esquerda <= meio && direita <= fim) {
      comparacoes++;

      if (arr[esquerda] <= arr[direita]) {
        temporario.push(arr[esquerda]);
        esquerda++;
      } else {
        temporario.push(arr[direita]);
        direita++;
      }
    }

    while (esquerda <= meio) {
      temporario.push(arr[esquerda]);
      esquerda++;
    }

    while (direita <= fim) {
      temporario.push(arr[direita]);
      direita++;
    }

    for (let i = 0; i < temporario.length; i++) {
      arr[inicio + i] = temporario[i];
      movimentacoes++;
    }
  }

  ordenar(0, arr.length - 1);

  return {
    vetor: arr,
    comparacoes: comparacoes,
    movimentacoes: movimentacoes
  };
}

function testarVetor(nome, vetor) {
  console.log(`\n[${nome}]`);

  const copia = [...vetor];
  const resultado = mergeSort(copia);

  console.log("Quantidade de elementos:", vetor.length);
  console.log("Quantidade de comparações:", resultado.comparacoes);
  console.log("Quantidade de movimentações:", resultado.movimentacoes);
}

console.log("\n========================================");
console.log("            TESTE - MERGE SORT");
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
