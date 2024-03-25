const express = require('express'); // Arquivo responsável por mapear as rotas de Usuário
const PedagogicasComplementares = require('../controllers/PedagogicasComplementaresController'); // Controller de usuário
const router = express.Router();

// Rota para a página de login
router.post('/pedagogicas_complementares', PedagogicasComplementaresController.pedagogicasComplementares);

module.exports = router;