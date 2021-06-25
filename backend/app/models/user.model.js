module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      nome: {
        type: DataTypes.STRING
      },
      sobrenome: {
        type: DataTypes.STRING
      },
      telefone: {
        type: DataTypes.BIGINT
      },
      email: {
        type: DataTypes.STRING
      },
      senha: {
        type: DataTypes.STRING
      },
      clientId:{
        type: DataTypes.INTEGER,
        allowNull:false,
      
      }
    });
  
    return User;
  };
  