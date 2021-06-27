import React, { useState, useEffect } from "react";
import ClientDataService from "../services/ClientService";
import InputMask from "react-input-mask";
const Client = props => {
    const initialClientState = {
        id: null,
        cnpj: null,
        nome_fantasia: "",
        razao_social: "",
        cep: null,
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
    };
    let invalid=0;
    const [currentClient, setCurrentClient] = useState(initialClientState);
    const [message, setMessage] = useState("");

    const getClient = id => {
        ClientDataService.get(id)
            .then(response => {
                setCurrentClient(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getClient(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentClient({ ...currentClient, [name]: value });
    };


    const updateClient = () => {
        
        if (currentClient.cep != null&&/[^\d]/g.test(currentClient.cep)) {
            console.log(currentClient.cep);
            currentClient.cep = currentClient.cep.replace(/[^\d]/g, '');
        }
        if (currentClient.cnpj != null&&/[^\d]/g.test(currentClient.cnpj)) {
            currentClient.cnpj = currentClient.cnpj.replace(/[^\d]/g, '');
        }
        for (var k in currentClient) {
            if (k != "id") {
                if (currentClient[k] == "" || currentClient[k] == 'undefined') {

                    document.querySelector(`#${k}`).className = "form-control is-invalid";
                    invalid = 1;

                }

            }
        }
        if (invalid == 1) {
            return invalid = 0;
        }

        ClientDataService.update(currentClient.id, currentClient)
            .then(response => {
                console.log(response.data);
                setMessage("O cliente foi atualizado com sucesso!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteClient = () => {
        ClientDataService.remove(currentClient.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/clients");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentClient ? (
                <div className="edit-form">
                    <h4>Client</h4>
                    <form>
                        <div className="form-group">
                            <div class="g-3 row">
                                <div class="col-sm-2">
                                    <label htmlFor="cnpj">CNPJ</label>
                                    <InputMask
                                        mask="99.999.999/9999-99"
                                        type="text"
                                        className="form-control"
                                        id="cnpj"
                                        required
                                        value={currentClient.cnpj}
                                        onChange={handleInputChange}
                                        name="cnpj"
                                    />
                                </div>

                                <div class="col-sm-10">
                                    <label htmlFor="nome_fantasia">Nome Fantasia</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome_fantasia"
                                        required
                                        value={currentClient.nome_fantasia}
                                        onChange={handleInputChange}
                                        name="nome_fantasia"
                                    />
                                </div>

                            </div>
                        </div>



                        <div className="form-group">

                        </div>
                        <div className="form-group">
                            <div class="g-3 row">
                                <div class="col-sm-10">
                                    <label htmlFor="razao_social">Razão Social</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="razao_social"
                                        required
                                        value={currentClient.razao_social}
                                        onChange={handleInputChange}
                                        name="razao_social"
                                    />
                                </div>
                                <div class="col-sm-2">
                                    <label htmlFor="cep">CEP</label>
                                    <InputMask
                                        mask="99999-999"
                                        type="text"
                                        className="form-control"
                                        id="cep"
                                        required
                                        value={currentClient.cep}
                                        onChange={handleInputChange}
                                        name="cep"
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="form-group">
                            <div class="g-3 row">
                                <div class="col-sm-2">
                                    <label htmlFor="numero">Número</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="numero"
                                        required
                                        value={currentClient.numero}
                                        onChange={handleInputChange}
                                        name="numero"
                                    />
                                </div>
                                <div class="col-sm-2">
                                    <label htmlFor="complemento">Complemento</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="complemento"
                                        required
                                        value={currentClient.complemento}
                                        onChange={handleInputChange}
                                        name="complemento"
                                    />
                                </div>
                                <div class="col-sm-8">
                                    <label htmlFor="endereco">Endereço</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="endereco"
                                        required
                                        value={currentClient.endereco}
                                        onChange={handleInputChange}
                                        name="endereco"
                                    />
                                </div>

                            </div>

                        </div>
                        <div className="form-group">
                            <div class="g-3 row">
                                <div class="col-sm-6">
                                    <label htmlFor="bairro">Bairro</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bairro"
                                        required
                                        value={currentClient.bairro}
                                        onChange={handleInputChange}
                                        name="bairro"
                                    />
                                </div>
                                <div class="col-sm-2">
                                    <label htmlFor="uf">UF</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="uf"
                                        required
                                        value={currentClient.uf}
                                        onChange={handleInputChange}
                                        name="uf"
                                    />
                                </div>
                                <div class="col-sm-4">
                                    <label htmlFor="cidade">Cidade</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cidade"
                                        required
                                        value={currentClient.cidade}
                                        onChange={handleInputChange}
                                        name="cidade"
                                    />
                                </div>

                            </div>
                        </div>

                    </form>
                    <br></br>
                    <div class="g-3 row">
                        <div class="col-auto">
                            <button className="btn btn-danger" onClick={deleteClient}>
                                <i className="fas fa-trash action"></i>{' '}Deletar
                            </button>
                        </div>

                        <div class="col-auto">
                            <button
                                type="submit"
                                className="btn btn-success"
                                onClick={updateClient}
                            >
                                <i className="fas fa-edit action"></i>{' '}Atualizar
                            </button>
                        </div>
                    </div>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Client...</p>
                </div>
            )}
        </div>
    );
};

export default Client;