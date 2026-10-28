//último elemento como pivô

const {
  vetores1000,
  vetores10000,
  vetores50000,
  vetores100000
} = require("../vetores");

function quickSort(arr) {
  let comparacoes = 0;
  let movimentacoes = 0;

  function trocar(i, j) {
    if (i !== j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      movimentacoes++;
    }
  }

  function particionar(inicio, fim) {
    let pivo = arr[fim];
    let i = inicio - 1;

    for (let j = inicio; j < fim; j++) {
      comparacoes++;

      if (arr[j] <= pivo) {
        i++;
        trocar(i, j);
      }
    }

    trocar(i + 1, fim);

    return i + 1;
  }

  // Guarda as partes do vetor que ainda precisam ser ordenadas.
  let pilha = [[0, arr.length - 1]];

  while (pilha.length > 0) {
    let [inicio, fim] = pilha.pop();

    if (inicio < fim) {
      let indicePivo = particionar(inicio, fim);

      // Adiciona as duas partes que precisam ser ordenadas.
      if (indicePivo - 1 > inicio) {
        pilha.push([inicio, indicePivo - 1]);
      }

      if (indicePivo + 1 < fim) {
        pilha.push([indicePivo + 1, fim]);
      }
    }
  }

  return {
    vetor: arr,
    comparacoes,
    movimentacoes
  };
}

function quickSort(arr) {
  let comparacoes = 0;
  let movimentacoes = 0;

  function trocar(i, j) {
    if (i !== j) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      movimentacoes++;
    }
  }

  function particionar(inicio, fim) {
    let pivo = arr[fim];
    let i = inicio - 1;

    for (let j = inicio; j < fim; j++) {
      comparacoes++;

      if (arr[j] <= pivo) {
        i++;
        trocar(i, j);
      }
    }

    trocar(i + 1, fim);

    return i + 1;
  }

  // Guarda as partes do vetor que ainda precisam ser ordenadas.
  let pilha = [[0, arr.length - 1]];

  while (pilha.length > 0) {
    let [inicio, fim] = pilha.pop();

    if (inicio < fim) {
      let indicePivo = particionar(inicio, fim);

      // Adiciona as duas partes que precisam ser ordenadas.
      if (indicePivo - 1 > inicio) {
        pilha.push([inicio, indicePivo - 1]);
      }

      if (indicePivo + 1 < fim) {
        pilha.push([indicePivo + 1, fim]);
      }
    }
  }

  return {
    vetor: arr,
    comparacoes,
    movimentacoes
  };
}


function testarVetor(nome, vetor) {
  console.log(`\n[${nome}]`);

  const copia = [...vetor];
  const resultado = quickSort(copia);

  console.log("Quantidade de elementos:", vetor.length);
  console.log("Pivô utilizado: último elemento");
  console.log("Quantidade de comparações:", resultado.comparacoes);
  console.log("Quantidade de movimentações:", resultado.movimentacoes);
}

console.log("\n========================================");
console.log("            TESTE - QUICK SORT");
console.log("========================================");

console.log("Pivô escolhido: último elemento");

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

// Atenção: o último elemento como pivô pode causar recursão excessiva.
// Comece pelos testes menores antes de executar este tamanho.

testarVetor("1 - VETOR ALEATÓRIO", vetores100000.aleatorio);
testarVetor("2 - VETOR CRESCENTE", vetores100000.crescente);
testarVetor("3 - VETOR DECRESCENTE", vetores100000.decrescente);
testarVetor("4 - VETOR PARCIALMENTE ORDENADO", vetores100000.parcialmenteOrdenado);

console.log("\n========================================");
console.log("             FIM DOS TESTES");
console.log("========================================\n");
