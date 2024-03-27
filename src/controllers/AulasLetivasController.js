const { DiariosTurmas } = require("../models");
const { ExtractionException, ProcessPDFError, DailyClassError } = require("../exceptions/Exceptions");
const extrairDados = require("../utils/ProcessPDF");

const AulasLetivasController = {
  diariosTurmas: async (req, res) => {

    try {
      const palavras_diario = ["Disciplina", "Código", "Carga Horária"];
      const palavra_docente = "Docente(s)"
      const regexp_diario = ':\\s*([^\\n]+)';
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
          const pdf_valido = await extrairDados.validar_pdf(caminho_pdf, ["Diário de Turma"]);
          
          if(!pdf_valido){
            return res.status(400).json({ erro: "Arquivo pdf inválido! Verifique se o arquivo contém informações de diário de turma."});
          } else{
            const [diario_turma, docentes_envolvidos, docentes_ch_envolvidos] = await Promise.all([
              await extrairDados.extrair_diario(caminho_pdf, palavras_diario, regexp_diario, bandeira, separador_padrao),
              await extrairDados.extrair_docentes(caminho_pdf, palavra_docente),
              await extrairDados.extrair_ch_docentes(caminho_pdf, palavra_docente)
            ]);
            
            res.status(200).json({ diario_turma, docentes_envolvidos, docentes_ch_envolvidos })
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

module.exports = AulasLetivasController;