const { User } = require('../models');


// // rota de usuário
// import { Router } from "express"

// import { listUsers, createUser } from "../services/user"
// //router é uma funcao pronta do express para fazer com que você crie o controller abaixo
// const router = Router() //criar um controller

// //criar as rotas do controller
// router.get('/', async (req, res) => {
//   const userList = await listUsers()
//   res.send(userList)
// }) //rotar pega uma lista dos usuários

// router.post('/', async (req, res) => {
//   const user = await createUser(req.body) 
//   res.status(201).send(user)
// })  // linha 15 é usado para passar os dados de algum lugar, por exemplo, o dado do nosso usuario para mandar para a nossa lista
//     //rota para criar usuarios
//     // res.status é um codigo informando quando criamos alguma coisa

// router.delete('/', (req, res) => {
//   res.send('DELETE USER')
// }) //rota para deletar usuario

// // req são os valores da requisicao, e o res a resposta

// export default router // vai criar um controller com uma rota inicial

