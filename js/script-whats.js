const inversores = {
    Deye: [
        { kw: 1, kwpMax: 1.3 },
        { kw: 1.5, kwpMax: 2 },
        { kw: 2, kwpMax: 2.6 },
        { kw: 2.25, kwpMax: 2.80 },
        { kw: 2.5, kwpMax: 3.3 },
        { kw: 3, kwpMax: 3.9 },
        { kw: 3.6, kwpMax: 4.7 },
        { kw: 4, kwpMax: 5.2 },
        { kw: 4.6, kwpMax: 5.98 },
        { kw: 5, kwpMax: 6.5 },
        { kw: 6, kwpMax: 7.8 },
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
        { kw: 110, kwpMax: 150 }

    ],
    Growatt: [
        { kw: 1, kwpMax: 1.4 },
        { kw: 1.5, kwpMax: 2.1 },
        { kw: 2, kwpMax: 2.8 },
        { kw: 2.5, kwpMax: 3.5 },
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
        { kw: 75, kwpMax: 112.4 }

    ],
    Saj: [
        { kw: 0.7, kwpMax: 1.05 },
        { kw: 1, kwpMax: 1.5 },
        { kw: 1.5, kwpMax: 2.25 },
        { kw: 2, kwpMax: 3 },
        { kw: 2.5, kwpMax: 3.25 },
        { kw: 3, kwpMax: 4.5 },
        { kw: 3.6, kwpMax: 5.4 },
        { kw: 4, kwpMax: 6 },
        { kw: 5, kwpMax: 7.5 },
        { kw: 6, kwpMax: 9 },
        { kw: 7, kwpMax: 10.5 },
        { kw: 8, kwpMax: 12 },
        { kw: 9, kwpMax: 13.5 },
        { kw: 10, kwpMax: 15 },
        { kw: 12, kwpMax: 18 },
        { kw: 13, kwpMax: 19.5 },
        { kw: 15, kwpMax: 22.5 },
        { kw: 17, kwpMax: 25.5 },
        { kw: 20, kwpMax: 30 },
        { kw: 25, kwpMax: 37.5 },
        { kw: 30, kwpMax: 40 },
        { kw: 33, kwpMax: 40 },
        { kw: 40, kwpMax: 60 },
        { kw: 50, kwpMax: 65 },
        { kw: 60, kwpMax: 78 },

    ]
};

function calcularCapacidadePainel(inversorKw, potenciaPaineis) {
    const marcaInversor = document.getElementById('marcaInversor').value;
    const kw = parseFloat(inversorKw); // Certifique-se de converter para número
    const inversor = inversores[marcaInversor]?.find(i => i.kw === kw);

    if (!inversor) {
        console.error('Inversor não encontrado!');
        return 0; // Retorna 0 se o inversor não for encontrado
    }

    // Cálculo da capacidade máxima de painéis, arredondando para baixo
    return Math.floor((inversor.kwpMax / potenciaPaineis) * 1000);
}

function calcularGeracaoMaxima(capacidadeMaximaPaineis, potenciaPaineis) {
    const geracaoMaxima = Math.floor((capacidadeMaximaPaineis * potenciaPaineis) / 1000 * 140);

    // Arredondar para o múltiplo de 50 mais próximo
    return arredondarParaMaisProximo(geracaoMaxima, 50);
}

function arredondarParaMaisProximo(valor, multiplo) {
    return Math.round(valor / multiplo) * multiplo;
}

function enviarWhatsApp() {

    // Coloque aqui o código para enviar a mensagem via WhatsApp
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const paineis = document.getElementById('paineis').value;
    const potenciaPaineis = document.getElementById('potenciaPaineis').value;
    const inversor = document.getElementById('inversor').value;
    const tipoInversor = document.getElementById('tipoInversor').value;
    const estrutura = document.getElementById('estrutura').value;
    const custo = document.getElementById('custo').value;
    const entrada = document.getElementById('entrada').value;
    const parcelas = document.getElementById('parcelas').value;
    const taxa = document.getElementById('taxa').value;
    const observacao = document.getElementById('observacao').value;

    const valorAVista = parseFloat(custo) + parseFloat(entrada);
    const capacidadeMaximaPaineis = calcularCapacidadePainel(inversor, potenciaPaineis);
    const geracaoMaxima = calcularGeracaoMaxima(capacidadeMaximaPaineis, potenciaPaineis);
    const geracao = arredondarParaMaisProximo(((paineis * potenciaPaineis) / 1000) * 140, 50); //geração com painéis digitados
    const valorParcela = taxa / parcelas; //valor parcelado

    //SCRIPT TEXTO WHATASAPP
    const mensagem = `*☀️SISTEMA PROPOSTO☀️*

01. 
- *Nome:* ${nome}
- *Endereço:* ${endereco}

📈 *Geração proposta:* ${geracao} kWh 

✅ ${paineis} painéis de ${potenciaPaineis}W
✅ 1 inversor de ${inversor}KW ${tipoInversor}
✅ Estrutura: ${estrutura}
✅ Cabos
✅ Projeto
✅ ART
✅ Instalação
✅ Homologação

*Observações:* ${observacao}

*FORMA DE PAGAMENTO:*
*💰 À vista:* ${formatarParaReais(valorAVista)}

*💳 Cartão:*
Entrada de ${formatarParaReais(entrada)}
Restante em ${parcelas}x de ${formatarParaReais(valorParcela.toFixed(2))}

Inversor com capacidade para *${capacidadeMaximaPaineis} painéis de ${potenciaPaineis}W/${geracaoMaxima} kwh.*

⚠ ATENÇÃO!
Por que escolher a IrriSol?
🔗 Somos única empresa que oferece garantia estendida*;
🚿 Limpeza dos Painéis.`;
    const numeroWhatsApp = document.getElementById('numeroWhatsApp').value;

    if (numeroWhatsApp) {
        const url = `https://web.whatsapp.com/send?phone=55${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    }
}
