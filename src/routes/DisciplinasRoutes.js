const express = require('express');
const DiscController = require('../controllers/DisciplinasController');
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

router.post('/disciplinas/ministradas', upload.single('file') , DiscController.discMinistradas);

module.exports = router;