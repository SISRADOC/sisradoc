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
          // diario_turma = await extrairDados(caminho_pdf, palavras_diario, regexp_diario, bandeira, separador_padrao);

          const [diario_turma, docentes_envolvidos] = await Promise.all([
            await extrairDados.extrair_diario(caminho_pdf, palavras_diario, regexp_diario, bandeira, separador_padrao),
            await extrairDados.extrair_docentes(caminho_pdf, palavra_docente)
          ])

          //const diario_turma = await extrairDados(caminho_pdf, palavras_diario, regexp_diario, bandeira, separador_padrao);
          // const docentes_envolvidos = await extrairDados(caminho_pdf, [], regexp_docente, bandeira, " - ");

          res.status(200).json({ diario_turma, docentes_envolvidos })
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