import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
/* importa el objeto lottery para poder traer o subir datos del contrato deployado en la red */
import lottery from './lottery';

class App extends Component {
  /* esto entra en el constructor de App */
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  /* metodo de ciclo de vida de react, llama a este metodo una vez que ya renderizo el template */
  async componentDidMount() {
    /* no hay que especificar en call la propiedad from, ya que usa la cuenta que provee metamask cuando inyecta web3 y provider en el navegador */
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    /* una vez que llama al metodo manager, actualiza el valor que se creo en el constructor */
    this.setState({manager, players, balance});
  }

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Aguardando que la transacción se confirme...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have been entered!'});
  };

  onClick = async event => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Una petición ha sido realizada!'});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'Una autorización ha sido realizada!'});
  }

  render() {
    return (
      <div className="App container">
        <h1>UI USUARIO</h1>
        <hr />

        <form onSubmit={this.onSubmit}>
        <h4>Generar peticion</h4>
          <div>
          <label>Ingresar RUT:</label><br/>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button type="button" className="btn btn-primary btn-lg" onClick={this.onClick}>PETICIONAR</button>
        </form>
        <hr/>
        <h1>UI USUARIO</h1>
        <h4>Listo para autorizar?</h4>
        <button type="button" className="btn btn-primary btn-lg">AUTORIZAR</button>

        <hr/>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
