import React from 'react';
import {connect} from "react-redux";
import {fetchContracts, deleteContract} from "../../services/contractServices";
import "../../scss/Table.scss"
import "../../scss/AddBtn.scss"
import {history} from "../../index";
import Button from "@material-ui/core/Button";

class Contracts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillMount() {
        this.props.onFetch() ///Must have
    }

    handleEdit(contract) {
        history.push({
            pathname: `/contract/edit/${contract.id}`,
            state: {
                contract: contract,
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
                                onClick={() => history.push('/contract/create')}>
                                Добавить
                            </Button>
                        </div>
                    </div>
                    <div className="main__content__table">
                        <table>
                            <thead>
                            <tr>

                                <th onClick={() => this.props.sortById(this.props.sortByIdBool)}>#</th>
                                <th>Номер договора</th>
                                <th>Дата выезда</th>
                                <th>Дата заезда</th>
                                <th>Код клиента</th>
                                <th>Код машины</th>
                                <th>Действие</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.contracts.map(
                                    (contract) =>
                                        <tr key={contract.id}>

                                            <td>{contract.id}</td>
                                            <td>{contract.number}</td>
                                            <td>{contract.dateStart}</td>
                                            <td>{contract.dateEnd}</td>
                                            <td>{contract.client?.id}</td>
                                            <td>{contract.car?.id}</td>
                                            <td>
                                                <div className="btn">
                                                    <button className="btn__danger"
                                                            onClick={() => this.props.onDelete(contract.id)}>
                                                        Удалить
                                                    </button>
                                                    <button className="btn__default"
                                                            onClick={() => this.handleEdit(contract)}>
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
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    debugger
    return {
        contracts: state.contractsData.contracts || [],
        error: state.contractsData.error,
        isLoading: state.contractsData.isLoading,
        sortByIdBool: state.contractsData.sortByIdBool,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => {
            dispatch(fetchContracts())
        },
        onDelete: (id) => {
            dispatch(deleteContract(id))
        },
        sortById: (data) => {
            dispatch({type: "СОРТИРОВКА_ПО_ID_CONTRACT", payload: data})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contracts);