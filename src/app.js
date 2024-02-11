const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fileupload = require('express-fileupload');
const cors = require('cors'); // Impedir que tenha conflitos de servidores
const userRouter = require('./routes/UserRoutes'); // Importar a rota do usuário
const authRouter = require('./routes/AuthRoutes'); // Importar a rota de autenticação
const app = express(); // Inicializar o servidor
const PORT = 5000; // Porta definida

app.use(bodyParser.json()); 

app.use(express.json());

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp')
}));

app.use(cors());

app.use(
    session({ 
        secret: 'keyboard', // chave do cookie da sessão
        resave: false, // não salva a sessão a cada requisição
        saveUninitialized: true, // salvar a sessão mesmo que ela não seja inicializada
    })
);

// Inicializar as rotas
app.use(authRouter); // Inicializar a rota de autenticação
//app.use(userRouter); // Inicializar a rota do usuário

// Escuta da porta do servidor
app.listen(PORT, () => {
    console.log(`App online na porta http://localhost:${PORT}`);
});