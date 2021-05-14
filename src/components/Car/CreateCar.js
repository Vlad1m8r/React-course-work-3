import React from 'react';
import {connect} from "react-redux";
import {createCar} from "../../services/carServices";
import {history} from "../../index";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import "../../scss/createFroms.scss"

class CreateCar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            carVIN: null,
            carNumber: null,
            carModel: null,
            carMake: null,
            cost: null,
            type: null,
            carColor: null,
            carModelYear: null
        }
    }


    componentWillMount() {
        // componentWillMount() {
        const props = this.props
        debugger
        if (props.location && props.location.state) {
            const car = props.location.state.car
            this.setState({
                id: car.id,
                carVIN: car.carVIN,
                carNumber: car.carNumber,
                carModel: car.carModel,
                carMake: car.carMake,
                cost: car.cost,
                type: car.type,
                carColor: car.carColor,
                carModelYear: car.carModelYear
            })
        }
    }


    handleReset(e) {
        e.preventDefault()
        history.push({pathname: "/"})
        this.setState({
            carVIN: null,
            carNumber: null,
            carModel: null,
            carMake: null,
            cost: null,
            type: null,
            carColor: null,
            carModelYear: null
        })
    }

    handleOnValueChange(e) {
        console.log(e.target.value)
        console.log(e.target.id)
        this.setState({
                [e.target.id]: e.target.value,
            }
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        debugger
        if (
            this.state.carVIN === null || this.state.carVIN === "" ||
            this.state.carNumber === null || this.state.carNumber === "" ||
            this.state.carModel === null || this.state.carModel === "" ||
            this.state.carMake === null || this.state.carMake === "" ||
            this.state.cost === null || this.state.cost === "" ||
            this.state.type === null || this.state.type === "" ||
            this.state.carColor === null || this.state.carColor === ""
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
                            <TextField onChange={this.handleOnValueChange.bind(this)} id="carVIN"
                                       value={this.state.carVIN}
                                       type="text"
                                       variant="outlined" label="VIN номер"
                                       fullWidth
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField onChange={this.handleOnValueChange.bind(this)} id="carNumber"
                                       value={this.state.carNumber}
                                       type="text"
                                       variant="outlined" label="Номер"
                                       fullWidth
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField onChange={this.handleOnValueChange.bind(this)} id="carModel"
                                       value={this.state.carModel}
                                       type="text"
                                       variant="outlined" label="Модель"
                                       fullWidth
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField onChange={this.handleOnValueChange.bind(this)} id="carMake"
                                       value={this.state.carMake}
                                       type="text"
                                       variant="outlined" label="Производитель"
                                       fullWidth
                                       InputLabelProps={{
                                           shrink: true,
                                       }}/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField onChange={this.handleOnValueChange.bind(this)} id="cost" value={this.state.cost}
                                       type="text"
                                       variant="outlined" label="Цена"
                                       fullWidth
                                       InputLabelProps={{
                                           shrink: true,
                                       }}/>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            {/*<InputLabel itemID={"type"} id={"type"}>Выберите тип машины</InputLabel>*/}

                            <select onChange={this.handleOnValueChange.bind(this)} id="type">
                                <option disabled selected value> -- select an option --</option>
                                <option id="type" value={"Средний"}
                                        selected={this.state.type === "Средний" ? "selected" : false}>
                                    Средний
                                </option>
                                <option id="type" value={"Бизнес"}
                                        vselected={this.state.type === "Бизнес" ? "selected" : false}>
                                    Бизнес
                                </option>
                                <option id="type" value={"Премиум"}
                                        vselected={this.state.type === "Премиум" ? "selected" : false}>
                                    Премиум
                                </option>
                            </select>

                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <TextField onChange={this.handleOnValueChange.bind(this)} id="carColor"
                                       value={this.state.carColor || "black"}
                                       type="color"
                                       variant="outlined" label="Цвет"
                                       fullWidth
                                       InputLabelProps={{
                                           shrink: true,
                                       }}/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField onChange={this.handleOnValueChange.bind(this)} id="carModelYear"
                                       value={this.state.carModelYear}
                                       type="text"
                                       variant="outlined" label="Год выпуска"
                                       fullWidth
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            />

                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >Создать</Button>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Button
                                size="large"
                                variant="contained"
                                color="secondary"
                                type="button"
                                fullWidth
                                onClick={(e) => this.handleReset(e)}
                            >Закрыть
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
        error: state.carsData.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (car) => {
            dispatch(createCar(car));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCar);