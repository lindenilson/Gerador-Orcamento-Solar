const inversores = {
    Deye: [
         { kw: 3, kwpMax: 4.5 },
         { kw: 4, kwpMax: 6 },
         { kw: 5, kwpMax: 7.5 },
         { kw: 6, kwpMax: 9 },
         { kw: 8, kwpMax: 12 },
         { kw: 10, kwpMax: 15 },
         { kw: 12, kwpMax: 18 },
         { kw: 15, kwpMax: 22.5 },
         { kw: 18, kwpMax: 23.4 },
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
         { kw: 3, kwpMax: 4.2 },
         { kw: 5, kwpMax: 7.5 },
         { kw: 6, kwpMax: 9 },
         { kw: 8, kwpMax: 11.2 },
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
         { kw: 3, kwpMax: 4.5 },
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
 
     ],
     Solis: [
         { kw: 3, kwpMax: 5.1 },
         { kw: 4, kwpMax: 6.8 },
         { kw: 5, kwpMax: 8.5 },
         { kw: 6, kwpMax: 10.2 },
         { kw: 7, kwpMax: 11.9 },
         { kw: 8, kwpMax: 13.6 },
         { kw: 9, kwpMax: 15.3 },
         { kw: 10, kwpMax: 17 },
         { kw: 12, kwpMax: 18 },
         { kw: 13, kwpMax: 19.5 },
         { kw: 15, kwpMax: 22.5 },
         { kw: 17, kwpMax: 25.5 },
         { kw: 20, kwpMax: 30 },
         { kw: 25, kwpMax: 37.5 },
         { kw: 30, kwpMax: 45 },
         { kw: 33, kwpMax: 49.5 },
         { kw: 36, kwpMax: 54 },
         { kw: 37.5, kwpMax: 63.8 },
         { kw: 40, kwpMax: 68 },
         { kw: 50, kwpMax: 75 },
         { kw: 60, kwpMax: 90 },
         { kw: 70, kwpMax: 105 },
         { kw: 75, kwpMax: 126 },
         { kw: 80, kwpMax: 126 },
         { kw: 100, kwpMax: 150 },
         { kw: 110, kwpMax: 165 },
     ]
 };

// Função para calcular o número máximo e mínimo de painéis
function calcularPaineis(kwpMax, potenciaPainel) {
    const maxPaineis = Math.floor(kwpMax / (potenciaPainel / 1000));
    const minPaineis = Math.floor((kwpMax * 0.45) / (potenciaPainel / 1000));
    return { maxPaineis, minPaineis };
}

// Função para atualizar a tabela de inversores
function atualizarTabela() {
    const marcaSelecionada = document.getElementById("marca").value;
    const potenciaPainel = parseFloat(document.getElementById("potenciaPainel").value);
    const tabelaBody = document.querySelector("#tabelaInversores tbody");
    tabelaBody.innerHTML = ""; // Limpa a tabela

    const inversoresSelecionados = inversores[marcaSelecionada];

    inversoresSelecionados.forEach(inversor => {
        const { maxPaineis, minPaineis } = calcularPaineis(inversor.kwpMax, potenciaPainel);

        const linha = `
            <tr>
                <td>${inversor.kw} kW</td>
                <td>${inversor.kwpMax} kWp</td>
                <td>${maxPaineis}</td>
                <td>${minPaineis}</td>
            </tr>
        `;
        tabelaBody.innerHTML += linha;
    });
}

// Inicializa a tabela com os valores padrão
window.onload = atualizarTabela;