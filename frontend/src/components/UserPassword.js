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


        if (currentUser.senha !=  currentUser.confirma_senha) {
            return(alert("Campos de Senha e Confima Senha inválidos"));
        }

        UserDataService.updateSenha(currentUser.id, currentUser)
            .then(response => {
                setMessage("O cliente foi atualizado com sucesso!");
                props.history.push(`/users_edit/${currentUser.id}`);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const cancelar = () => {
        props.history.push(`/users_edit/${currentUser.id}`);
    };

    return (
        <div>
            {currentUser ? (
                <div className="edit-form">
                    <h4>Nova senha</h4>
                    <form>
                        <div className="form-group">
                            <div class="g-3 row">
                                <div class="col-sm-6">
                                    <label htmlFor="senha">Nove Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="senha"
                                        required
                                        onChange={handleInputChange}
                                        name="senha"
                                    />
                                </div>

                                <div class="col-sm-6">
                                    <label htmlFor="confirma_senha">Confirmar nova senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirma_senha"
                                        required
                                        value={currentUser.confirma_senha}
                                        onChange={handleInputChange}
                                        name="confirma_senha"
                                    />
                                </div>

                            </div>
                        </div>
                    </form>
                    <br></br>
                    <div class="g-3 row">
                        <div class="col-auto">
                            <button className="btn btn-secondary" onClick={cancelar}>
                                <i className="fas fa-arrow-left action"></i>{' '}Cancelar
                            </button>
                        </div>

                        <div class="col-auto">
                            <button
                                type="submit"
                                className="btn btn-success"
                                onClick={updateUser}
                            >
                                <i className="fas fa-edit action"></i>{' '}Atualizar Senha
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