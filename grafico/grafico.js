
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// ========================================
// CONFIGURAÇÕES
// ========================================

const caminhoExcel = path.join(
    __dirname,
    'grafico exel final.xlsx'
);

const caminhoHTML = path.join(
    __dirname,
    'graficos.html'
);

// Tamanhos permitidos
const tamanhos = [
    1000,
    10000,
    50000,
    100000
];

const labels = [
    '1.000',
    '10.000',
    '50.000',
    '100.000'
];

// Estilos para diferenciar os algoritmos
const estilos = [
    {
        cor: '#e63946',
        ponto: 'circle',
        tracejado: []
    },
    {
        cor: '#0077b6',
        ponto: 'rect',
        tracejado: [8, 4]
    },
    {
        cor: '#2a9d8f',
        ponto: 'triangle',
        tracejado: [3, 3]
    },
    {
        cor: '#f4a261',
        ponto: 'rectRot',
        tracejado: [10, 3, 2, 3]
    },
    {
        cor: '#8338ec',
        ponto: 'star',
        tracejado: [5, 2]
    },
    {
        cor: '#ff006e',
        ponto: 'crossRot',
        tracejado: [2, 2]
    }
];

// ========================================
// VERIFICAÇÃO DO ARQUIVO
// ========================================

if (!fs.existsSync(caminhoExcel)) {

    console.error(
        'Erro: planilha Excel não encontrada.'
    );

    console.error(
        'Verifique se está na mesma pasta do grafico.js.'
    );

    process.exit(1);
}

// ========================================
// LEITURA DO EXCEL
// ========================================

const workbook = XLSX.readFile(caminhoExcel);

const graficos = [];

// ========================================
// PROCESSAMENTO DAS ABAS
// ========================================

workbook.SheetNames.forEach(nomeAba => {

    const planilha = workbook.Sheets[nomeAba];

    const linhas = XLSX.utils.sheet_to_json(
        planilha,
        {
            header: 1,
            defval: null
        }
    );

    let vetorAtual = null;
    let cabecalho = null;

    linhas.forEach(linha => {

        const primeiraColuna = linha[0];

        // Identifica os vetores
        if (
            typeof primeiraColuna === 'string' &&
            primeiraColuna.trim().startsWith('Vetor')
        ) {

            vetorAtual = primeiraColuna.trim();

            cabecalho = null;

            return;
        }

        // Identifica o cabeçalho
        if (
            vetorAtual &&
            typeof primeiraColuna === 'string' &&
            primeiraColuna.trim() === 'Tamanho N'
        ) {

            cabecalho = linha;

            return;
        }

        // Ignora linhas inválidas
        if (!vetorAtual || !cabecalho) {
            return;
        }

        const tamanhoN = Number(primeiraColuna);

        // Mantém somente os tamanhos solicitados
        if (!tamanhos.includes(tamanhoN)) {
            return;
        }

        // Percorre os algoritmos
        for (let i = 1; i < cabecalho.length; i++) {

            const algoritmo = cabecalho[i];

            const operacoes = linha[i];

            if (
                !algoritmo ||
                typeof operacoes !== 'number' ||
                !Number.isFinite(operacoes)
            ) {
                continue;
            }

            // Procura o gráfico
            let grafico = graficos.find(item =>
                item.aba === nomeAba &&
                item.vetor === vetorAtual
            );

            // Cria o gráfico
            if (!grafico) {

                grafico = {
                    aba: nomeAba,
                    vetor: vetorAtual,
                    algoritmos: {}
                };

                graficos.push(grafico);
            }

            // Cria o algoritmo
            if (!grafico.algoritmos[algoritmo]) {

                grafico.algoritmos[algoritmo] = {};
            }

            // Armazena as operações
            grafico.algoritmos[algoritmo][tamanhoN] =
                operacoes;
        }
    });
});

// ========================================
// VERIFICA SE EXISTEM DADOS
// ========================================

if (graficos.length === 0) {

    console.error(
        'Nenhum dado foi encontrado na planilha.'
    );

    process.exit(1);
}

// ========================================
// MONTA AS CONFIGURAÇÕES DOS GRÁFICOS
// ========================================

const configuracoes = graficos.map(
    (grafico, indice) => {

        const datasets = Object.entries(
            grafico.algoritmos
        ).map(([algoritmo, resultados], index) => {

            const estilo = estilos[
                index % estilos.length
            ];

            // Organiza os resultados na ordem dos tamanhos
            const valores = tamanhos.map(
                tamanhoN => {

                    const valor = resultados[tamanhoN];

                    return valor !== undefined
                        ? valor
                        : null;
                }
            );

            return {

                label: algoritmo,

                data: valores,

                borderColor: estilo.cor,

                backgroundColor: estilo.cor,

                borderWidth: 2,

                borderDash: estilo.tracejado,

                fill: false,

                tension: 0,

                pointStyle: estilo.ponto,

                pointRadius: 4,

                pointHoverRadius: 7,

                pointBorderWidth: 2,

                pointBackgroundColor: '#ffffff',

                pointBorderColor: estilo.cor,

                spanGaps: false
            };
        });

        return {

            id: `grafico${indice}`,

            titulo: `${grafico.aba} - ${grafico.vetor}`,

            datasets: datasets
        };
    }
);

