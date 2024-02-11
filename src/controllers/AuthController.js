var models = require("../models");
var Usuario = models.Usuario;
const bcrypt = require("bcryptjs"); // Importar bcryptjs
const jwt = require("jsonwebtoken"); // Importar JWT
const Sequelize = require("sequelize"); // Importar Sequelize

const UserController = {
  register: async (req, res) => {
    const { email, password } = req.body;

    const userFound = await Usuario.findOne({ where: { email } });

    if (userFound) {
      return res.status(400).json({ message: "User already exists" });
    }

    const cryptoPassword = bcrypt.hashSync(password, 10); // Encriptar a senha

    const user = { email, cryptoPassword }; // Criar um objeto novo com a senha criptografada para salvar no banco

    await Usuario.create(user); // Salvar o usuário no banco (com a senha criptografada)

    return res.status(201).json(user);
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    userFound = await Usuario.findOne({ where: { email } });

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    const passwordMatch = bcrypt.compareSync(password, userFound.password); // Comparando a senha recebida pela requisição com a senha criptografada do banco

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

    list: async (req, res) => {
        console.log("Listando usuários");
        const usersList = await Usuario.findAll();
        return res.status(200).json(usersList);
    },
};

module.exports = UserController;
