import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class BotaoVoltar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '/'+ this.props.link
        }
    }
    
    
    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
      this.props.onRef(this)
    }

    clicar(){
         document.getElementById("retornar").click();
    }

    render() {


        return (
            <div>
                <NavLink to={this.state.link}>
                    <Button id = {"retornar"} variant="contained" size="medium" className = "App-Button">    
                        <FontAwesomeIcon icon={faUndo} size = "lg" style = {{color:'white'}}/> <p style = {{color:'white', margin:0}}>Retornar</p>
                    </Button>
                </NavLink>
            </div>
        );
    }
}

BotaoVoltar.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const BotaoVoltarWrapped = withStyles(styles)(BotaoVoltar);

export default BotaoVoltarWrapped;