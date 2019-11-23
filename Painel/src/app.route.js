import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import Dashboard from './components/dashboard/PermanentDrawerLeft';
import Login from './views/login/Login';
import { auth } from './auth';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.isAuthenticated === true ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
    )} />
)


class AppRoute extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/" component={Dashboard} />
                </Switch>
            </Router>
        );
    }
}

export default AppRoute;