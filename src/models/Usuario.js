module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define(
        'Usuario', 
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nome: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            
        },
        {
            tableName: 'Usuario', // Define o nome da tabela
            timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
            freezeTableName: true, // Define o nome da tabela como o nome do modelo 
        });
        
    return Usuario;
};
