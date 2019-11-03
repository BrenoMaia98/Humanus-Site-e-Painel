import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import {auth} from "../auth";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#5BAADC',
        color: theme.palette.common.white,
        fontSize: 16,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});




class TableBrindes extends React.Component {
    constructor({ ativarModoEdicao }) {
        super({ ativarModoEdicao });
        this.state = {
            linhas: []
        };
    }

    componentWillMount(){
        
        this.pegarBrindes();
    }

    getCurrentDate(separator=''){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        }
    

    pegarBrindes(){
        const dateAtual = this.getCurrentDate("/");
        const materiaCompleta5 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique ante et mi faucibus ultricies. Curabitur id mi quis nunc condimentum laoreet. Phasellus euismod eleifend congue. Etiam sit amet dui tempus, sollicitudin mauris ac, cursus massa. Vestibulum aliquam eros vitae nisl vestibulum semper. Phasellus tempus dapibus nisi ut volutpat. Proin sed vestibulum risus. Proin tortor mauris, aliquam sit amet arcu vitae, accumsan tempor purus. Sed varius est a odio vulputate sodales. Morbi ut est non lectus mollis pretium.\n        Mauris quis vestibulum mi. Fusce a facilisis sapien, at luctus nisl. Pellentesque hendrerit, orci ac congue sodales, velit dui viverra metus, quis facilisis lacus erat at quam. Nulla eget dapibus erat. Maecenas commodo vel est vitae elementum. Nunc augue erat, pharetra in nibh eget, accumsan pulvinar quam. Aenean arcu magna, egestas id mi at, tincidunt pulvinar orci. Duis cursus libero in urna ultrices, ut tincidunt risus rutrum. Proin ornare porttitor turpis, sed consequat enim rutrum quis. Suspendisse ut massa id neque pharetra finibus non nec lacus. Aliquam ut ligula eu magna efficitur finibus. Nulla at quam scelerisque, rutrum mi at, sollicitudin sapien. Maecenas convallis augue a cursus faucibus. Nam tempus lacus nec lacinia feugiat. Sed tincidunt volutpat massa, sed suscipit orci hendrerit sed.\nFusce pellentesque ipsum nec nisl aliquet, id eleifend felis facilisis. Nam ut aliquam est, eget scelerisque augue. Vestibulum egestas augue non tortor dapibus varius. Proin varius eleifend arcu ac dictum. Proin finibus venenatis felis, vitae sollicitudin elit efficitur at. Mauris vel iaculis ipsum, ac elementum urna. Nam sed molestie massa.\nNunc suscipit id purus a pretium. Integer vitae condimentum eros. Curabitur elementum gravida dui at ullamcorper. Quisque enim est, suscipit sit amet dapibus non, efficitur quis lectus. In molestie ut erat at sodales. Suspendisse id vestibulum massa, eu volutpat massa. Etiam malesuada mi nec congue ullamcorper. Duis est nisi, efficitur elementum felis eget, vulputate tincidunt lectus. Morbi auctor consequat tempus. Nulla facilisi. Proin iaculis vel purus vel vestibulum. Suspendisse fermentum sem in elit iaculis, elementum lacinia felis fringilla. Sed ullamcorper, purus eu tristique feugiat, purus purus malesuada orci, a posuere magna diam a turpis.\nFusce lacinia, orci id luctus rutrum, elit ligula finibus lorem, eu lacinia tortor turpis sit amet ex. Integer libero neque, mollis eu tincidunt sit amet, ullamcorper quis magna. Aenean quis purus nulla. In hendrerit augue sit amet placerat pulvinar. Integer placerat porta egestas. Praesent nisl lectus, consectetur ut augue et, faucibus tincidunt nunc. Cras pretium condimentum eros, a imperdiet est mollis non. Curabitur vulputate quam facilisis consectetur faucibus."
        const materiaCompleta4 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rutrum massa et velit auctor, in facilisis quam mattis. Aliquam volutpat tristique rutrum. Vivamus tellus metus, vulputate at quam et, pulvinar elementum est. Fusce ac eros interdum, aliquam magna sed, pellentesque nulla. Sed quis tincidunt mauris. Nam gravida at quam non tempus. Suspendisse egestas ultrices nunc non aliquam. Donec vulputate, felis eget euismod dignissim, urna ipsum finibus ipsum, eu luctus justo leo ac nisi. Nulla dapibus tortor vehicula enim vehicula, sit amet dictum enim tincidunt. Mauris auctor dui eget tincidunt blandit.\n        Fusce quam lacus, aliquet ut mauris ac, imperdiet malesuada turpis. Nunc elementum libero at mauris elementum, vitae euismod enim aliquam. Mauris pharetra, lorem tincidunt tincidunt consequat, augue mi vestibulum nibh, sit amet efficitur libero augue nec turpis. Aliquam imperdiet, ante quis consectetur efficitur, sem lacus posuere urna, in luctus erat quam quis urna. Aliquam sodales sollicitudin erat, ac vestibulum turpis porttitor in. Pellentesque libero ante, dignissim sit amet pharetra non, vestibulum eu metus. In hac habitasse platea dictumst. Sed at ipsum suscipit, tempor felis ac, ullamcorper est. Sed ipsum enim, elementum non pretium ut, suscipit sed ipsum. Praesent accumsan risus sed magna porta, quis commodo mi imperdiet.\nPraesent ultrices consectetur purus rutrum iaculis. Aenean a lectus cursus, hendrerit quam in, eleifend dui. Aliquam tristique, justo sed hendrerit tristique, libero velit mollis magna, ac consequat ligula sem gravida dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis nunc vulputate, euismod orci ut, tristique diam. Nulla facilisi. Duis ut odio quis libero suscipit aliquam eu nec libero.\nProin consequat est quis metus porttitor lacinia. Integer at pharetra ipsum. Fusce aliquet sodales malesuada. Nullam in ultricies eros. Nunc consectetur risus urna, vitae aliquet sapien lobortis auctor. In hac habitasse platea dictumst. Praesent sed dui sed velit aliquet pulvinar in ut neque. Praesent sed ullamcorper ipsum. Duis at aliquam justo. Donec placerat efficitur mauris, eget ornare dui posuere nec. In hac habitasse platea dictumst."
        const materiaCompleta3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rutrum massa et velit auctor, in facilisis quam mattis. Aliquam volutpat tristique rutrum. Vivamus tellus metus, vulputate at quam et, pulvinar elementum est. Fusce ac eros interdum, aliquam magna sed, pellentesque nulla. Sed quis tincidunt mauris. Nam gravida at quam non tempus. Suspendisse egestas ultrices nunc non aliquam. Donec vulputate, felis eget euismod dignissim, urna ipsum finibus ipsum, eu luctus justo leo ac nisi. Nulla dapibus tortor vehicula enim vehicula, sit amet dictum enim tincidunt. Mauris auctor dui eget tincidunt blandit.\n        Fusce quam lacus, aliquet ut mauris ac, imperdiet malesuada turpis. Nunc elementum libero at mauris elementum, vitae euismod enim aliquam. Mauris pharetra, lorem tincidunt tincidunt consequat, augue mi vestibulum nibh, sit amet efficitur libero augue nec turpis. Aliquam imperdiet, ante quis consectetur efficitur, sem lacus posuere urna, in luctus erat quam quis urna. Aliquam sodales sollicitudin erat, ac vestibulum turpis porttitor in. Pellentesque libero ante, dignissim sit amet pharetra non, vestibulum eu metus. In hac habitasse platea dictumst. Sed at ipsum suscipit, tempor felis ac, ullamcorper est. Sed ipsum enim, elementum non pretium ut, suscipit sed ipsum. Praesent accumsan risus sed magna porta, quis commodo mi imperdiet.\nPraesent ultrices consectetur purus rutrum iaculis. Aenean a lectus cursus, hendrerit quam in, eleifend dui. Aliquam tristique, justo sed hendrerit tristique, libero velit mollis magna, ac consequat ligula sem gravida dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis nunc vulputate, euismod orci ut, tristique diam. Nulla facilisi. Duis ut odio quis libero suscipit aliquam eu nec libero.\n"
        const materiaCompleta2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rutrum massa et velit auctor, in facilisis quam mattis. Aliquam volutpat tristique rutrum. Vivamus tellus metus, vulputate at quam et, pulvinar elementum est. Fusce ac eros interdum, aliquam magna sed, pellentesque nulla. Sed quis tincidunt mauris. Nam gravida at quam non tempus. Suspendisse egestas ultrices nunc non aliquam. Donec vulputate, felis eget euismod dignissim, urna ipsum finibus ipsum, eu luctus justo leo ac nisi. Nulla dapibus tortor vehicula enim vehicula, sit amet dictum enim tincidunt. Mauris auctor dui eget tincidunt blandit.\n        Fusce quam lacus, aliquet ut mauris ac, imperdiet malesuada turpis. Nunc elementum libero at mauris elementum, vitae euismod enim aliquam. Mauris pharetra, lorem tincidunt tincidunt consequat, augue mi vestibulum nibh, sit amet efficitur libero augue nec turpis. Aliquam imperdiet, ante quis consectetur efficitur, sem lacus posuere urna, in luctus erat quam quis urna. Aliquam sodales sollicitudin erat, ac vestibulum turpis porttitor in. Pellentesque libero ante, dignissim sit amet pharetra non, vestibulum eu metus. In hac habitasse platea dictumst. Sed at ipsum suscipit, tempor felis ac, ullamcorper est. Sed ipsum enim, elementum non pretium ut, suscipit sed ipsum. Praesent accumsan risus sed magna porta, quis commodo mi imperdiet.\n"
        const materiaCompleta1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rutrum massa et velit auctor, in facilisis quam mattis. Aliquam volutpat tristique rutrum. Vivamus tellus metus, vulputate at quam et, pulvinar elementum est. Fusce ac eros interdum, aliquam magna sed, pellentesque nulla. Sed quis tincidunt mauris. Nam gravida at quam non tempus. Suspendisse egestas ultrices nunc non aliquam. Donec vulputate, felis eget euismod dignissim, urna ipsum finibus ipsum, eu luctus justo leo ac nisi. Nulla dapibus tortor vehicula enim vehicula, sit amet dictum enim tincidunt. Mauris auctor dui eget tincidunt blandit.\n"
        const data = [
            {titulo:"Materia numero 1 bem com 2 paragrafos" , dataPublicacao:dateAtual , resumo:materiaCompleta1 , materiaCompleta:materiaCompleta2 , imagens:["img1"]},
            {titulo:"Materia sobre algum assunto legal" , dataPublicacao:dateAtual , resumo:materiaCompleta1 , materiaCompleta:materiaCompleta1 , imagens:["img1","img2"]},
            {titulo:"Matéria com um título bem grande para diferenciar das outras" , dataPublicacao:dateAtual , resumo:materiaCompleta1 , materiaCompleta:materiaCompleta3 , imagens:["img1","img2","img3"]},
            {titulo:"Titulo Pequeno" , dataPublicacao:dateAtual , resumo:materiaCompleta2 , materiaCompleta:materiaCompleta5 , imagens:["img1","img2","img3","img4",]},
            {titulo:"Matéria/ reportagem sobre o assunto Loren Ipsum" , dataPublicacao:dateAtual , resumo:materiaCompleta1 , materiaCompleta:materiaCompleta4 , imagens:["img1","img2","img3","img4","img5"]}
        ];
        try{
        //   axios.post('http://74.117.156.74:5012/Brinde/get',{},auth.config).then(response => {
        //     this.setState({linhas:response.data})
        //   })
        
        this.setState({linhas:data})
        }catch(err){
          console.log(err);
        }
    }

   
    async removerBrinde(index) {
    var auxiliar = [...this.state.linhas];
    try{
      await axios.post('http://74.117.156.74:5012/Brinde/delete', 
      { "id": index},auth.config)
      for (var i = auxiliar.length - 1; i >= 0; i--) {
        if (auxiliar[i].id === index) {
          auxiliar.splice(i, 1);
        }
      }
      this.setState({ linhas: auxiliar });
    }catch(err){
      console.log(err);
    }
    
  };

    render() {
        const { classes } = this.props;

        return (
                <Paper className={classes.root}>
                    {
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell align="center">Título</CustomTableCell>
                                    <CustomTableCell align="center">Data</CustomTableCell>
                                    <CustomTableCell align="center">Resumo</CustomTableCell>
                                    <CustomTableCell align="center">Materia Completa</CustomTableCell>
                                    <CustomTableCell align="center">Imagens</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.linhas.map(row => (
                                    <TableRow className={classes.row} key={row.id}>
                                        <CustomTableCell align="center">{row.nome}</CustomTableCell>    

                                        <CustomTableCell onClick={() => this.removerBrinde(row.id)} align="center">
                                            <FontAwesomeIcon icon={faTrashAlt} size="lg" className="App-icon" />

                                        </CustomTableCell>
                                    </TableRow>
                                ))
                                }
                            </TableBody>
                        </Table>

                    }

                </Paper>
            
        );
    }
}

TableBrindes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableBrindes);