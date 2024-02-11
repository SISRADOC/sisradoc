const express = require('express'); // Arquivo responsável por mapear as rotas de Usuário
const authController = require('../controllers/AuthController'); // Controller de usuário
const router = express.Router();

// Rota para a página de login
router.post('/cadastro', authController.register);
router.get('/login', authController.login);
router.get('/list', authController.list);

module.exports = router;