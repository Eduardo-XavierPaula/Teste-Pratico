const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");

exports.create  = (req, res) => {  
  if (!req.body.nome) {
    res.status(400).send({
      message: "conteudo não pode ser vazio!"
    });
    return;

  };
  const password=req.body.senha;
 
  const hashPass = bcrypt.hashSync(password,8);
  console.log(hashPass);
  const user = {
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    telefone: req.body.telefone,
    email: req.body.email,
    senha: hashPass,
    clientId: req.body.clientId
  };
  User.create(user).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Ocorreu algum erro durante a criação do tutorial."
    });
  });
}

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

  User.findAll({ where: condition })
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Ocorreu algum erro durante a coleta dos comentarios."
          });
      });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: "Erro na coleta do comentario com id=" + id
          });
      });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
      where: { id: id }
  })
      .then(num => {
          if (num == 1) {
              res.send({
                  message: "Comentario foi atualizado com sucesso."
              });
          } else {
              res.send({
                  message: `Não pode atualizar Comentario com id=${id}. Talvez Comentario não foi encontrado ou req.body está vazio!`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Error atualizando Comentario com id=" + id
          });
      });
};

exports.delete = (req, res) => {

  const id = req.params.id;

  User.destroy({
      where: { id: id }
  })
      .then(num => {
          if (num == 1) {
              res.send({
                  message: "Comentario foi deletado com sucesso!"
              });
          } else {
              res.send({
                  message: `Não pode deletar Comentario com id=${id}. Talvez Comentario não foi encontrado!`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Não pode deletar Comentario com id=" + id
          });
      });
};

exports.deleteAll = (req, res) => {
  const clientId=req.body.clientId
  User.destroy({
      where: {clientId:clientId},
      truncate: false
  })
      .then(nums => {
          res.send({ message: `${nums} comentarios foram deletados com sucesso!` });
      })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Algum erro ocorreu durante remoção dos comentarios."
          });
      });
};