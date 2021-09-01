let all_pokemon_cards = document.getElementById('all-pokemon-cards');
// let currentPokemon;
let pokemons_number = 18;
let colors = {
	// fire: '#FDDFDF',
	// grass: '#DEFDE0',
	// electric: '#FCF7DE',
	// water: '#DEF3FD',
	// ground: '#f4e7da',
	// rock: '#d5d5d4',
	// fairy: '#fceaff',
	// poison: '#98d7a5',
	// bug: '#f8d5a3',
	// dragon: '#97b3e6',
	// psychic: '#eaeda1',
	// flying: '#F5F5F5',
	// fighting: '#E6E0D4',
	// normal: '#F5F5F5'
};
let main_types = Object.keys(colors);

// function init() {
//     fetchPokemons();
// }


async function fetchPokemons() {
    for (let i = 1; i <= pokemons_number; i++) {
        await loadPokemon(i);
    }
}


let loadPokemon = async id => {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    let pokemons = await response.json();
    createPokemonCards(pokemons);
}


function createPokemonCards(pokemon) {
    let pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    let poke_types = pokemon.types.map(type => type.type.name);
    let type = main_types.find(type => poke_types.indexOf(type) > - 1);
    let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    let color = colors[type];
    pokemonEl.style.backgroundColor = color;
    let pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
    `;
    pokemonEl.innerHTML = pokeInnerHTML;
    all_pokemon_cards.insertAdjacentText(pokemonEl);
}

fetchPokemons();

// async function loadPokemon(id) {
//     let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
//     let response = await fetch(url);
//     currentPokemon = await response.json();
//     console.log('Loaded pokemon ', currentPokemon);
//     createPokemonCards(currentPokemon);
    // renderPokemonInfo(currentPokemon);
// }


// async function createPokemonCards(currentPokemon) {
//     let pokeImg = currentPokemon['sprites']['front_default'];
//     let name = currentPokemon.name[0].toUpperCase() + currentPokemon.name.slice(1);
//     let pokeTypes = currentPokemon.types.map(type => type.type.name);
//     let type = main_types.find(type => pokeTypes.indexOf(type) > -1);
//     let color = colors[type];
//     document.getElementById('pokemons').style.backgroundColor = color;    
//     document.getElementById('all-pokemon-cards').innerHTML += `
//         <div id="pokemons" onclick="renderPokemonInfo(${currentPokemon.id})">
//             <span class="number">#${currentPokemon.id.toString().padStart(3, '0')}</span>
//             <h3 class="name">${name}</h3>
//             <span class="type"> Type: <span>${type}</span></span>
//             <div class="img-container">
//                 <img src=${pokeImg}
//             </div>
//         </div>        
//     `;
// }currentPokemon;



// function renderPokemonInfo(currentPokemon) {
//     document.getElementById('InfoCard').classList.remove('d-none');
//     let pokemonName = document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
//     let pokemonimage = document.getElementById('PokemonImage').src = currentPokemon['sprites']['other']['dream_world']['front_default'];
//     document.getElementById('InfoCard').innerHTML = `
//         <div id="pokemon-card" >
//             <h2 id="pokemonName">${pokemonName}</h2>
//         </div>
//         <div class="info-container">
//             <img src="${pokemonimage}" id="PokemonImage">
//         </div>

//     `;


// }