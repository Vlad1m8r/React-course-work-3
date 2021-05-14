import React from 'react';
import {connect} from "react-redux";
import {fetchCars, deleteCars} from "../../services/carServices";
import "../../scss/Table.scss"
import "../../scss/AddBtn.scss"
import {history} from "../../index";
import Button from '@material-ui/core/Button';
import {color} from "chart.js/helpers";

class Cars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillMount() {
        this.props.onFetch() ///Must have
    }

    handleEdit(car) {
        debugger
        history.push({
            pathname: `/edit/${car.id}`,
            state: {
                car: car,
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
                                onClick={() => history.push('/create')}>
                                Добавить
                            </Button>
                        </div>
                    </div>
                    <table>
                        <thead>
                        <tr>

                            <th onClick={() => this.props.sortById(this.props.sortByIdBool)}>#</th>
                            <th>VIN номер</th>
                            <th>Номер</th>
                            <th>Модель</th>
                            <th>Производитель</th>
                            <th>Цена</th>
                            <th>Цвет</th>
                            <th>Год выпуска</th>
                            <th>Тип</th>
                            <th>Действие</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.cars.map(
                                (car) =>
                                    <tr key={car.id}>

                                        <td>{car.id}</td>
                                        <td>{car.carVIN}</td>
                                        <td>{car.carNumber}</td>
                                        <td>{car.carModel}</td>
                                        <td>{car.carMake}</td>
                                        <td>{car.cost}</td>
                                        <td>{car.carColor} </td>
                                        <td>{car.carModelYear}</td>
                                        <td>{car.type}</td>
                                        <td>
                                            <div className="btn">
                                                <button className="btn__danger"
                                                        onClick={() => this.props.onDelete(car.id)}>
                                                    Удалить
                                                </button>
                                                <button className="btn__default"
                                                        onClick={() => this.handleEdit(car)}>
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
        cars: state.carsData.cars || [],
        error: state.carsData.error,
        isLoading: state.carsData.isLoading,
        sortByIdBool: state.carsData.sortByIdBool,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => {
            dispatch(fetchCars())
        },
        onDelete: (id) => {
            dispatch(deleteCars(id))
        },
        sortById: (data) => {
            dispatch({type: "СОРТИРОВКА_ПО_ID_CAR", payload: data})
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cars);