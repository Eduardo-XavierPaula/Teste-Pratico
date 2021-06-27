import React, { useState, useEffect, useMemo, useRef } from "react";
import UserDataService from "../services/UserService";

import { Link, useParams  } from "react-router-dom";
import { useTable } from "react-table";

const UsersList = (props) => {
    const [users, setUsers] = useState([]);
    const { id } = useParams()
    const [searchTitle, setSearchTitle] = useState("");
    const usersRef = useRef();
    // const location = useLocation();
    
    usersRef.current = users;
    useEffect(() => {              
        retrieveUsers();        
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };
    
    const retrieveUsers = () => {
        
        // console.log(id)
        UserDataService.getAll(id)
            .then(response => {
                setUsers(response.data);
                // console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveUsers();
    };



    const deleteAllUsers = () => {
        
        UserDataService.deleteAll(id)
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        UserDataService.findByTitle(id,searchTitle)
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const openUser = (rowIndex) => {
        const userId = usersRef.current[rowIndex].id;
        props.history.push("/users_edit/" + userId);
    };

    const deleteUser = (rowIndex) => {
        const userId = usersRef.current[rowIndex].id;
        const url ="/users/"+id;
        UserDataService.delete(userId)
            .then((response) => {
                props.history.push(url);

                let newUsers = [...usersRef.current];
                newUsers.splice(rowIndex, 1);

                setUsers(newUsers);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const columns = useMemo(
        () => [
            {
                Header: "Nome",
                accessor: "nome",
            },
            {
                Header: "Sobrenome",
                accessor: "sobrenome",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Telefone",
                accessor: "telefone",
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {

                    const rowIdx = props.row.id;
                    return (
                        <div>

                            <button
                                className="btn btn-warning btn-sm"
                                type="button"
                                onClick={() => openUser(rowIdx)}

                            >
                                <i className="far fa-edit action mr-2"></i>{' '}
                                Editar
                            </button >{' '}

                            <button
                                className="btn btn-danger btn-sm"
                                type="button"
                                onClick={() => deleteUser(rowIdx)}

                            >
                                <i className="fas fa-trash action"></i>{' '}
                                Deletar
                            </button >

                        </div>
                    );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: users,
    });

    return (

        <div className="list row">

            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Procurar pelo nome"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            <i className="fas fa-search action"></i>{' '}Pesquisar
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-12 list">
                <table
                    className="table table-striped table-bordered"
                    {...getTableProps()}
                >
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="col-md-8">
                <Link to={"/users_add/"+id}>
                    <button className="btn btn-sm btn-success">
                        <i className="fas fa-user-plus action"></i>{' '}Adicionar usuario
                    </button>
                </Link>{' '}
                <button className="btn btn-sm btn-danger" onClick={deleteAllUsers}>
                    <i className="fas fa-trash action"></i>{' '}Deletar tudo
                </button>
            </div>
        </div>
    );
};

export default UsersList;