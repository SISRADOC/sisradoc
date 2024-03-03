const { Usuario } = require("../models");
const bcrypt = require("bcryptjs"); // Importar bcryptjs
const jwt = require("jsonwebtoken"); // Importar JWT
const Sequelize = require("sequelize"); // Importar Sequelize

const UserController = {
  cadastro: async (req, res) => {
    // Desestruturação do objeto de requisição
    const {
      nome,
      nomeUsuario,
      siap,
      campus,
      classeReferencia,
      vinculo,
      regimeTrabalho,
      titulacao,
      email,
      telefone,
      senha
    } = req.body;

    // Verificar se o usuário já existe
    const userFound = await Usuario.findOne({ where: { email } });

    // Caso exista, retornar aviso
    if (userFound) {
      return res.status(409).json({ message: "User already exists" });
    }

    const cryptoPassword = bcrypt.hashSync(senha, 10); // Encriptar a senha

    // Objeto de inserção no banco
    const insertedUser = {
      nome: nome,
      nomeUsuario: nomeUsuario,
      siap: siap,
      campus: campus,
      classeReferencia: classeReferencia,
      vinculo: vinculo,
      regimeTrabalho: regimeTrabalho,
      titulacao: titulacao,
      email: email,
      telefone: telefone,
      senha: cryptoPassword,
    };

    await Usuario.create(insertedUser); // Salvar o usuário no banco (com a senha criptografada)

    // Redirecionando para a página de home
    return res.status(201).json({ message: "User created" })
  },

  login: async (req, res) => {
    const { email, senha } = req.body;

    userFound = await Usuario.findOne({ where: { email } });

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    const passwordMatch = bcrypt.compareSync(senha, userFound.senha); // Comparando a senha recebida pela requisição com a senha criptografada do banco

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Criação do token JWT
    let token;
    try {
      token = jwt.sign(
        {
          nomeUsuario: userFound.nomeUsuario,
          email: userFound.email,
          system: "sisradoc"
        },
        "secretkeynotrevealed", // Chave secreta para a criação do token
        { expiresIn: "24h" }
      ); // Tempo de expiração do token
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    // Retona o token válido ao usuário
    return res.status(200).json({ token });
  },
};

module.exports = UserController;
