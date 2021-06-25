import React, { useState, useEffect, useMemo, useRef } from "react";
import ClientDataService from "../services/ClientService";

import { Link } from "react-router-dom";
import { useTable } from "react-table";

const ClientsList = (props) => {
    const [clients, setClients] = useState([]);
    // const [currentClient, setCurrentClient] = useState(null);
    // const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const clientsRef = useRef();
    clientsRef.current = clients;
    useEffect(() => {
        retrieveClients();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveClients = () => {
        ClientDataService.getAll()
            .then(response => {
                setClients(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveClients();
        // setCurrentClient(null);
        // setCurrentIndex(-1);
    };

    // const setActiveClient = (client, index) => {
    //     setCurrentClient(client);
    //     setCurrentIndex(index);
    // };

    const deleteAllClients = () => {
        ClientDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        ClientDataService.findByTitle(searchTitle)
            .then(response => {
                setClients(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const openClient = (rowIndex) => {
        const id = clientsRef.current[rowIndex].id;

        props.history.push("/clients/" + id);
    };

    const deleteClient = (rowIndex) => {
        const id = clientsRef.current[rowIndex].id;

        ClientDataService.delete(id)
            .then((response) => {
                props.history.push("/clients");

                let newClients = [...clientsRef.current];
                newClients.splice(rowIndex, 1);

                setClients(newClients);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const columns = useMemo(
        () => [
            {
                Header: "Nome Fantasia",
                accessor: "nome_fantasia",
            },
            {
                Header: "CNPJ",
                accessor: "cnpj",
            },
            {
                Header: "Endereço",
                accessor: "endereco",
            },
            {
                Header: "Numero",
                accessor: "numero",
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            <button
                                className="btn btn-success btn-sm"
                                type="button"
                            // onClick={() => deleteClient(rowIdx)}

                            >
                                <i className="fas fa-user action"></i>{' '}
                                Clientes
                            </button >{' '}

                            <button
                                className="btn btn-warning btn-sm"
                                type="button"
                                onClick={() => openClient(rowIdx)}

                            >
                                <i className="far fa-edit action mr-2"></i>{' '}
                                Editar
                            </button >{' '}

                            <button
                                className="btn btn-danger btn-sm"
                                type="button"
                                onClick={() => deleteClient(rowIdx)}

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
        data: clients,
    });
    
    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
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
                <Link to="/add">
                    <button className="btn btn-sm btn-success">
                        <i className="fas fa-store-alt action"></i>{' '}Adicionar cliente
                    </button>
                </Link>{' '}
                <button className="btn btn-sm btn-danger" onClick={deleteAllClients}>
                    <i className="fas fa-trash action"></i>{' '}Deletar tudo
                </button>
            </div>
        </div>
    );
};

export default ClientsList;