const { DiariosTurmas } = require("../models");
const Sequelize = require("sequelize");
const fs = require("fs");
const PDFParser = require("pdf-parse");
const { ExtractionException, ProcessPDFError, DailyClassError } = require("../exceptions/Exceptions");

const DiariosController = {
  diariosTurmas: async (req, res) => {

    try {
      if (!req.file) {
        return res.status(400).json({ erro: "Arquivo não enviado" });
      }

      const uploadDirectory = "uploads";
      const uploadedFile = req.file;
      const fileName = `${uploadedFile.originalname}`;
      const filePath = `${uploadDirectory}/${fileName}`;

      const fileExtension = uploadedFile.mimetype
        ? uploadedFile.mimetype
        : null;
      if (fileExtension === "application/pdf") {
        await processPDF(filePath, res);
      } else {
        return res.status(400).json({ erro: "Formato de arquivo inválido" });
      }
    } catch (error) {
      // throw ExtractionException("Erro ao processar o arquivo");
      return res.status(500).json({ erro: "Erro ao processar o arquivo" });
    }
  },
};

// TODO: Extrair a função de processamento do PDF, junto com sua função auxiliar de extração, para um módulo separado
// para que seja possível utilizá-lo em outros endpoints
async function processPDF(pdfFilePath, res) {
  try{
    const palavras_diario = ["Disciplina","Código","Carga Horária",];

    const palavras_disciplina = ['Graduação'];

    // Extrair as palavras do PDF de diário de turmas 
    const match_diario = await extractDiarioDeTurmas(pdfFilePath, palavras_diario);

    // Extrair as palavras do PDF de disciplina
    const match_disciplina = await extractDiarioDeTurmas(pdfFilePath, palavras_disciplina);

    // Criando hashmap para armazenar os dados
    const diario_de_turmas = {};
    const disciplinas = {};

    // Para cada palavra encontrada 
    match_diario.forEach(palavra => {
      // Adicione-a se existir no hashmap, caso contrário, adicione um array vazio naquele campo
      diario_de_turmas[palavra] = match_diario[palavra] ? match_diario[palavra] : []; 
    });

    match_disciplina.forEach(palavra => {
      disciplinas[palavra] = match_disciplina[palavra] ? match_disciplina[palavra] : [];
    })

    res.status(200).json({ diario_de_turmas, match_disciplina });

  } catch (error){
    return res.status(500).json({ erro: "Erro ao processar o arquivo" });
  }
}

// TODO: Generalizar a função para aceitar qualquer array de palavras a serem encontradas,
// qualquer regra de extração com o regex, qualquer tratamento de texto (separação, remoção de caracteres, etc.)
// e retornar um objeto com as palavras encontradas ou um array vazio se não houver correspondências
async function extractDiarioDeTurmas(pdfFilePath, wordsToFind){
  try {
    const pdfBuffer = fs.readFileSync(pdfFilePath);
    const data = await PDFParser(pdfBuffer);
    const pdfText = data.text;

    let wordsFound = {};

    // Para cada palavra a ser encontrada
    wordsToFind.forEach((word) => {
      // Crie uma expressão regular para encontrar a palavra e o texto que a segue
      const regex = new RegExp(`${word}:\\s*([^\\n]+)`, "gi"); // TODO: generalizar a regex para aceitar qualquer regra de extração

      // Encontre todas as correspondências e capture o texto que segue a palavra
      const matches = pdfText.match(regex);

      const capturedTexts = matches
        // Se houver palavras capturadas, separe o texto do resto da correspondência
        ? matches.map((match) => match.split(":")[1].trim()) // TODO: generalizar a separação do texto
        // Se não, retorne um array vazio
        : [];
        
        // Adicione a palavra e os textos capturados ao objeto de palavras encontradas
        wordsFound[word] = capturedTexts;
    });

    return wordsFound; // Retorne o objeto com as palavras encontradas
  } catch (error) {
    throw new DailyClassError("Erro ao extrair diário de turmas");
  }
}

module.exports = DiariosController;
