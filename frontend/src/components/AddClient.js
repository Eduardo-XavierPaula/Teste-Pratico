import React, { useState } from "react";
import ClientDataService from "../services/ClientService";
import InputMask from "react-input-mask";

const AddClient = () => {
    const initialClientState = {
        id: null,
        cnpj: `undefined`,
        nome_fantasia: "",
        razao_social: "",
        cep: `undefined`,
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
    };
    let invalid=0;
    const [client, setClient] = useState(initialClientState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;

        setClient({ ...client, [name]: value });
    };


    const saveClient = () => {
        if (client.cep != null) {
            client.cep = client.cep.replace(/[^\d]/g, '');
        }
        if (client.cnpj != null) {
            client.cnpj = client.cnpj.replace(/[^\d]/g, '');
        }
        console.log(client.cnpj)
        for (var k in client) {
            if (k != "id") {
                if (client[k] == "" || client[k] == 'undefined') {

                    document.querySelector(`#${k}`).className = "form-control is-invalid";
                    invalid = 1;

                }

            }
        }
        if (invalid == 1) {
            return invalid = 0;
        }

        var data = {
            cnpj: client.cnpj,
            nome_fantasia: client.nome_fantasia,
            razao_social: client.razao_social,
            cep: client.cep,
            endereco: client.endereco,
            numero: client.numero,
            complemento: client.complemento,
            bairro: client.bairro,
            cidade: client.cidade,
            uf: client.uf,
        };

        ClientDataService.create(data)
            .then(response => {
                setClient({
                    id: response.data.id,
                    cnpj: response.data.cnpj,
                    nome_fantasia: response.data.nome_fantasia,
                    cep: response.data.cep,
                    endereco: response.data.endereco,
                    numero: response.data.numero,
                    complemento: response.data.complemento,
                    bairro: response.data.bairro,
                    cidade: response.data.cidade,
                    uf: response.data.uf
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newClient = () => {
        setClient(initialClientState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Cliente adicionado com sucesso!</h4>
                    <button className="btn btn-success" onClick={newClient}>
                        Adicionar outro Cliente
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <div className="g-3 row">
                            <div className="col-sm-2">
                                <label htmlFor="cnpj">CNPJ</label>
                                <InputMask
                                    mask="99.999.999/9999-99"
                                    type="text"
                                    className="form-control"
                                    id="cnpj"
                                    required
                                    value={client.cnpj}
                                    onChange={handleInputChange}
                                    name="cnpj"
                                />
                            </div>

                            <div className="col-sm-10">
                                <label htmlFor="nome_fantasia">Nome Fantasia</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nome_fantasia"
                                    required
                                    value={client.nome_fantasia}
                                    onChange={handleInputChange}
                                    name="nome_fantasia"
                                />
                            </div>

                        </div>
                    </div>
                    <div className="form-group">
                        <div className="g-3 row">
                            <div className="col-sm-10">
                                <label htmlFor="razao_social">Razão Social</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="razao_social"
                                    required
                                    value={client.razao_social}
                                    onChange={handleInputChange}
                                    name="razao_social"
                                />
                            </div>
                            <div className="col-sm-2">
                                <label htmlFor="cep">CEP</label>
                                <InputMask
                                    mask="99999-999"
                                    type="text"
                                    className="form-control"
                                    id="cep"
                                    required
                                    value={client.cep}
                                    onChange={handleInputChange}
                                    name="cep"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="g-3 row">
                            <div className="col-sm-2">
                                <label htmlFor="numero">Número</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="numero"
                                    required
                                    value={client.numero}
                                    onChange={handleInputChange}
                                    name="numero"
                                />
                            </div>
                            <div className="col-sm-2">
                                <label htmlFor="complemento">Complemento</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="complemento"
                                    required
                                    value={client.complemento}
                                    onChange={handleInputChange}
                                    name="complemento"
                                />
                            </div>
                            <div className="col-sm-8">
                                <label htmlFor="endereco">Endereço</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="endereco"
                                    required
                                    value={client.endereco}
                                    onChange={handleInputChange}
                                    name="endereco"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="g-3 row">
                            <div className="col-sm-6">
                                <label htmlFor="bairro">Bairro</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="bairro"
                                    required
                                    value={client.bairro}
                                    onChange={handleInputChange}
                                    name="bairro"
                                />
                            </div>
                            <div className="col-sm-2">
                                <label htmlFor="uf">UF</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="uf"
                                    required
                                    value={client.uf}
                                    onChange={handleInputChange}
                                    name="uf"
                                />
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="cidade">Cidade</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cidade"
                                    required
                                    value={client.cidade}
                                    onChange={handleInputChange}
                                    name="cidade"
                                />
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button onClick={saveClient} type="button" className="btn btn-success">
                            <i className="fas fa-save action"></i>{' '}Salvar Cliente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddClient;