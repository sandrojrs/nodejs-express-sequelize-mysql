module.exports = (sequelize, Sequelize) => {
  const Atividade = sequelize.define("atividades", {
    evento: {
      type: Sequelize.STRING
    },
    descricao: {
      type: Sequelize.STRING
    },
    data: {
      type: Sequelize.DATEONLY
    },
    inicio: {
      type: Sequelize.TIME
    },
    fim: {
      type: Sequelize.TIME
    },
    repete: {
      type: Sequelize.BOOLEAN
    },
    semanas: {
      type: Sequelize.INTEGER
    }
  });

  return Atividade;
};