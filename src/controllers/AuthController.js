const { Usuario } = require("../models");
const bcrypt = require("bcryptjs"); // Importar bcryptjs
const jwt = require("jsonwebtoken"); // Importar JWT
const Sequelize = require("sequelize"); // Importar Sequelize

const UserController = {
  register: async (req, res) => {
    const { nome, senha, email } = req.body;

    const userFound = await Usuario.findOne({ where: { email } });

    if (userFound) {
      return res.status(400).json({ message: "User already exists" });
    }

    const cryptoPassword = bcrypt.hashSync(senha, 10); // Encriptar a senha
    console.log(cryptoPassword);

    const user = { nome, email, cryptoPassword }; // Criar um objeto novo com a senha criptografada para salvar no banco

    const insertedUser = {
      nome: nome,
      email: email,
      senha: cryptoPassword,
    }

    await Usuario.create(insertedUser); // Salvar o usuário no banco (com a senha criptografada)

    return res.status(201).json(insertedUser);
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
          // Dados que serão salvos no token
          userId: userFound.id,
          userEmail: userFound.email,
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
