const express = require('express'); // Arquivo responsável por mapear as rotas de Usuário
const authController = require('../controllers/AuthController'); // Controller de usuário
const router = express.Router();

// Rota para a página de login
router.post('/login', authController.login);
router.post('/cadastro', authController.register);

module.exports = router;