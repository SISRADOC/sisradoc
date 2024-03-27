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
    },

    extrair_projetos: async (caminho_pdf, palavras, regexp, bandeira, separador_padrao) => {
        try {
            const pdfBuffer = fs.readFileSync(caminho_pdf);
            const data = await PDFParser(pdfBuffer);
            const pdfText = data.text;

            let palavras_encontradas = {};

            palavras.forEach((palavra) => {
                const regex = new RegExp(`${palavra}${regexp}`, bandeira);
                const matches = pdfText.match(regex);

                const palavras_capturadas = matches ? matches.map((match) => match.split(separador_padrao)[1].trim()) : [];
                palavras_encontradas[palavra] = palavras_capturadas;
            });

            return palavras_encontradas;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    extrair_avaliacao_discente: async (caminho_pdf, palavras) => {
        try {
            const pdfBuffer = fs.readFileSync(caminho_pdf);
            const data = await PDFParser(pdfBuffer);
            const pdfText = data.text;

            const regex = /([A-Z]+\d+)\s*[^\n]*/gm
            let componentesCurriculares = new Set(); // Usando um Set para armazenar valores únicos
            let match;

            while ((match = regex.exec(pdfText)) !== null) {
                if (match[1]) {
                    componentesCurriculares.add(match[1].trim()); // Adicionando ao conjunto
                }
            }

            // Convertendo o Set de volta para um array
            const componentesCurricularesUnicos = [...componentesCurriculares];

            return componentesCurricularesUnicos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
}

module.exports = extrairDados;
