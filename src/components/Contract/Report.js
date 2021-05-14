import React from 'react';
import {connect} from "react-redux";
import {fetchContracts, deleteContract} from "../../services/contractServices";
import "../../scss/Table.scss"
import {history} from "../../index";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

class Report extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillMount() {
        this.props.onFetch() ///Must have
    }

    // handleEdit(contract) {
    //     history.push({
    //         pathname: `/edit/${contract.id}`,
    //         state: {
    //             user: contract,
    //         }
    //     })
    // }                        ///Must have

    getRow (contract) {
        debugger
        let row = []
        const days = Math.ceil(Math.abs((
            new Date(contract.dateEnd)).getTime() -
            (new Date(contract.dateStart)).getTime()) / (1000 * 3600 * 24))

        if (contract.client?.id && contract.car?.id) {
            row.push(<td>{contract.number}</td>)
            row.push(<td>{contract.client.firstName} {contract.client.lastName}</td>)
            row.push(<td>{contract.dateStart}</td>)
            row.push(<td>{contract.dateEnd}</td>)
            row.push(<td>{days}</td>)
            row.push(<td>{contract.car.cost}</td>)
            row.push(<td>{contract.car.cost*days}</td>)
            // row.push(<td>{contract.car.carVIN}</td>)
            row.push(<td>{contract.car.carNumber}</td>)
            // row.push(<td>{contract.car.carModel}</td>)
            return (<tr>{row}</tr>)
        }

    }

    render() {
        return (
            <div className={"main"}>
                <div className="content">
                    <div className="content__actions">


                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Номер договора</th>
                            <th>
                                <InputLabel htmlFor="searchNumber" />
                                <Input
                                    placeholder={"Поиск по ФИО клиента"}
                                    id="searchNumber"
                                    onChange={(e) => this.props.searchByName(e.target.value)}
                                    startAdornment={
                                        <InputAdornment position="end">
                                            <SearchIcon/>
                                        </InputAdornment>
                                    }
                                /><p>ФИО клиента</p></th>
                            <th>Дата выезда</th>
                            <th>Дата заезда</th>
                            <th>Итого дней</th>
                            <th>Цена за сутки</th>
                            <th>Итого цена</th>
                            {/*<th>VIN номер</th>*/}
                            <th>Номер машины</th>
                            {/*<th>Марка</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.contracts.map(
                                (contract) =>
                                    this.getRow(contract)
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
        contracts: state.contractsData.contracts || [],
        error: state.contractsData.error,
        isLoading: state.contractsData.isLoading,
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

        searchByName : (data) => {
            dispatch({type: "ПОИСК_ПО_ИМЕНИ", payload: data})
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);