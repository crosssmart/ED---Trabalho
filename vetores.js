function embaralhar(vetor) {
  for (let i = vetor.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
  }

  return vetor;
}

function criarVetores(n) {
  const crescente = Array.from(
    { length: n },
    (_, i) => i + 1
  );

  const aleatorio = embaralhar([...crescente]);

  const decrescente = [...crescente].reverse();

  const parcialmenteOrdenado = [...crescente];

  // Aproximadamente 10% dos elementos envolvidos em trocas
  const trocas = Math.floor(n * 0.05);

  for (let i = 0; i < trocas; i++) {
    const posicao1 = Math.floor(Math.random() * n);
    let posicao2 = Math.floor(Math.random() * n);

    while (posicao1 === posicao2) {
      posicao2 = Math.floor(Math.random() * n);
    }

    [
      parcialmenteOrdenado[posicao1],
      parcialmenteOrdenado[posicao2]
    ] = [
        parcialmenteOrdenado[posicao2],
        parcialmenteOrdenado[posicao1]
      ];
  }

  return {
    aleatorio,
    crescente,
    decrescente,
    parcialmenteOrdenado
  };
}

// Criação dos vetores para cada tamanho
const vetores1000 = criarVetores(1000);
const vetores10000 = criarVetores(10000);
const vetores50000 = criarVetores(50000);
const vetores100000 = criarVetores(100000);

// Exportação para outros arquivos
module.exports = {
  vetores1000,
  vetores10000,
  vetores50000,
  vetores100000
};


// -------------------------








// function embaralhar(vetor) {
//   for (let i = vetor.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));

//     [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
//   }

//   return vetor;
// }

// // 1. Array aleatório (sem repetição)
// const aleatorio = embaralhar(
//   Array.from({ length: 1000 }, (_, i) => i + 1)
// );

// // 2. Array ordenado em ordem crescente
// const crescente = Array.from(
//   { length: 1000 },
//   (_, i) => i + 1
// );

// // 3. Array ordenado em ordem decrescente
// const decrescente = Array.from(
//   { length: 1000 },
//   (_, i) => 1000 - i
// );

// // 4. Array parcialmente ordenado
// const parcialmenteOrdenado = [...crescente];

// // Realiza 50 trocas aleatórias de posição
// // para desorganizar aproximadamente 10% dos elementos.
// for (let i = 0; i < 50; i++) {
//   const posicao1 = Math.floor(Math.random() * 1000);
//   let posicao2 = Math.floor(Math.random() * 1000);

//   while (posicao1 === posicao2) {
//     posicao2 = Math.floor(Math.random() * 1000);
//   }

//   [
//     parcialmenteOrdenado[posicao1],
//     parcialmenteOrdenado[posicao2]
//   ] = [
//       parcialmenteOrdenado[posicao2],
//       parcialmenteOrdenado[posicao1]
//     ];
// }

// // Exibição dos resultados
// // console.log("Aleatório:", aleatorio);
// // console.log("Crescente:", crescente);
// // console.log("Decrescente:", decrescente);
// // console.log("Parcialmente ordenado:", parcialmenteOrdenado);

// // Exportação para uso em outros arquivos JavaScript
// module.exports = {
//   aleatorio,
//   crescente,
//   decrescente,
//   parcialmenteOrdenado
// };


