import React from 'react';
import {connect} from "react-redux";
import {createClient} from "../../services/clientServices";
import {history} from "../../index";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../../scss/createFroms.scss"

class CreateClient extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            lastName: null,
            phoneNumber: null,
            ssn: null,
            email: null,
        }
    }


    componentWillMount() {
        // componentWillMount() {
        const props = this.props
        // debugger
        if (props.location && props.location.state) {
            const client = props.location.state.client
            this.setState({
                id: client.id,
                firstName: client.firstName,
                lastName: client.lastName,
                phoneNumber: client.phoneNumber,
                ssn: client.ssn,
                email: client.email,
            })
        }
    }


    handleReset(e) {
        e.preventDefault()
        history.push({pathname: "/clients"})
        this.setState({
            firstName: null,
            lastName: null,
            phoneNumber: null,
            ssn: null,
            email: null,
        })
    }

    handleOnValueChange(e) {
        this.setState({
                [e.target.id]: e.target.value,
            }
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        if (
            this.state.firstName == null ||
            this.state.lastName == null ||
            this.state.phoneNumber == null ||
            this.state.ssn == null ||
            this.state.email == null
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
                            <TextField onChange={this.handleOnValueChange.bind(this)} id="firstName"
                                       value={this.state.firstName}
                                       type="text"
                                       variant="outlined" label="Имя"
                                       fullWidth
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField onChange={this.handleOnValueChange.bind(this)} id="lastName"
                                       value={this.state.lastName}
                                       type="text"
                                       variant="outlined" label="Фамилия"
                                       fullWidth
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField onChange={this.handleOnValueChange.bind(this)} id="phoneNumber"
                                       value={this.state.phoneNumber}
                                       type="text"
                                       variant="outlined" label="Номер телефона"
                                       fullWidth
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField onChange={this.handleOnValueChange.bind(this)} id="ssn" value={this.state.ssn}
                                       type="text"
                                       variant="outlined" label="Страховой"
                                       fullWidth
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField onChange={this.handleOnValueChange.bind(this)} id="email"
                                       value={this.state.email}
                                       type="email"
                                       variant="outlined" label="Email"
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
        error: state.clientsData.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (client) => {
            dispatch(createClient(client));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClient);