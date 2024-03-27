const {
  ExtractionException,
  ProcessPDFError,
  DailyClassError,
} = require("../exceptions/Exceptions");
const extrairDados = require("../utils/ProcessPDF");

const AvaliacaoDiscenteController = {
  avaliacaoDiscente: async (req, res) => {
    try {
      const palavras_avaliacao = ["Componente Curricular", "Média"];
      const regexp_avaliacao = ":\\s*([^\\n]+)";
      const bandeira = "gi";
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
            "Comentários dos discentes na avaliação da docência",
          ]);

          if (!pdf_valido) {
            return res
              .status(400)
              .json({
                erro: "Arquivo pdf inválido! Verifique se o arquivo contém informações de avaliação da docência.",
              });
          } else {
            const avaliacao_discente =
              await extrairDados.extrair_avaliacao_discente_codigo(
                caminho_pdf,
                palavras_avaliacao,
                regexp_avaliacao,
                bandeira,
                separador_padrao
              );
            res.status(200).json({ avaliacao_discente });
          }
        } catch (error) {
          return res.status(500).json({ erro: error.message });
        }
      } else {
        return res.status(400).json({ erro: "Formato de arquivo inválido" });
      }
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao processar o arquivo" });
    }
  },
};

module.exports = AvaliacaoDiscenteController;
