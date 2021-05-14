import React from 'react';
import {connect} from "react-redux";
import {createContract} from "../../services/contractServices";
import {history} from "../../index";
import "../../scss/createFroms.scss"
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

class CreateContract extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            number: null,
            dateStart: null,
            dateEnd: null,
            client: null,
            car: null,
        }
    }


    componentWillMount() {
        // componentWillMount() {
        const props = this.props
        // debugger
        if (props.location && props.location.state) {
            const contract = props.location.state.contract
            this.setState({
                id: contract.id,
                number: contract.number,
                dateStart: contract.dateStart,
                dateEnd: contract.dateEnd,
                client: contract.client,
                car: contract.car,
            })
        }
    }


    handleReset(e) {
        e.preventDefault()
        history.push({pathname: "/contracts"})
        this.setState({
            number: null,
            dateStart: null,
            dateEnd: null,
            client: null,
            car: null,
        })
    }

    handleOnValueChange(e) {
        console.log(e.target.id)
        console.log(e.target.value)
        this.setState({
                [e.target.id]: e.target.value,
            }
        )
    }

    handleSubmit(e) {
        debugger
        e.preventDefault();
        if (
            this.state.number == null ||
            this.state.dateStart == null ||
            this.state.dateEnd == null ||
            this.state.client == null ||
            this.state.car == null
        )
            alert("Не все поля заполнены!!")
        else
            this.props.onAdd(this.state)
    }

    render() {

        return (
            <div className={"content"}>
                <form className="content__create-form" onSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={2} justify={"center"}>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField
                                variant="outlined"
                                label="Номер договора"
                                onChange={this.handleOnValueChange.bind(this)} id="number"
                                value={this.state.number}
                                type="text"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}/>

                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField
                                variant="outlined"
                                label="Дата выезда"
                                fullWidth
                                onChange={this.handleOnValueChange.bind(this)} id="dateStart"
                                value={this.state.dateStart}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}/>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField
                                variant="outlined"
                                label="Дата заезда"
                                fullWidth
                                onChange={this.handleOnValueChange.bind(this)} id="dateEnd"
                                value={this.state.dateEnd}
                                placeholder="dateEnd" type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}/>

                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <select onChange={this.handleOnValueChange.bind(this)} id="car">
                                <option disabled selected value> -- select an option --</option>
                                {this.props.cars.map((car) => {
                                    return (
                                        <option
                                            fullWidth
                                            id="client"
                                            value={car.id}
                                            selected={(this.state?.car?.id === car.id) ? "selected" : false}>
                                            {car.id} - {car.carNumber} {car.carModel} {car.carMake}</option>
                                    )
                                })
                                }
                            </select>
                        </Grid>
                        {/**/}
                        <Grid item xs={12} md={12} lg={12}>
                            <select onChange={this.handleOnValueChange.bind(this)} id="client">
                                <option disabled selected value> -- select an option --</option>
                                {this.props.clients.map((client) => {
                                    return (
                                        <option
                                            id="client"
                                            value={client.id}
                                            selected={(this.state?.client?.id === client.id) ? "selected" : false}>
                                            {client.id} - {client.firstName} {client.lastName}</option>
                                    )
                                })
                                }
                            </select>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                // type="submit"
                            >
                                Создать
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Button
                                size="large"
                                variant="contained"
                                color="secondary"
                                type="button"
                                fullWidth
                                onClick={(e) => this.handleReset(e)}>
                                Закрыть
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
};


const mapStateToProps = (state) => {
    return {
        error: state.contractsData.error,
        cars: state.carsData.cars || [],
        clients: state.clientsData.clients || []
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (contract) => {
            dispatch(createContract(contract));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContract);