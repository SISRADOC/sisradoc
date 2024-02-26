const { DisciplinasMinistradas } = require("../models");
const Sequelize = require("sequelize");
const fs = require("fs");
const PDFParser = require("pdf-parse");

const DisciplinasController = {
  discMinistradas: async (req, res) => {

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
      console.log(error);
      return res.status(500).json({ erro: "Erro ao processar o arquivo" });
    }
  },
};


async function processPDF(pdfFilePath, res) {
  try {
    const pdfBuffer = fs.readFileSync(pdfFilePath);
    const data = await PDFParser(pdfBuffer);
    const pdfText = data.text;

    const wordsToFind = [
      "Centro",
      "Departamento",
      "Código",
      "Disciplina",
      "Carga Horária",
    ];
    let wordsFound = {};

    // Para cada palavra a ser encontrada
    wordsToFind.forEach((word) => {
      // Crie uma expressão regular para encontrar a palavra e o texto que a segue
      const regex = new RegExp(`${word}:\\s*([^\\n]+)`, "gi");

      // Encontre todas as correspondências e capture o texto que segue a palavra
      const matches = pdfText.match(regex);

      const capturedTexts = matches
        // Se houver palavras capturadas, separe o texto do resto da correspondência
        ? matches.map((match) => match.split(":")[1].trim())
        // Se não, retorne um array vazio
        : [];
        
        // Adicione a palavra e os textos capturados ao objeto de palavras encontradas
        wordsFound[word] = capturedTexts;
    });

    res.status(200).json({ wordsFound });
  } catch (error) {
    console.error("An error occurred while processing the PDF:", error);
    res.status(500).json({ error: "Failed to process the PDF" });
  } finally {
    // Clean up - delete the uploaded file and PDF file if needed
  }
}

module.exports = DisciplinasController;
