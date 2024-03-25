const express = require('express');
const ProjetosController = require('../controllers/ProjetosController')
const router = express.Router();
const multer = require('multer');


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

router.post('/pdf/projetos', upload.single('file') , ProjetosController.projetos);

module.exports = router;