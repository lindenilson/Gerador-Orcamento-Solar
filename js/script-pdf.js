//INICIO FORMULA NUMEROS POSTIVOS
function validarPositivo(input) {
    if (input.value < 0) {
        input.value = 0;
    }
}

function calcularCapacidadePainelPDF(inversorKw, potenciaPaineis) {
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

function calcularGeracaoMaximaPDF(capacidadeMaximaPaineis, potenciaPaineis) {
    const geracaoMaxima = Math.floor((capacidadeMaximaPaineis * potenciaPaineis) / 1000 * 140);

    // Arredondar para o múltiplo de 50 mais próximo
    return arredondarParaMaisProximo(geracaoMaxima, 50);
}

function arredondarParaMaisProximo(valor, multiplo) {
    return Math.round(valor / multiplo) * multiplo;
}


//FIM FUNÇÃO ARREDONDAR PARA MENOS

//INICIO FORMATAÇÃO VALOR EM REAIS
function formatarParaReais(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}
//FIM FORMATAÇÃO VALOR EM REAIS


// BOTÃO GERAR ORÇAMENTO EM PDF
function generatePDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

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
    const marcaInversor = document.getElementById('marcaInversor').value;


    const valorAVista = parseFloat(custo) + parseFloat(entrada);
    const valorParcela = taxa / parcelas; //valor parcelado
    const capacidadeMaximaPaineis = calcularCapacidadePainelPDF(inversor, potenciaPaineis, marcaInversor);
    const geracaoMaxima = calcularGeracaoMaximaPDF(capacidadeMaximaPaineis, potenciaPaineis);
    const geracao = arredondarParaMaisProximo(((paineis * potenciaPaineis) / 1000) * 140, 50);


    // Adicionar foto de fundo
    const background = new Image();
    background.src = './img/background.png'; // Caminho para a sua imagem de fundo

    background.onload = function () {
        // Adicionar a imagem no PDF
        doc.addImage(background, 'PNG', 0, 0, 210, 297); // Ajuste conforme necessário

        // Adicionar negrito para o título
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("PROPOSTA COMERCIAL", 105, 25, { align: 'center' });

        // Configurações para texto normal
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`Cliente: `, 20, 35);
        doc.setFont("helvetica", "normal");
        doc.text(`${nome}`, 38, 35);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`Endereço: `, 20, 40);
        doc.setFont("helvetica", "normal");
        doc.text(`${endereco}`, 43, 40);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("RESUMO - PROPOSTA", 105, 60, { align: 'center' });

        // Ajustar espaçamento entre linhas
        doc.setLineHeightFactor(1.2);


        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`O sistema proposto possui potência de ${potenciaPaineis * paineis / 1000} kWp, que, considerando um fator típico de perdas (posicionamento, temperatura, sombreamento e sujeira), permitirá a produção média estimada de ${geracao} KWh por mês. O inversor selecionado possui capacidade de gerar ${geracaoMaxima} KWh com o acréscimo de painéis no futuro.`, 20, 70, { align: 'justify', maxWidth: 170 });

        // Adicionando retângulo
        doc.rect(19, 98, 170, 7); // x, y, largura, altura
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("PROPOSTA COMERCIAL", 20, 103);

        // Adicionando retângulo
        doc.rect(19, 105, 170, 45); // x, y, largura, altura
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`- ${paineis} Painel Solar Fotovoltaico ${potenciaPaineis} Wp;`, 20, 110);
        doc.text(`- 1 Inversor Solar ${inversor} kW ${tipoInversor} ${marcaInversor};`, 20, 115);
        doc.text(`- Estrutura ${estrutura};`, 20, 120);
        doc.text(`- Cabos;`, 20, 125);
        doc.text(`- Projeto;`, 20, 130);
        doc.text(`- ART;`, 20, 135);
        doc.text(`- Instalação;`, 20, 140);
        doc.text(`- Homologação;`, 20, 145);

        //TEXTO ALTERNATIVO - CASO QUEIRA ADICIONAR NO PDF
        //doc.setFont("helvetica", "bold");
        //doc.setFontSize(12);
        //doc.text(`* A marca e a potência dos equipamentos selecionados poderão variar de acordo com a disponibilidade do estoque, mantendo a qualidade e a geração média mensal igual ou superior às descritas nesta proposta.`, 20, 155, {align: 'justify', maxWidth: 170 });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`Observações: ${observacao}`, 20, 155, { align: 'justify', maxWidth: 170 });

        // Verificar se a página está cheia
        if (doc.internal.getCurrentPageInfo().pageNumber > 1) {
            doc.addPage();
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`CONDIÇÃO DE PAGAMENTO`, 20, 187);
        doc.setFont("helvetica", "bold");
        doc.text(`À Vista:`, 20, 195);
        doc.text(`Parcelado:`, 20, 200);
        doc.text(`Financiamento:`, 20, 205);
        doc.setFont("helvetica", "normal");
        doc.text(`${formatarParaReais(valorAVista)} Entrada de 75% e 25% após a instalação.`, 37, 195);
        doc.text(`Entrada de ${formatarParaReais(entrada)}, restante em ${parcelas}x de ${formatarParaReais(valorParcela.toFixed(2))} no cartão.`, 43, 200);
        doc.text(`Enviar documentação para simulação.`, 52, 205);


        // Verificar se a página está cheia
        if (doc.internal.getCurrentPageInfo().pageNumber > 1) {
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, 0, 210, 297); // Adiciona a imagem de fundo na nova página
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`VALIDADE DA PROPOSTA: 1 dia`, 20, 220);
        doc.setFont("helvetica", "normal");
        doc.text(`Candiba, ${new Date().toLocaleDateString()}.`, 20, 225);
        doc.text(`_________________________________`, 20, 235);
        doc.text(`${nome}`, 60, 240, { align: 'center', maxWidth: 60 });

        doc.text(`_________________________________`, 110, 235);
        doc.text(`Susilane Santana Dias Gonçalves`, 120, 240);
        doc.text(`IrriSol - Irrigação e Energia Solar`, 121, 245);
        doc.text(`CNPJ 33.476.074/0001-58`, 128, 250);

        doc.save(`orçamento_${nome}.pdf`);
    };
}

