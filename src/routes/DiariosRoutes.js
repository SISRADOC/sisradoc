const express = require('express');
const DiariosController = require('../controllers/DiariosController')
const router = express.Router();
const multer = require('multer');

// Rota para PDF de disciplinas ministradas

//const upload = multer({ dest: 'uploads/'})

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

router.post('/pdf/diarios', upload.single('file') , DiariosController.diariosTurmas);

module.exports = router;