import React, { useState } from "react";
import UserDataService from "../services/UserService";
import { useParams } from "react-router-dom";

const AddUser = () => {
    const { id } = useParams()
    const initialUserState = {
        id: null,
        nome: "",
        sobrenome: "",
        telefone: `undefined`,
        email: "",
        senha: "",
        clientId: id
    };
    let invalid=0
    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        validado(name);
        setUser({ ...user, [name]: value });
    };
    const validado = (name) => {
        return (document.querySelector(`#${name}`).className = "form-control is-valid")
    }
   
    const saveUser = () => {
        
        for(var k in user) {
            if(k!="id"){
                if(user[k]==""||user[k]=='undefined'){                    
                    document.querySelector(`#${k}`).className = "form-control is-invalid";
                    invalid=1;                             
                }
                if (user.senha != user.confirma_senha || user.senha == "") {            
                        document.querySelector("#senha").className = "form-control is-invalid";
                        document.querySelector("#confirma_senha").className = "form-control is-invalid";   
                        invalid =1;                          
                }                
            }            
         }
        if(invalid==1){
            return invalid=0;
        }
   
        var data = {
            nome: user.nome,
            sobrenome: user.sobrenome,
            telefone: user.telefone,
            email: user.email,
            senha: user.senha,
            clientId: user.clientId,
        };

        UserDataService.create(data)
            .then(response => {
                setUser({
                    id: response.data.id,
                    nome: response.data.nome,
                    sobrenome: response.data.sobrenome,
                    telefone: response.data.telefone,
                    email: response.data.email,
                    senha: response.data.senha,
                    clientId: response.data.clientId
                });
                setSubmitted(true);                
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newUser = () => {
        setUser(initialUserState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Usuário adicionado com sucesso!</h4>
                    <button className="btn btn-success" onClick={newUser}>
                        Adicionar mais
                    </button>
                </div>
            ) : (
                <div>
                    <input
                        type="hidden"
                        className="form-control"
                        id="clientId"
                        required
                        value={user.clientId}
                        onChange={handleInputChange}
                        name="clientId"
                    />
                    <div className="form-group">
                        <div class="g-3 row">
                            <div class="col-sm-4">
                                <label htmlFor="nome">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nome"
                                    required
                                    value={user.nome}
                                    onChange={handleInputChange}
                                    name="nome"
                                />
                                <div class="invalid-feedback">
                                    Não pode ser vazio
                                </div>
                            </div>
                            <div class="col-sm-8">
                                <label htmlFor="sobrenome">Sobrenome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="sobrenome"
                                    required
                                    value={user.sobrenome}
                                    onChange={handleInputChange}
                                    name="sobrenome"
                                />
                                <div class="invalid-feedback">
                                    Não pode ser vazio
                                </div>
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
                                    value={user.email}
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
                                    value={user.telefone}
                                    onChange={handleInputChange}
                                    name="telefone"
                                />
                                <div class="invalid-feedback">
                                    Não pode ser vazio
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div class="g-3 row">
                            <div class="col-sm-6">
                                <label htmlFor="senha">Senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="senha"
                                    required
                                    value={user.senha}
                                    onChange={handleInputChange}
                                    name="senha"
                                />
                                <div class="invalid-feedback">
                                    Campo de senha incorreto
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label htmlFor="confirma_senha">Confirmar senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirma_senha"
                                    required
                                    value={user.confirma_senha}
                                    onChange={handleInputChange}
                                    name="confirma_senha"
                                />
                                <div class="invalid-feedback">
                                    Campo de confirmação não bate com senha
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div class="d-grid gap-2 col-sm-6 mx-auto">
                        <button onClick={saveUser} type="button" className="btn btn-success">
                            <i className="fas fa-save action"></i>{' '}Salvar Usuário
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddUser;