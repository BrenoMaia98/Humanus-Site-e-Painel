import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../images/logo.png';
import AuthButton from '../AuthButton';


import DashboardRouter from './dashboard.route';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import {auth} from '../../auth';


const Menu = ['INICIO', 'EDITAR FOTO GESTÃO', 'SERVIÇOS E PROJETOS', 'POSTAGEM BLOG','ALTERAR LOGO', "WHATSAPP", "EMAIL"];

class PermanentDrawerLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modoEdicao: false,
            modoCadastro: false,
            pagAtual: "",
            logo:null,
        }
    }

    async componentDidMount(){
        const response = await axios.get(`${auth.baseURL}/Logo/index/Resumido`);
        this.setState({logo:response.data.logo.thumbnail});
    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: '#5BAADC' }}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Humanus - Painel > 
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    {this.state.logo &&
                        <img src={`${auth.baseURL}/Image/${this.state.logo}`} alt="Logo" className={classes.imagemLogo} />
                    }
                    
                        <List >{
                        Menu.map((text, index) => (
                                <NavLink key={index} to={`/${text}`} className="linkDash"> 
                                    <ListItem button key={text} style={{ borderBottom: "1px solid black" }} className="App-ListItem"> 
                                        <ListItemText disableTypography primary={<Typography type="body2" style={{ color: 'black', textAlign: 'center' }}>{text}</Typography>} />
                                    </ListItem> 
                                </NavLink>
                            ))}

                            <AuthButton />
                        </List>

                    
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <DashboardRouter />
                </main>
            </div>
        );
    }
}


PermanentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
};



const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: '85%',
        marginLeft: '5%',
    },
    drawer: {
        width: '15%',
        flexShrink: 0,
    },
    drawerPaper: {
        width: '15%',
        background: 'white'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    item: {
        color: '#ffffff',
        textAlign: 'center',

    },
    parent: {
        backgroundColor: 'yellow',
        '&:hover $child': {
            color: 'red'
        }
    },
    imagemLogo: {
        width: '60%',
        height: '12%',
        marginTop: '5%',
        alignSelf: 'center'
    }
});

export default withStyles(styles)(PermanentDrawerLeft);