const { ExtractionException, ProcessPDFError, DailyClassError } = require("../exceptions/Exceptions");
const extrairDados = require("../utils/ProcessPDF");

const ProjetosController = {
  projetos: async (req, res) => {

    try {
      const palavras_projeto = ["Titulo do Projeto", "Código", "Situação do Projeto"];
      const regexp_projeto = ':\\s*([^\\n]+)';
      const bandeira = 'gi';
      const separador_padrao = ":";

      if (!req.file) {
        return res.status(400).json({ erro: "Arquivo não enviado" });
      }

      const uploadDirectory = "uploads";
      const uploadedFile = req.file;
      const fileName = `${uploadedFile.originalname}`;
      const caminho_pdf = `${uploadDirectory}/${fileName}`;

      const fileExtension = uploadedFile.mimetype
        ? uploadedFile.mimetype
        : null;
      if (fileExtension === "application/pdf") {
        try {
          // Blindando a aplicação de possíveis erros de pdfs inválidos
          const pdf_valido = await extrairDados.validar_pdf(caminho_pdf, [
            "Projeto de Pesquisa",
            "Dados do Projeto Pesquisa"
          ]);
          
          if(!pdf_valido){
            return res.status(400).json({ erro: "Arquivo pdf inválido! Verifique se o arquivo contém informações de aprojeto de pesquisa."});
          } else{
            const projetos = await extrairDados.extrair_projetos(caminho_pdf, palavras_projeto, regexp_projeto, bandeira, separador_padrao);
            res.status(200).json({ projetos })
          }
        } catch (error) {
          return res.status(500).json({ erro: error.message })
        }
      } else {
        return res.status(400).json({ erro: "Formato de arquivo inválido" });
      }
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao processar o arquivo" });
    }
  },
};

module.exports = ProjetosController;