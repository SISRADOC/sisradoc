const express = require('express');
const AulasLetivasController = require('../controllers/AulasLetivasController')
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

router.post('/pdf/aulas_letivas', upload.single('file') , AulasLetivasController.diariosTurmas);

module.exports = router;