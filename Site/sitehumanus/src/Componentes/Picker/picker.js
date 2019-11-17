import React,{Component} from 'react';
import './picker.css';


const Name = ({ 
  id, 
  info, 
  handleFavourite 
}) => (
  <li
    className="categoria"
    onClick={() => handleFavourite(id)}>
    {info.categoria}
  </li>
)

/* ##################### */
/* ##### Shortlist ##### */
/* ##################### */

const Selecionados = ({
  favoritos,
  data,
  deleteFavourite
}) => {
    const hasFavourites = (favoritos.length > 0)
  const favList = favoritos.map((fav, i) => {
      return (
          <Name 
          id={i}
          key={i}
          info={data[fav]}
          handleFavourite={(id) => deleteFavourite(id)}
          />
          )
        })
  return (
    <div className="favoritos">
      <h4>
        {hasFavourites 
          ? 'Categorias Selecionadas'
          : 'Clique nas categorias de postagem que deseja filtrar'
        }
      </h4>
      <ul>
        {favList}
      </ul>
      {hasFavourites && <hr/>}
    </div>
  )
}


const ListaCategorias = ({ 
  data, 
  filter, 
  favoritos, 
  addFavourite 
}) => { 
  const input = filter.toLowerCase()
  
  // Gather list of categorias
  const categorias = data
    // filtering out the categorias that...
    .filter((data, i) => {
      return (
        // ...are already favourited
        favoritos.indexOf(data.id) === -1
        // ...are not matching the current search value
        && !data.categoria.toLowerCase().indexOf(input)
      )
    })
    // ...output a <Name /> component for each categoria
    .map((data, i) => {
    // only display categorias that match current input string
      return (
        <Name 
          id={data.id}
          key={i}
          info={data}
          handleFavourite={(id) => addFavourite(id)}
        />
      )
    })
  
  /* ##### the component's output ##### */
  return ( 
    <ul> 
      {categorias}
    </ul>
  )
}
/* ############################## */
/* ##### Main app component ##### */
/* ############################## */

export default class Picker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterText: '',
      favoritos: []
    }
  }
  
  // update filterText in state when user types 
  filterUpdate(value) {
    this.setState({
      filterText: value
    });
  }
  
  // add clicked categoria ID to the favoritos array
  addFavourite(id) {
    const newSet = this.state.favoritos.concat([id])
    this.setState({
      favoritos: newSet
    })
  }
  
  // remove ID from the favoritos array
  deleteFavourite(id) {
    const { favoritos } = this.state
    const newList = [
      ...favoritos.slice(0, id),
      ...favoritos.slice(id + 1)
      ]
    this.setState({
      favoritos: newList
    })
  }
  
  render() {
    return ( 
      <div>
        <main>
        

          <ListaCategorias 
            data={this.props.data}
            filter={this.state.filterText}
            favoritos={this.state.favoritos}
            addFavourite={this.addFavourite.bind(this)}
          />
          <Selecionados 
            data={this.props.data} 
            favoritos={this.state.favoritos}
            deleteFavourite={this.deleteFavourite.bind(this)}
          />
        </main>
      </div>
    )
  }
}