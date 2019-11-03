import React from 'react';
import TableLocalidades from '../../components/TableLocalidades'


class Localidades extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <TableLocalidades />
            </div>

               
        );
    }

}

export default Localidades;