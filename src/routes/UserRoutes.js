// Arquivo responsável por mapear as rotas de Usuário
const express = require('express');
const userController = require('./../controllers/UserController');
const router = express.Router();

// Rotas de cadastro e listagem de usuários
router.get('/', userController.getUser);
router.post('/', userController.createUser);

