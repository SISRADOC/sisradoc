module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define(
        'Usuario', 
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nome: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            nomeUsuario: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            siap: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            campus: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            classeReferencia: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            vinculo: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            regimeTrabalho: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            titulacao: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            telefone: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false,
            },    
        },
    {
        tableName: 'Usuario', // Define o nome da tabela
        timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
        freezeTableName: true, // Define o nome da tabela como o nome do modelo 
    })

    return Usuario;
};
