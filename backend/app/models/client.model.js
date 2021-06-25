module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
      cnpj: {
        type: Sequelize.BIGINT(14)
      },
      nome_fantasia: {
        type: Sequelize.STRING
      },
      razao_social: {
        type: Sequelize.STRING
      },
      cep: {
        type: Sequelize.BIGINT(8)
      },
      endereco: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      complemento: {
        type: Sequelize.STRING
      },
      bairro: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      uf: {
        type: Sequelize.STRING
      },
    });
  
    return Client;
  };