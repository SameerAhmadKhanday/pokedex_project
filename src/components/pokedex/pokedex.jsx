import PokemonList from "../pokemonList/pokemonList";
import Search from "../search/search";


// importing css
import './pokedex.css'
function Pokedex(){
    return(
        <div className="pokedex-wrapper">
           <h1 className="pokedex-heading"> pokedex</h1>
            <Search />
            <PokemonList />
        </div>
    )
}

export default Pokedex;