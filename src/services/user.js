//responsável pelos serviços dos usuários, é uma funcao q vai listar os usuarios, ele vai ler os parametros dentro do array
let users = []

export const listUsers = () => {
  return users
}

export const createUser = (user) => {
  users.push(user)
} //criar e ler usuarios de um array, NAO TEM CONEXAO COM O BANCO DE DADOS
