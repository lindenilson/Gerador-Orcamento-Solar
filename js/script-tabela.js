//INICIO FORMULA NUMEROS POSTIVOS
function validarPositivo(input) {
    if (input.value < 0) {
        input.value = 0;
    }
}
//FIM FORMULA NUMEROS POSTIVOS

//INICIO FUNÇÃO DE CALCULAR QUANTIDADE MAXIMA DO INVERSOR
function calcularCapacidadePainel(inversorKw, potenciaPaineis) {
    const fator1 = 180;
    const fator2 = 140;

    // Aplicando a fórmula: inversorKw * 180 / 140 / potenciaPaineis * 1000
    const capacidadePainel = Math.floor((inversorKw * fator1 / fator2) / potenciaPaineis * 1000);
    return capacidadePainel;
}
//FIM FUNÇÃO DE CALCULAR QUANTIDADE MAXIMA DO INVERSOR

//INICIO FUNÇÃO DE CALCULAR GERAÇÃO MAXIMA DO INVERSOR
function calcularGeracaoMaxima(quantidadePaineis, potenciaPaineis) {
    const fator2 = 140; // Fator de eficiência (ajustável)

    const potenciaTotalW = arredondarParaMaisProximo((quantidadePaineis * potenciaPaineis / 1000) * fator2, 50);
    return potenciaTotalW;
}
//FIM FUNÇÃO DE CALCULAR GERAÇÃO MAXIMA DO INVERSOR


//INICIO FUNÇÃO ARREDONDAR PARA MENOS
function arredondarParaMenosProximo(valor, multiplo) {
    return Math.floor(valor / multiplo) * multiplo;
}
//FIM FUNÇÃO ARREDONDAR PARA MENOS

//INICIO FORMATAÇÃO VALOR EM REAIS
function formatarParaReais(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}
//FIM FORMATAÇÃO VALOR EM REAIS

function arredondarParaMaisProximo(valor, multiplo) {
    return Math.floor(valor / multiplo) * multiplo;
}

//FUNÇÃO VALIDAR CAMPOS INPUT E SELECT
function validateFields() {
    let isValid = true;
    const requiredFields = document.querySelectorAll('input[required], select[required]');

    requiredFields.forEach(field => {
        const errorMessage = field.nextElementSibling;
        if (!field.value || field.value === 'selecione') {
            field.classList.add('error');
            errorMessage.style.display = 'inline';
            isValid = false;
        } else {
            field.classList.remove('error');
            errorMessage.style.display = 'none';
        }
    });

    attachValidationEvents(); // Adiciona eventos de validação após a validação inicial

    return isValid;
}

function attachValidationEvents() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');

    requiredFields.forEach(field => {
        field.addEventListener('input', () => {
            if (field.value && field.value !== 'selecione') {
                field.classList.remove('error');
                field.nextElementSibling.style.display = 'none';
            }
        });

        field.addEventListener('change', () => {
            if (field.value && field.value !== 'selecione') {
                field.classList.remove('error');
                field.nextElementSibling.style.display = 'none';
            }
        });
    });
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

//INICIO CONFIGURAÇÃO SEÇÃO TABELA


function arredondarParaMenos(valor) {
    return Math.floor(valor);
}

function arredondarParaMais(valor) {
    return Math.ceil(valor);
}

function calcularCapacidadeMinPainel(kwpMax, potenciaPainel) {
    // Aplicando a fórmula: kwp max * 0,35 / potenciaPainel * 1000
    const capacidadePainel2 = arredondarParaMais((kwpMax * 0.35 / potenciaPainel) * 1000);
    return capacidadePainel2;
}

function calcularCapacidadePainel2(kwpMax, potenciaPainel) {
    // Aplicando a fórmula: kwpMax / potenciaPainel * 1000
    const capacidadePainel2 = arredondarParaMenos(kwpMax * 1000 / potenciaPainel);
    return capacidadePainel2;
}

function calcularGeracaoMaxima2(capacidadeMaximaPaineis, potenciaPainel) {
    const fator2 = 140; // Fator de eficiência (ajustável)

    const potenciaTotalW = arredondarParaMenosProximo((capacidadeMaximaPaineis * potenciaPainel / 1000) * fator2, 50);
    return potenciaTotalW;
}

