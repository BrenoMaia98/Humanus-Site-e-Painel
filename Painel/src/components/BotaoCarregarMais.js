import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

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

class BotaoCarregarMais extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <Button onClick={this.props.onClick} variant="contained" size="medium" className = "App-Button" >
                    <FontAwesomeIcon icon={faArrowDown} size = "lg" style = {{color:'white', marginRight: '10px'}}/> <p style = {{color:'white', margin:0}}>Adicionar {this.props.nome}</p>
                </Button>
            </div>
        );
    }
}

BotaoCarregarMais.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const BotaoAdicionarWrapped = withStyles(styles)(BotaoCarregarMais);

export default BotaoAdicionarWrapped;