/*const { PedagogicasComplementares } = require("../models");
const jwt = require("jsonwebtoken"); // Importar JWT
const Sequelize = require("sequelize"); // Importar Sequelize

const PedagogicasComplementaresController = {
  pedagogicasComplementares: async (req, res) => {
    // Desestruturação do objeto de requisição
    const {
      chGraduacaoSemestre1,
      chPosGraduacaoSemestre1,
      chTotalSemestre1,
      chGraduacaoSemestre2,
      chPosGraduacaoSemestre2,
      chTotalSemestre2
    } = req.body;

    // Objeto de inserção no banco
    const insertedPedagogicas = {     
      chGraduacaoSemestre1: chGraduacaoSemestre1,
      chPosGraduacaoSemestre1: chPosGraduacaoSemestre1,
      chTotalSemestre1: chTotalSemestre1,
      chGraduacaoSemestre2: chGraduacaoSemestre2,
      chPosGraduacaoSemestre2: chPosGraduacaoSemestre2,
      chTotalSemestre2: chTotalSemestre2,
    };
    
    try {
      
      const pedagogicas = await PedagogicasComplementares.create(insertedPedagogicas);
      res.status(201).json(pedagogicas); // Responder com os dados criados
    } catch (error) {
      console.error("Erro ao criar dados pedagógicos complementares:", error);
      res.status(500).json({ error: "Erro ao criar dados pedagógicos complementares" });
    }
  }
};

module.exports = PedagogicasComplementaresController; */