const fs = require('fs');
const PDFParser = require("pdf-parse");

const extrairDados = {
    extrair_diario: async (caminho_pdf, palavras, regexp, bandeira, separador_padrao) => {
        try {
            const pdfBuffer = fs.readFileSync(caminho_pdf);
            const data = await PDFParser(pdfBuffer);
            const pdfText = data.text;

            let palavras_encontradas = {};

            // Para cada palavra a ser encontrada
            palavras.forEach((palavra) => {
                // Crie uma expressão regular para encontrar a palavra e o texto que a segue
                const regex = new RegExp(`${palavra}${regexp}`, bandeira); // TODO: generalizar a regex para aceitar qualquer regra de extração

                // Encontre todas as correspondências e capture o texto que segue a palavra
                const matches = pdfText.match(regex);

                const palavras_capturadas = matches
                    // Se houver palavras capturadas, separe o texto do resto da correspondência
                    ? matches.map((match) => match.split(separador_padrao)[1].trim()) 
                    // Se não, retorne um array vazio
                    : [];

                    // Adicione a palavra e os textos capturados ao objeto de palavras encontradas
                palavras_encontradas[palavra] = palavras_capturadas;
            });
        return palavras_encontradas; // Retorne o objeto com as palavras encontradas
        } catch (error) {
            return error;
        }
    },

    extrair_docentes: async(caminho_pdf) => {
        try{
            const pdfBuffer = fs.readFileSync(caminho_pdf);
            const data = await PDFParser(pdfBuffer);
            const pdfText = data.text;

            // Crie uma expressão regular para encontrar o texto que segue a palavra
            const regex = new RegExp(/[A-Z\s]+(?=\s-\s*(\d+h))/);

            // Encontre todas as correspondências e capture o texto que segue a palavra
            const matches = pdfText.match(regex);

            return matches; // Retorne o array com os textos capturados
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = extrairDados;