// ========================================
// MONTA OS ELEMENTOS HTML DOS GRÁFICOS
// ========================================

const elementosGraficos = configuracoes.map(
    grafico => {

        return `
            <section class="grafico-container">

                <h2>${grafico.titulo}</h2>

                <div class="area-grafico">

                    <canvas id="${grafico.id}"></canvas>

                </div>

            </section>
        `;
    }
).join('\n');

// ========================================
// HTML FINAL
// ========================================

const html = `

<!DOCTYPE html>

<html lang="pt-br">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Gráficos dos Algoritmos</title>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <style>

        * {
            box-sizing: border-box;
        }

        body {

            font-family: Arial, sans-serif;

            background: #f4f4f4;

            margin: 0;

            padding: 20px;
        }

        h1 {

            text-align: center;

            font-size: 25px;

            margin-bottom: 25px;
        }

        h2 {

            text-align: center;

            font-size: 16px;

            min-height: 38px;

            margin: 0 0 10px 0;
        }

        /* Organiza os gráficos em duas colunas */
        .painel-graficos {

            display: grid;

            grid-template-columns:
                repeat(2, minmax(0, 1fr));

            gap: 18px;

            max-width: 1400px;

            margin: 0 auto;
        }

        /* Cada gráfico tem tamanho controlado */
        .grafico-container {

            background: white;

            padding: 15px;

            border-radius: 8px;

            box-shadow:
                0 2px 5px rgba(0, 0, 0, 0.08);

            min-width: 0;
        }

        /* Controla a altura dos gráficos */
        .area-grafico {

            position: relative;

            width: 100%;

            height: 280px;
        }

        canvas {

            display: block;

            width: 100%;

            height: 100%;
        }

        /* Em telas menores, usa apenas uma coluna */
        @media (max-width: 800px) {

            .painel-graficos {

                grid-template-columns: 1fr;
            }

            .area-grafico {

                height: 260px;
            }

        }

    </style>

</head>

<body>

    <h1>Análise dos Algoritmos de Ordenação</h1>

    <main class="painel-graficos">

        ${elementosGraficos}

    </main>

    <script>

        // Configurações geradas pelo JavaScript
        const configuracoes = ${JSON.stringify(configuracoes)};

        // Tamanhos do eixo X
        const tamanhos = ${JSON.stringify(labels)};

        // Cria todos os gráficos
        configuracoes.forEach(grafico => {

            const canvas = document.getElementById(
                grafico.id
            );

            new Chart(canvas, {

                type: 'line',

                data: {

                    labels: tamanhos,

                    datasets: grafico.datasets

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    animation: false,

                    interaction: {

                        intersect: false,

                        mode: 'nearest'

                    },

                    plugins: {

                        legend: {

                            position: 'bottom',

                            labels: {

                                usePointStyle: true,

                                boxWidth: 10,

                                padding: 12,

                                font: {

                                    size: 10

                                }

                            }
                        },

                        tooltip: {

                            callbacks: {

                                label: function(context) {

                                    const algoritmo =
                                        context.dataset.label;

                                    const valor =
                                        context.parsed.y;

                                    return algoritmo + ': ' +
                                        valor.toLocaleString('pt-BR');
                                }
                            }
                        }
                    },

                    scales: {

                        // Eixo X
                        x: {

                            type: 'category',

                            offset: false,

                            title: {

                                display: true,

                                text: 'Tamanho N',

                                font: {

                                    size: 11,

                                    weight: 'bold'

                                }
                            },

                            ticks: {

                                autoSkip: false,

                                maxRotation: 0,

                                minRotation: 0,

                                font: {

                                    size: 10

                                }
                            },

                            grid: {

                                display: true,

                                color: 'rgba(0, 0, 0, 0.08)'

                            }
                        },

                        // Eixo Y
                        y: {

                            type: 'linear',

                            beginAtZero: true,

                            title: {

                                display: true,

                                text: 'Número de Operações',

                                font: {

                                    size: 11,

                                    weight: 'bold'

                                }
                            },

                            ticks: {

                                maxTicksLimit: 6,

                                precision: 0,

                                callback: function(value) {

                                    return value.toLocaleString(
                                        'pt-BR'
                                    );
                                },

                                font: {

                                    size: 10

                                }
                            },

                            grid: {

                                color: 'rgba(0, 0, 0, 0.10)',

                                lineWidth: 1

                            }
                        }
                    }
                }
            });
        });

    </script>

</body>

</html>
`;

// ========================================
// SALVA O HTML
// ========================================

fs.writeFileSync(
    caminhoHTML,
    html,
    'utf8'
);

// ========================================
// MENSAGEM FINAL
// ========================================

console.log('Gráficos gerados com sucesso!');

console.log(
    `Quantidade de gráficos: ${graficos.length}`
);

console.log(
    `Arquivo gerado: ${caminhoHTML}`
);
