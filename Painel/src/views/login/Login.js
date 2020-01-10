import React from 'react';
import { Redirect } from "react-router-dom";
import { auth } from '../../auth';
import axios from 'axios';
import './login.css';


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
        }
    }



    async login(event) {
        event.preventDefault();
        try {

            const response = await axios.post(`${auth.baseURL}/Session/login`,
                {
                    "usuario": this.state.email,
                    "senha": this.state.senha
                },
            );
            if (!response.data.isError) {
                this.setState({ token: response.data.token },
                    () => {
                        auth.authenticate("admin", response.data.token, () => {
                            this.setState(() => ({
                                redirectToReferrer: true
                            }));
                        });
                    })
            } else {
                alert(response.data.message);
            }
        } catch (err) {
            alert(err);
            window.location.replace('/login');
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
            </div>
        );
    }
}

export default Login;