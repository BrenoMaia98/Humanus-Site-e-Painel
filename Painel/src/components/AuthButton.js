import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../auth';


const AuthBtn = withRouter(({ history }) => (
      <button onClick={() => {
        auth.signout(() => history.push('/'))
      }}><FontAwesomeIcon icon={faDoorOpen} size="lg" className="App-icon" /></button>
));

class AuthButton extends Component {

    render() {
        return (
            <AuthBtn />
        );
    }
}

export default AuthButton;