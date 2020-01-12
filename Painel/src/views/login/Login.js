import React from 'react';
import { Redirect } from "react-router-dom";
import { auth } from '../../auth';
import axios from 'axios';
import './login.css';

import Modal from "../../components/modal/index"


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            redirectToReferrer: false,
            email: '',
            senha: '',
            tipo: 'admin',
            token: "",
            modal2: false,
            loginModal:false,
        }
    }



    async login(event) {
        event.preventDefault();
        try {

            const response = await axios.post(`${auth.baseURL}/Session/login`,
                { "usuario": this.state.email, "senha": this.state.senha },
            );
            if (!response.data.isError) {
                this.setState({ token: response.data.token },
                    () => {
                        auth.authenticate("admin", response.data.token,
                            () => { this.setState(() => ({ redirectToReferrer: true })); }
                        );
                    })
            } else
                this.setState({ loginModal: true })

        } catch (err) {
            this.setState({ modal2: true });
        }
    }

    render() {
        //remover linha abaixo depois de terminar o desenvolvimento
        // const { from } = this.props.location.state || { from: { pathname: '/INICIO' } }; 
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer === true) {
            //return <Redirect to={from} />
            return <Redirect to={{ pathname: '/INICIO' }} />
        }

        return (
            <div className="container">
                <div className="bg">

                    <div className="AppLogin">
                        <div className="App__Form">
                            <div className="FormTitle">
                                <a href="#" className="FormTitle__Link FormTitle__Link--Active">Login Administrador</a>
                            </div>
                            <div className="FormCenter">
                                <form onSubmit={this.login}>
                                    <div className="FormField">
                                        <label className="FormField__Label" htmlFor="name">Usuário</label>
                                        <input type="text" id="name" className="FormField__Input" placeholder="Entre com o usuário" name="name" onChange={(event) => this.setState({ email: event.target.value })} />
                                    </div>
                                    <div className="FormField">
                                        <label className="FormField__Label" htmlFor="password">Senha</label>
                                        <input type="password" id="password" className="FormField__Input" placeholder="Entre com a senha" name="password" onChange={(event) => this.setState({ senha: event.target.value })} />
                                    </div>
                                    <br />
                                    <div className="FormField">
                                        <button className="FormField__Button alignbutton">Entrar</button>
                                    </div>

                                </form>
                            </div>
                            <div className="ejcomp">© 2019 - Desenvolvido por EJComp | Empresa Júnior da Computação.</div>
                        </div>
                    </div>
                </div>
                <Modal visible={this.state.modal2} effect="modal" onClickAway={() => this.close('modal2')}>
                <div className="Modal">
                    <h1 className="Modal__title">Erro</h1>
                    <h4 className="Modal__data">Ocorreu um erro na conexão, por favor tente mais tarde, caso o erro persista, contate a empresa EJCOMP.</h4>
                    <a onClick={() => this.setState({ modal2: false })}>Ok</a>
                </div>
            </Modal>

            <Modal visible={this.state.loginModal} effect="modal" onClickAway={() => this.close('modal2')}>
                <div className="Modal">
                    <h1 className="Modal__title">Erro</h1>
                    <h4 className="Modal__data">Usuário ou senha incorretos</h4>
                    <a onClick={() => this.setState({ loginModal: false })}>Ok</a>
                </div>
            </Modal>
            </div>
            
        );
    }
}

export default Login;