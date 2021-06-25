import React, { useState, useEffect } from "react";
import ClientDataService from "../services/ClientService";

const Client = props => {
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
        ClientDataService.update(currentClient.id, currentClient)
            .then(response => {
                console.log(response.data);
                setMessage("The client was updated successfully!");
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
                            <label htmlFor="nome_fantasia">Nome Fantasia</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome_fantasia"
                                name="nome_fantasia"
                                value={currentClient.nome_fantasia}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cnpj">CNPJ</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cnpj"
                                name="cnpj"
                                value={currentClient.cnpj}
                                onChange={handleInputChange}
                            />
                        </div>
                    
                    </form>

                    
                    <button className="badge badge-danger mr-2 btn-danger" onClick={deleteClient}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success btn-success"
                        onClick={updateClient}
                    >
                        Update
                    </button>
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