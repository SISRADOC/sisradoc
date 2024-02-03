const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fileupload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
var path = require('path');
import userController from "./controllers/user";
const app = express(); //criar o back-end para chamar a funcao express
const PORT = 5000; //vai ser a porta do nosso back-end

app.use(bodyParser.json()) // utilizado para ler o body, o express nao envia os dados para gente, vai transformar o body em um json, em um objeto

//para consultar/buscar alguma coisa utilizamos o verbo HTTP GET
//para postar/enviar alguma coisa utilizamos o verbo HTTP POST
//para excluir alguma coisa utilizamos o verbo HTTP DELETE
//para alterar/atualizar alguma coisa utilizamos o verbo HTTP PUT (atualiza TODAS as informações) ou PATCH (atualiza informações parcialmente)

app.get('/home', (req, res)=>{
  res.json([{'home': 'Aqui é o início'}]);
})

/* app.get("/", (req, res) => {
  console.log("ENTROU AQUI");
  res.send("GET!"); 
}); */ //para o node.js esperar um GET e quando receber o GET ele toma uma ação, e dentro do parâmetro aero function temos o req que serve para você conseguir ver informações de quem está enviando as coisas (IP, onde ta enviando...) e o parâmetro res é a resposta, ou seja, o primeiro é a requisição e o segundo é a resposta. Dentro do res.send() colocamos o dado para onde está chamando a requisição.

//para criar uma rota anterior ao post, criamos uma rota anterior a ela, para acessar o user
app.use('/user', userController)

app.listen(PORT, () => {
  console.log(`App online na porta http://localhost:${PORT}`);
});
//app.listen funcao para o express ouvir o nosso código + aero function + mensagem quando entrar

//quando iniciei o node com o npm run, alterei o script para executar o comando que eu quero no "package.json", e nesse caso pedi para que abrisse o caminho src/index.js ao invés de eu precisar ficar digitando

//o nodemon serve para atualizar o node automaticamente quando fizer uma alteração

//o código abaixo serve para inicializar o session do express, ja que o express tem várias dependencias que podemos colocar por meio da referência do app, então temos o fileupload (caso queira), e o cors para não ter conflitos entre servidores de portas diferentes na mesma máquina
app.use(session({secret: 'dojsdinajoicadoisajdoiaiojewoiq'}));
app.use(express.json());
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'temp')
}));
app.use(cors());