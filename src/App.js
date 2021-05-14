import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.scss';

import {history} from "./index";

import Nav from "./components/main/Nav"
import Cars from "./components/Car/Cars";
import Clients from "./components/Client/Clients";
import Contracts from "./components/Contract/Contracts";
import Report from "./components/Contract/Report";
import CreateCar from "./components/Car/CreateCar";
import CreateClient from "./components/Client/CreateClient";
import CreateContract from "./components/Contract/CreateContract";
import Statistic from "./components/Statistic/Statistic";
import Author from "./components/Author/Author";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pathname: '',
    }
    this.notifyPathname = this.notifyPathname.bind(this)
  }

  notifyPathname(pathname) {
    this.setState({
      pathname: pathname,
    })
  }

  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <div className="App__head">
              <div className="App__head__menu" onClick={() => {history.push('/')}}>Машины</div>
              <div className="App__head__menu" onClick={() => {history.push('/clients')}}>Клиенты</div>
              <div className="App__head__menu" onClick={() => {history.push('/contracts')}}>Договора</div>
              <div className="App__head__menu" onClick={() => {history.push('/report')}}>Отчет</div>
              <div className="App__head__menu" onClick={() => {history.push('/stat')}}>Статистика</div>
              <div className="App__head__menu" onClick={() => {history.push('/author')}}>Об авторе</div>
            </div>
            <div className="App__content">
              <BrowserRouter>
                <Nav
                    notifyPathname={this.notifyPathname}
                    pathname={this.state.pathname}
                />
                <Switch>
                  <Route path="/edit/:id"
                         exact
                         car={this.state.car}
                         component={(props) => <CreateCar {...props}/>}
                  />

                  <Route path="/create"
                         exact
                         component={() => <CreateCar/>}
                  />

                  <Route path="/"
                         exact
                         component={() => <Cars/>}
                  />

                  <Route path="/clients"
                         exact
                         component={() => <Clients/>}
                  />

                  <Route path="/contracts"
                         exact
                         component={() => <Contracts/>}
                  />
                  <Route path="/report"
                         exact
                         component={() => <Report/>}
                  />



                  <Route path="/client/edit/:id"
                         exact
                         car={this.state.car}
                         component={(props) => <CreateClient {...props}/>}
                  />

                  <Route path="/clients/create"
                         exact
                         component={() => <CreateClient/>}
                  />

                  <Route path="/contract/create"
                         exact
                         component={() => <CreateContract/>}
                  />

                  <Route path="/contract/edit/:id"
                         exact
                         contract={this.state.contract}
                         component={(props) => <CreateContract {...props}/>}
                  />

                  <Route path="/stat"
                         exact
                         component={() => <Statistic/>}
                  />

                  <Route path="/author"
                         exact
                         component={() => <Author/>}
                  />

                  {/*<Route path="/car"*/}
                  {/*       exact*/}
                  {/*       component={() => <CarDash/>}*/}
                  {/*/>*/}

                </Switch>
              </BrowserRouter>
            </div>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
