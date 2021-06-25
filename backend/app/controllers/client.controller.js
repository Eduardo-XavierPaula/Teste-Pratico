const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {
    //Validate request
    if (!req.body.nome_fantasia) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //Create a Client
    const client = {
        cnpj: req.body.cnpj,
        nome_fantasia: req.body.nome_fantasia,
        razao_social: req.body.razao_social,
        cep: req.body.cep,
        endereco: req.body.endereco,
        numero: req.body.numero,
        complemento:req.body.complemento,
        bairro:req.body.bairro,
        cidade:req.body.cidade,
        uf:req.body.uf
    };

    //Save Client in the database
    Client.create(client)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro durante a criação do client."
            });
        });
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
    const nome_fantasia = req.query.nome_fantasia;
    var condition = nome_fantasia ? { nome_fantasia: { [Op.like]: `%${nome_fantasia}%` } } : null;

    Client.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocorreu algum erro durante a coleta dos tutoriais."
            });
        });
};

// Find a single Client with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Client.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro na coleta do Client com id=" + id
            });
        });
};

// Update a Client by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Client.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Client foi atualizado com sucesso."
                });
            } else {
                res.send({
                    message: `Não pode atualizar Client com id=${id}. Talvez Client não foi encontrado ou req.body está vazio!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error atualizando Client com id=" + id
            });
        });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Client.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Client foi deletado com sucesso!"
                });
            } else {
                res.send({
                    message: `Não pode deletar Client com id=${id}. Talvez Client não foi encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não pode deletar Client com id=" + id
            });
        });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    Client.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutoriais foram deletados com sucesso!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu durante remoção dos tutoriais."
            });
        });
};


