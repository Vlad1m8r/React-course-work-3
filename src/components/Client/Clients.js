import React from 'react';
import {connect} from "react-redux";
import {fetchClients, deleteClient} from "../../services/clientServices";
import "../../scss/Table.scss"
import "../../scss/AddBtn.scss"
import {history} from "../../index";
import Button from "@material-ui/core/Button";

class Clients extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillMount() {
        this.props.onFetch() ///Must have
    }

    handleEdit(client) {
        // debugger
        history.push({
            pathname: `/client/edit/${client.id}`,
            state: {
                client: client,
            }
        })
    }

    render() {
        return (
            <div className={"main"}>
                <div className="content">
                    <div className="content__actions">
                        <div className="content__actions__btn">
                            <Button
                                size="large"
                                variant="contained"
                                className="btn__add"
                                color={"primary"}
                                    onClick={() => history.push('/clients/create')}>
                                Добавить
                            </Button>
                        </div>
                    </div>
                    <table>
                        <thead>
                        <tr>

                            <th onClick={() => this.props.sortById(this.props.sortByIdBool)}>#</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Номер телефона</th>
                            <th>Страховой номер</th>
                            <th>Почта</th>
                            <th>Действие</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.clients.map(
                                (client) =>
                                    <tr key={client.id}>

                                        <td>{client.id}</td>
                                        <td>{client.firstName}</td>
                                        <td>{client.lastName}</td>
                                        <td>{client.phoneNumber}</td>
                                        <td>{client.ssn}</td>
                                        <td>{client.email}</td>
                                        <td>
                                            <div className="btn">
                                                <button className="btn__danger"
                                                        onClick={() => this.props.onDelete(client.id)}>
                                                    Удалить
                                                </button>
                                                <button className="btn__default"
                                                        onClick={() => this.handleEdit(client)}>
                                                    Изменить
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        clients: state.clientsData.clients || [],
        error: state.clientsData.error,
        isLoading: state.clientsData.isLoading,

        sortByIdBool: state.clientsData.sortByIdBool,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => {
            dispatch(fetchClients())
        },
        onDelete: (id) => {
            dispatch(deleteClient(id))
        },
        sortById: (data) => {
            dispatch({type: "СОРТИРОВКА_ПО_ID_CLIENT", payload: data})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients);