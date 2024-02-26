module.exports = (sequelize, DataTypes) => {
  const DisciplinaMinistrada = sequelize.define(
    "Disciplina_Ministrada",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },

      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      carga_horaria: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      nivel: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      codigo_da_disciplina: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
    },
    {
        tableName: "Disciplinas_ministradas",
        timestamps: false,
        freezeTableName: true,
    }
  );

  return DisciplinaMinistrada;
};
