const express = require('express');
const AvaliacaoDiscenteController = require('../controllers/AvaliacaoDiscenteController')
const router = express.Router();
const multer = require('multer');

// Rota para PDF de disciplinas ministradas

// Configuração do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage});

router.post('/pdf/avaliacao_discente', upload.single('file') , AvaliacaoDiscenteController.avaliacaoDiscente);

module.exports = router;