// Dependências
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
//const fileupload = require('express-fileupload');
const cors = require('cors'); // Impedir que tenha conflitos de servidores
const swaggerFile = require('./docs/swagger.json');
const swaggerUi = require('swagger-ui-express');
const PDFParser = require('pdf-parse');
const fs = require('fs');
const uploadDirectory = './uploads';
const multer = require('multer');
const mammoth = require('mammoth');
const pdf = require('html-pdf');

// Rotas
const authRouter = require('./routes/AuthRoutes'); // Importar a rota de autenticação
const discRouter = require('./routes/DisciplinasRoutes'); // Importar a rota de disciplina

// Configurações
const {sequelize} = require('./models');
const PORT = 5000; // Porta definida
const app = express(); // Inicializar o servidor

app.use(bodyParser.urlencoded({ extended: true })); // Para aceitar requisições com dados de formulário
app.use(bodyParser.json()); 
app.use(express.json());

/* app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp')
})); */

app.use(cors());

app.use(
    session({ 
        secret: 'keyboard', // chave do cookie da sessão
        resave: false, // não salva a sessão a cada requisição
        saveUninitialized: true, // salvar a sessão mesmo que ela não seja inicializada
    })
);

// Inicializar as rotas
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(authRouter); // Inicializar a rota de autenticação

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer();

// app.post('/disciplinas/ministradas', upload.single('file'), (req, res) => {
//     res.json(req.file);
// });

app.use(discRouter); // Inicializar a rota de disciplina

//app.use(userRouter); // Inicializar a rota do usuário

// Escuta da porta do servidor
app.listen(PORT, () => {
    console.log(`App online na porta http://localhost:${PORT}`);
});