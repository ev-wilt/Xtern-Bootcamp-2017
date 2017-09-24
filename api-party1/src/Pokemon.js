import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PokemonInfo from './PokemonInfo'
import './Pokemon.css'

class Pokemon extends Component {

    state = {
        pokemonName: ''
    }

    handleChange = (ev) => {
        const pokemonName = ev.currentTarget.value
        this.setState({ pokemonName })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        this.props.history.replace(`/pokemon/${this.state.pokemonName}`)
    }

    render = () => {
        return (
            <div className="pokemon">
                <img className="pokemon-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2000px-International_Pok%C3%A9mon_logo.svg.png" alt="pokemon" />

                <h2>Select a Pokemon for more info.</h2>
                <ul className="nav-links">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input type="text"
                                value={this.state.pokemonName}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <button type="submit">Look up Pokemon</button>
                        </div>
                    </form>
                </ul>

                <Route exact path={this.props.match.url} render={() => (
                    <h2>No pokemon selected.</h2>
                )} />
                <Route path={`${this.props.match.url}/:pokemon`} component={PokemonInfo}/>

            </div>
        )
    }
}

export default Pokemon