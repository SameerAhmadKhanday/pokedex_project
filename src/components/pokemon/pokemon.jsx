import './pokemon.css'

function Pokemon({name , image}){
    return(
        <div className='pokemon'>
            <div className='pokemon-name'>{name}</div>
            <div> 
                <img className='pokemopn-image' src = {image} /> 
            </div>
        </div>
    )
}

export default Pokemon;