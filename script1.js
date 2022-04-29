let currentPokemons;
let allPokemons = [];
let loadCurrentCards = 0;


/**
 * Load the function 
 */
function init() {
    loadMorePokemons();
}


/**
 * Add 20 to variable and load a function
 */
function loadMorePokemons() {
    loadCurrentCards += 20;
    loadAmountOfPokemon(loadCurrentCards);

}

/**
 * download the api and save it in a variable
 * load a function
 * @param {number} loadCurrentCards - This is the number of pokemon cards
 */
async function loadAmountOfPokemon(loadCurrentCards) {
    let url = ('https://pokeapi.co/api/v2/pokemon?limit=152&offset=0');
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    generation1_pokemons = responseAsJSON;
    // currentPokemons = generation1_pokemons['pokemon_species'].lenght;
    loadAllPokemons(loadCurrentCards);
}

/**
 * download files from an api and save in an array
 * load a function
 * @param {number} loadCurrentCards - This is the number of pokemon cards
 */
async function loadAllPokemons(loadCurrentCards) {
    let x = 0;
    if (loadCurrentCards > 19) {
        x = loadCurrentCards - 20;
    }
    if (loadCurrentCards > currentPokemons) {
        loadCurrentCards = currentPokemons;
    }
    for (let i = x; i < loadCurrentCards; i++) {
        let url = (`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        let response = await fetch(url);
        let responseAsJSON = await response.json();
        allPokemons[i] = responseAsJSON;
    }
    renderPokemonCards(loadCurrentCards, x);
}

/**
 * render pokemoncards and show in html
 * @param {number} loadCurrentCards - This is the number of pokemon cards
 * @param {number} x - This is the number from each pokemon
 */
function renderPokemonCards(loadCurrentCards, x) {
    for (let i = x; i < loadCurrentCards; i++) {
        document.getElementById('all-pokemon-cards').innerHTML += generatePokemonCards(i);
        showNumber(i);
        showName(i);
        showImageSmall(i)
        showType(i);
    }
}

/**
 * generate HTML Text
 * @param {number} i - This is the number from each pokemon
 * @returns HTML text - return the HTML text into the code
 */
function generatePokemonCards(i) {
    return `
    <div id="allCards${i}" class="all-cards" onclick="showSoloPokemonCard(${i})">        
        <h2 id="card-title${i}"></h2>
        <div id="card-type${i}">
            
            
        </div>
        <div class="number-name">        
            <div class="card-number">
                <div>
                    #<span id="card-number${i}"></span>
                </div>
            </div>
            <div class="card-image">
                <img id="card-image${i}" src="">
            </div>
        </div>            
    </div>
        
    `;
}

/**
 * Show the number of Pokemon 
 * @param {number} i - This is the number from each pokemon
 */
function showNumber(i) {
    let pokemonNumber = i + 1;
    if (i < 9) {
        pokemonNumber = `0${pokemonNumber}`;
    }
    if (i < 99) {
        pokemonNumber = `0${pokemonNumber}`;
    }
    document.getElementById('pokeNumber').innerHTML = pokemonNumber;
    document.getElementById(`card-number${i}`).innerHTML = pokemonNumber;

}

/**
 * Show the name of the pokemon 
 * @param {number} i - This is the number from each pokemon
 */
function showName(i) {
    let pokemonName = allPokemons[i]['name'];
    document.getElementById(`card-title${i}`).innerHTML = pokemonName;
    document.getElementById('pokeName').innerHTML = pokemonName;
}

/**
 * show the image of the pokemon at single card
 * @param {number} i - This is the number from each pokemon
 */
function showImage(i) {
    let pokemonImage = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokemonImage').src = pokemonImage;
}

/**
 * show the pokemon image on every card
 * @param {number} i - This is the number from each pokemon
 */
function showImageSmall(i) {
    let pokemonImageSmall = allPokemons[i]['sprites']['front_default'];
    document.getElementById(`card-image${i}`).src = pokemonImageSmall
}

/**
 * show the type of the pokemon 
 * @param {number} index - This is the number from each pokemon
 */
function showType(index) {
    document.getElementById('card-type' + index).innerHTML = "";
    for (let i = 0; i < allPokemons[index]['types'].length; i++) {
        document.getElementById('card-type' + index).innerHTML += `
        <div class="card-type card-text ${allPokemons[index]['types'][i]['type']['name']}">${allPokemons[index]['types'][i]['type']['name']}</div>
        `;
    }
}

/**
 * show the single card from picked pokemon 
 * @param {number} i - This is the number from each pokemon
 */
function showSoloPokemonCard(i) {
    document.getElementById('soloCard').classList.remove('d-none');
    document.getElementById('soloCard').innerHTML = generateSingleCards(i);
    showNumber(i);
    showName(i);
    showImage(i);
    showTypeSolo(i);
    showAboutPokemon(i);
}

/**
 * generate HTML text 
 * @param {number} i - This is the number from each pokemon
 * @returns HTML text - return the HTML text into the code
 */
function generateSingleCards(i) {
    return `
    <div id="pokemon-background">
        <div class="card-head">
            <div>
                <span class="close-btn" onclick="closeSoloCard()">X</span>
            </div>
            <div id="pokemon">
                <h1 id="pokeName">Name</h1>
            </div>
            <div class="pokemon-number">
                #<span id="pokeNumber">001</span>
            </div>
        </div>    
        <div id="card-type-solo${i}" class="card-type-solo"></div>
                <div class="pokeImgSolo">
                    <img id="pokemonImage" src="">
                </div>  
                <div class="info-container">       
                    <div id="pokemonInfoHead" class="flex">
                        <div id="about" class="" onclick="showAbout(${i})">
                            About
                        </div>
                        <div id="base" class="gray" onclick="showBaseStats(${i})">
                            Base Stats
                        </div>
                    </div>
                <div>
                    <table id="table${i}" class="table">
                        <tr>
                            <td>Height</td>
                            <td id="heightPokemon">60cm</td>
                        </tr>
                        <tr>
                            <td>Weigth</td>
                            <td id="weightPokemon">8.5 kg</td>
                        </tr>
                        <tr>
                            <td>Abilities</td>
                            <td id="abilities">Blaze, Solar-Power</td>
                        </tr>
                    </table>
                </div>
        </div>
    </div>
    `;
}

/**
 * show typ at solo card
 * @param {number} index - This is the number from each pokemon
 */
function showTypeSolo(index) {
    document.getElementById('card-type-solo' + index).innerHTML = "";
    for (let i = 0; i < allPokemons[index]['types'].length; i++) {
        document.getElementById('card-type-solo' + index).innerHTML += `
        <div class="card-type-solo ${allPokemons[index]['types'][i]['type']['name']}">${allPokemons[index]['types'][i]['type']['name']}</div>
        `;
    }
}

/**
 * generate HTML text
 * @returns HTML text - return the HTML text into the code
 */
function generateAboutPokemon() {
    return `
        <tr>
            <td>Height</td>
            <td id="heightPokemon">60cm</td>
        </tr>
        <tr>
            <td>Weigth</td>
            <td id="weightPokemon">8.5 kg</td>
        </tr>
        <tr>
            <td>Abilities</td>
            <td id="abilities">Blaze, Solar-Power</td>
        </tr>
    `;

}

/**
 * generate the height, weight and abilities from pokemon
 * @param {number} i - This is the number from each pokemon
 */
function showAboutPokemon(i) {
    let height = allPokemons[i]['height'];
    let weight = allPokemons[i]['weight'];
    document.getElementById('heightPokemon').innerHTML = height + 'cm';
    document.getElementById('weightPokemon').innerHTML = weight + 'kg';
    document.getElementById('abilities').innerHTML = '';
    for (let j = 0; j < allPokemons[i]['abilities'].length; j++) {
        let abilities = allPokemons[i]['abilities'][j]['ability']['name'];
        if (j == 0) {
            document.getElementById('abilities').innerHTML += `${abilities}`;
        } else {
            document.getElementById('abilities').innerHTML += `, ${abilities}`;
        }
    }
}

/**
 * show the window about
 * @param {number} i - This is the number from each pokemon
 */
function showAbout(i) {
    document.getElementById(`table${i}`).innerHTML = generateAboutPokemon();
    showAboutPokemon(i);
    displayAbout();
}

/**
 * generate base stats from pokemon
 * @param {number} i - This is the number from each pokemon
 */
function showBaseStats(i) {
    displayBaseStets();
    let pokemonBaseStats = getPokemonBaseStats(i);
    let pokemonBaseStatsColor = getPokemonBaseStatsColor(pokemonBaseStats);
    document.getElementById('table' + i).innerHTML = generateBaseStats(pokemonBaseStats, pokemonBaseStatsColor);
}

/**
 * save the values from arry in variabel
 * @param {number} i - This is the number from each pokemon
 * @returns values - return the stats which saved in the values
 */
function getPokemonBaseStats(i) {
    return {
        hp: allPokemons[i]['stats'][0]['base_stat'],
        attack: allPokemons[i]['stats'][1]['base_stat'],
        defense: allPokemons[i]['stats'][2]['base_stat'],
        spAtk: allPokemons[i]['stats'][3]['base_stat'],
        spDef: allPokemons[i]['stats'][4]['base_stat'],
        speed: allPokemons[i]['stats'][5]['base_stat'],
    }
}

/**
 * save the color from values
 * @param {values} pokemonBaseStats -This value saves the color in it
 * @returns Color from values - returns the color 
 */
function getPokemonBaseStatsColor(pokemonBaseStats) {
    return {
        hpColor: getBaseStatsColor(pokemonBaseStats['hp']),
        attackColor: getBaseStatsColor(pokemonBaseStats['attack']),
        defenseColor: getBaseStatsColor(pokemonBaseStats['defense']),
        spAtkColor: getBaseStatsColor(pokemonBaseStats['spAtk']),
        spDefColor: getBaseStatsColor(pokemonBaseStats['spDef']),
        speedColor: getBaseStatsColor(pokemonBaseStats['speed']),
    }
}

/**
 * give back the color at a saved value
 * @param {number} stats - This number save the value 
 * @returns the color in hex code - return the color dependent from stats
 */
function getBaseStatsColor(stats) {
    if (stats > 50) {
        return '#5bc686';
    } else {
        return '#fb7171';
    }
}

/**
 * generate HTML text and color
 * @param {value} pokemonBaseStats - This value is the stats of each pokemon
 * @param {color} pokemonBaseStatsColor - This value is the color 
 * @returns HTML text and values - return the HTML text into the code
 */
function generateBaseStats(pokemonBaseStats, pokemonBaseStatsColor) {
    return `
    	<tr>
            <td>HP</td>
            <td id="hp" class="hp">${pokemonBaseStats.hp}
                <div  class="range-view">
                    <span style="width:${pokemonBaseStats.hp}% ; background-color: ${pokemonBaseStatsColor.hpColor}" class="baseStatsLine"></span>
                </div>
            </td>
        </tr>
        <tr>
            <td>Attack</td>
            <td id="attack" class="attack">${pokemonBaseStats.attack}
                <div  class="range-view">
                    <span style="width:${pokemonBaseStats.attack}% ; background-color: ${pokemonBaseStatsColor.attackColor}" class="baseStatsLine"></span>
                </div>
            </td>
        </tr>
        <tr>
            <td>Defense</td>
            <td id="defense" class="defense">${pokemonBaseStats.defense}
                <div  class="range-view">
                    <span style="width:${pokemonBaseStats.defense}% ; background-color: ${pokemonBaseStatsColor.defenseColor} " class="baseStatsLine"></span>
                </div>
            </td>
        </tr>
        <tr>
            <td>Sp. Atk</td>
            <td id="spAtk" class="spAtk">${pokemonBaseStats.spAtk}
                <div  class="range-view">
                    <span style="width:${pokemonBaseStats.spAtk}% ; background-color: ${pokemonBaseStatsColor.spAtkColor} " class="baseStatsLine"></span>
                </div>
            </td>
        </tr>
        <tr>
            <td>Sp. Def</td>
            <td id="spDef" class="spDef">${pokemonBaseStats.spDef}
                <div  class="range-view">
                    <span style="width:${pokemonBaseStats.spDef}% ; background-color: ${pokemonBaseStatsColor.spDefColor}" class="baseStatsLine"></span>
                </div>
            </td>
        </tr>
        <tr>
            <td>Speed</td>
            <td id="speed" class="speed">${pokemonBaseStats.speed}
                <div  class="range-view">
                    <span style="width:${pokemonBaseStats.speed}% ; background-color: ${pokemonBaseStatsColor.speedColor}" class="baseStatsLine"></span>
                </div>
            </td>
        </tr>   
    `;
}




/**
 * change color of values about and base
 */
function displayBaseStets() {
    document.getElementById('base').classList.remove('gray');
    document.getElementById('about').classList.add('gray');

}

/**
 * change color of values about and base
 */
function displayAbout() {
    document.getElementById('base').classList.add('gray');
    document.getElementById('about').classList.remove('gray');

}

/**
 * close the solo card from each pokemon
 */
function closeSoloCard() {
    document.getElementById('soloCard').classList.add('d-none');
}

function filterPokemons() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    search = search.trim();
    let filteredPokemons = [];
    for (let i = 0; i < allPokemons.length; i++) {
        let pokemon = allPokemons[i];
        if (pokemon['name'].toLowerCase().includes(search)) {
            filteredPokemons.push(pokemon);
        }
    }
    if (filteredPokemons.lenght == 0) {
        loadAmountOfPokemon(loadCurrentCards);
    } else {
        showFilteredPokemon(filteredPokemons);
    }
}

function showFilteredPokemon(filteredPokemons) {
    document.getElementById('all-pokemon-cards').innerHTML = '';
    for (let i = 0; i < filteredPokemons.length; i++) {
        // let pokemon = filteredPokemons[i];
        document.getElementById('all-pokemon-cards').innerHTML += generateFilterPokemon(i);
        showFilterName(i);
    }
}

function generateFilterPokemon(i) {
    return `
    <div id="filteredPokemons${i}" class="all-cards" onclick="showSoloPokemonCard(${i})">        
        <h2 id="filter-card-title${i}"></h2>
        <div id="card-type${i}">
            
            
        </div>
        <div class="number-name">        
            <div class="card-number">
                <div>
                    #<span id="card-number${i}"></span>
                </div>
            </div>
            <div class="card-image">
                <img id="card-image${i}" src="">
            </div>
        </div>            
    </div>
        
    `;
}

function showFilterName(i) {
    let pokemonFilterName = filteredPokemons[i]['name'];
    document.getElementById(`filter-card-title${i}`).innerHTML = pokemonFilterName;
    document.getElementById('pokeName').innerHTML = pokemonFilterName;
}
