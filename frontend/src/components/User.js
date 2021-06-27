import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";

const User = props => {
    const initialUserState = {
        id: null,
        nome: "",
        sobrenome: "",
        telefone: `undefined`,
        email: "",
        senha: ""
    };
    const [currentUser, setCurrentUser] = useState(initialUserState);
    const [message, setMessage] = useState("");
    let invalid = 0;

    const getUser = id => {
        UserDataService.get(id)
            .then(response => {
                setCurrentUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        validado(name);
        setCurrentUser({ ...currentUser, [name]: value });
    };
    const validado = (name) => {
        return (document.querySelector(`#${name}`).className = "form-control is-valid")
    }

    const updateUser = () => {

        for (var k in currentUser) {
            if (k != "id") {
                if (currentUser[k] == "" || currentUser[k] == 'undefined') {

                    document.querySelector(`#${k}`).className = "form-control is-invalid";
                    invalid = 1;

                }

            }
        }
        if (invalid == 1) {
            return invalid = 0;
        }

        UserDataService.update(currentUser.id, currentUser)
            .then(response => {
                setMessage("O cliente foi atualizado com sucesso!");
                props.history.push(`/users/${currentUser.clientId}`);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteUser = () => {
        UserDataService.delete(currentUser.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/clients");
            })
            .catch(e => {
                console.log(e);
            });
    };
    const altSenha = () => {
        props.history.push(`/users_edit_password/${currentUser.id}`);
    };
    return (
        <div>
            {currentUser ? (
                <div className="edit-form">
                    <h4>User</h4>
                    <form>
                        <div className="form-group">
                            <div class="g-3 row">
                                <div class="col-sm-6">
                                    <label htmlFor="nome">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        required
                                        value={currentUser.nome}
                                        onChange={handleInputChange}
                                        name="nome"
                                    />
                                </div>

                                <div class="col-sm-6">
                                    <label htmlFor="sobrenome">Sobre nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="sobrenome"
                                        required
                                        value={currentUser.sobrenome}
                                        onChange={handleInputChange}
                                        name="sobrenome"
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="form-group">
                            <div class="g-3 row">
                                <div class="col-sm-6">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        required
                                        value={currentUser.email}
                                        onChange={handleInputChange}
                                        name="email"
                                    />
                                    <div class="invalid-feedback">
                                        Tem que ser email e não pode ser vazio
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <label htmlFor="telefone">Telefone</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="telefone"
                                        required
                                        value={currentUser.telefone}
                                        onChange={handleInputChange}
                                        name="telefone"
                                    />
                                    <div class="invalid-feedback">
                                        Não pode ser vazio
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <br></br>
                    <div class="g-3 row">
                        <div class="col-auto">
                            <button className="btn btn-danger" onClick={deleteUser}>
                                <i className="fas fa-trash action"></i>{' '}Deletar
                            </button>
                        </div>

                        <div class="col-auto">
                            <button
                                type="submit"
                                className="btn btn-success"
                                onClick={updateUser}
                            >
                                <i className="fas fa-edit action"></i>{' '}Atualizar
                            </button>
                        </div>
                        <div class="col-auto">
                            <button className="btn btn-warning" onClick={altSenha}>
                                <i className="fas fa-key action"></i>{' '}Alterar Senha
                            </button>
                        </div>
                    </div>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a User...</p>
                </div>
            )}
        </div>
    );
};

export default User;