import { useEffect, useState } from "react";
import Pokemon from "../pokemon/pokemon";


import axios from 'axios';
import './pokemonList.css';
function PokemonList(){


    const[pokemonList ,setPokemonList] = useState([]);
    const[isLoading , setIsLoading] = useState(true);

    const[pokedexUrl,setPokeDexUrl]  = useState(' https://pokeapi.co/api/v2/pokemon')

    const[nextUrl , setNextUrl] = useState('');
    const[prevUrl,setPrevUrl] = useState('');

    async function downloadPokemons(){
        setIsLoading(true);
        // this downloads the list opf 20 pokemons
        const response =  await axios.get(pokedexUrl)

        // from the list of 20 pokemons we get the array of pokemons from results
        const pokemonResults = response.data.results;

        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        // iterating over the array of pokemons and using their url to create an array of promises that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        
        // passing that promise  array to axios.all
        const pokemonData = await  axios.all(pokemonResultPromise)
        
        // array of 20 pokemon detailed data
        console.log(pokemonData);

        // saving all the  data in pokemonlist
        // and iterte on the data of pokemon , and extract id , name , image and types
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon =  pokeData.data;
            return { 
                id :pokemon.id,
                name : pokemon.name ,
                image:pokemon.sprites.other.dream_world.front_default, 
                types :pokemon.types
            }
        });
        console.log(pokeListResult);
        setPokemonList(pokeListResult);
        setIsLoading(false);

    }
    useEffect( ()=>{ 
        downloadPokemons();
    },[pokedexUrl]);

  

    return (
       <div className="pokemon-list-wrapper">
    
            <div className="pokemon-wrapper">
            {(isLoading) ? 'loading...' : 
            pokemonList.map((p) => <Pokemon  name={p.name} image={p.image} key={p.id} /> )
            }
        </div>
            <div className="controlos">
                <button disabled={prevUrl == null}  onClick={()=> setPokeDexUrl(prevUrl)}>Prev</button>
                <button disabled={nextUrl==null} onClick={()=> setPokeDexUrl(nextUrl)}>Next</button>
                
            </div>
        </div>
       
    )
    

}

export default PokemonList;