function atualizarTabela() {
    const potenciaPainel = parseFloat(document.getElementById('potenciaPainel').value);

    const inversores = [
        { kw: 3, kwpMax: 3.9 },
        { kw: 4, kwpMax: 5.2 },
        { kw: 5, kwpMax: 6.5 },
        { kw: 8, kwpMax: 10.4 },
        { kw: 10, kwpMax: 13 },
        { kw: 12, kwpMax: 15.6 },
        { kw: 15, kwpMax: 19.5 },
        { kw: 18, kwpMax: 21.6 },
        { kw: 20, kwpMax: 26 },
        { kw: 25, kwpMax: 32.5 },
        { kw: 30, kwpMax: 39 },
        { kw: 35, kwpMax: 45.5 },
        { kw: 40, kwpMax: 52 },
        { kw: 45, kwpMax: 58.5 },
        { kw: 50, kwpMax: 65 },
        { kw: 60, kwpMax: 78 },
        { kw: 70, kwpMax: 91 },
        { kw: 75, kwpMax: 97.5 },
        { kw: 80, kwpMax: 104 },
        { kw: 90, kwpMax: 135 },
        { kw: 100, kwpMax: 150 },
        { kw: 110, kwpMax: 150 },

        // Adicione mais inversores conforme necessário
    ];

    inversores.forEach(inversor => {
        const capacidadeMinimaPaineis = calcularCapacidadeMinPainel(inversor.kwpMax, potenciaPainel);
        const capacidadeMaximaPaineis = calcularCapacidadePainel2(inversor.kwpMax, potenciaPainel);
        const geracaoMaxima2 = calcularGeracaoMaxima2(capacidadeMaximaPaineis, potenciaPainel);

        document.getElementById(`minPaineis${inversor.kw}`).innerText = capacidadeMinimaPaineis;
        document.getElementById(`paineis${inversor.kw}`).innerText = capacidadeMaximaPaineis;
        document.getElementById(`geracao${inversor.kw}`).innerText = geracaoMaxima2;
    });
}

// Inicialize a tabela com valores padrão
atualizarTabela();


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

//INICIO CONFIGURAÇÃO SEÇÃO TABELA


function arredondarParaMenos(valor) {
    return Math.floor(valor);
}

function arredondarParaMais(valor) {
    return Math.ceil(valor);
}

function calcularCapacidadeMinPainelGrowatt(kwpMax, potenciaPainel) {
    // Aplicando a fórmula: kwp max * 0,35 / potenciaPainel * 1000
    const capacidadePainel2 = arredondarParaMais((kwpMax * 0.35 / potenciaPainel) * 1000);
    return capacidadePainel2;
}

function calcularCapacidadePainelGrowatt(kwpMax, potenciaPainel) {
    // Aplicando a fórmula: kwpMax / potenciaPainel * 1000
    const capacidadePainel2 = arredondarParaMenos(kwpMax * 1000 / potenciaPainel);
    return capacidadePainel2;
}

function calcularGeracaoMaximaGrowatt(capacidadeMaximaPaineis, potenciaPainel) {
    const fator2 = 140; // Fator de eficiência (ajustável)

    const potenciaTotalW = arredondarParaMenosProximo((capacidadeMaximaPaineis * potenciaPainel / 1000) * fator2, 50);
    return potenciaTotalW;
}

function atualizarTabelaGrowatt() {
    const potenciaPainel = parseFloat(document.getElementById('potenciaPainelGrowatt').value);

    const inversores = [
        { kw: 3, kwpMax: 4.2 },
        { kw: 5, kwpMax: 7 },
        { kw: 6, kwpMax: 8.1 },
        { kw: 8, kwpMax: 10.5 },
        { kw: 10, kwpMax: 15 },
        { kw: 15, kwpMax: 22.5 },
        { kw: 20, kwpMax: 30 },
        { kw: 25, kwpMax: 37.5 },
        { kw: 30, kwpMax: 45 },
        { kw: 40, kwpMax: 60 },
        { kw: 50, kwpMax: 75 },
        { kw: 60, kwpMax: 90 },
        { kw: 75, kwpMax: 112.4 },

        // Adicione mais inversores conforme necessário
    ];

    inversores.forEach(inversor => {
        const capacidadeMinimaPaineis = calcularCapacidadeMinPainelGrowatt(inversor.kwpMax, potenciaPainel);
        const capacidadeMaximaPaineis = calcularCapacidadePainelGrowatt(inversor.kwpMax, potenciaPainel);
        const geracaoMaxima2 = calcularGeracaoMaximaGrowatt(capacidadeMaximaPaineis, potenciaPainel);

        document.getElementById(`minPaineisGrowatt${inversor.kw}`).innerText = capacidadeMinimaPaineis;
        document.getElementById(`paineisGrowatt${inversor.kw}`).innerText = capacidadeMaximaPaineis;
        document.getElementById(`geracaoGrowatt${inversor.kw}`).innerText = geracaoMaxima2;
    });
}

// Inicialize a tabela com valores padrão
atualizarTabelaGrowatt();
