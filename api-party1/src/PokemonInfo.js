import React, { Component } from 'react'
import './PokemonInfo.css'

class PokemonInfo extends Component {
  state = {
    pokemon: {
      name: '',
      id: '',
      height: '',
      weight: '',
      imageUrl: '',    }
  }

  componentWillMount = () => {
    this.fetchPokemonData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location;
    if (locationChanged) {
      this.fetchPokemonData(nextProps);
    }
  }

  fetchPokemonData(props) {
    fetch(`http://pokeapi.co/api/v2/pokemon/${props.match.params.pokemon}`)
      .then(res => res.json())
      .then(data => {
        const pokemon = {
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          imageUrl: data.sprites.front_default,
          id: data.id,
          height: data.height,
          weight: data.weight
        }
        this.setState({pokemon})
      })
      .catch(err => {
        console.warn(err)
      })
  }

  render = () => {
    const { name, imageUrl, id, height, weight } = this.state.pokemon
    return (
      <div className="pokemon-info">
        <h3>Pokemon Name: {name}</h3>
        <h3>Pokemon ID: {id}</h3>
        <h3>Height: {height}</h3>
        <h3>Weight: {weight}</h3>
        <img src={imageUrl} alt="pokemon" />
      </div>
    )
  }
}

export default PokemonInfo