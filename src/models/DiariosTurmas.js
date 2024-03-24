module.exports = (sequelize, DataTypes) => {
  const DiariosTurmas = sequelize.define(
    "Diarios_Turmas",
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

      codigo_da_disciplina: {
        type: DataTypes.STRING(5),
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


    },
    {
        tableName: "Diarios_turmas",
        timestamps: false,
        freezeTableName: true,
    }
  );

  return DiariosTurmas;
};
