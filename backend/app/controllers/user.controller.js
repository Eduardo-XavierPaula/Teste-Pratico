const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
exports.create = (req, res) => {
    if (!req.body.nome) {
        res.status(400).send({
            message: "conteudo não pode ser vazio!"
        });
        return;

    };
    const password = req.body.senha;

    const hashPass = bcrypt.hashSync(password, 8);
    
    const user = {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        telefone: req.body.telefone,
        email: req.body.email,
        senha: hashPass,
        clientId: req.body.clientId,
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

    const clientId = req.params.id;
    var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;
    console.log(condition)
    console.log(nome)
    User.findAll({
        where: {
            [Op.and]: [
                { clientId: clientId },
                condition 
            ]
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro durante a coleta dos usuarios."
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
                message: "Erro na coleta do usuario com id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    // const password = req.body.senha;
    // console.log("password");
    // console.log(password);
    // const hashPass = bcrypt.hashSync(password, 8);
    // req.body.senha=hashPass;
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
exports.updateSenha = (req, res) => {
    const id = req.params.id;
    const password = req.body.senha;
    console.log("senha");
    
    const hashPass = bcrypt.hashSync(password, 8);
    req.body.senha=hashPass;
    console.log(req.body.senha);
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Senha foi atualizada com sucesso."
                });
            } else {
                res.send({
                    message: `Não pode atualizar senha de Comentario com id=${id}. Talvez Comentario não foi encontrado ou req.body está vazio!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error atualizando senha de Comentario com id=" + id
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
    const clientId = req.params.id;
    User.destroy({
        where: { clientId: clientId },
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} usuarios foram deletados com sucesso!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu durante remoção dos usuarios."
            });
        });
};