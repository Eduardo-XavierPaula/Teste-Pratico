import React, { useState } from "react";
import ClientDataService from "../services/ClientService";

const AddClient = () => {
    const initialClientState = {
        id: null,
        cnpj: 0,
        nome_fantasia: "",
        razao_social: "",
        cep: 0,
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
    };
    const [client, setClient] = useState(initialClientState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setClient({ ...client, [name]: value });
    };

    const saveClient = () => {
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
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newClient}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="cnpj">CNPJ</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cnpj"
                            required
                            value={client.cnpj}
                            onChange={handleInputChange}
                            name="cnpj"
                        />
                    </div>

                    <div className="form-group">
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

                    <div className="form-group">
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

                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cep"
                            required
                            value={client.cep}
                            onChange={handleInputChange}
                            name="cep"
                        />
                    </div>
                    <button onClick={saveClient} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddClient;