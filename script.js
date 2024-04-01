let currentPokemons;
let allPokemons = [];
let loadCurrentCards = 0;
let evolutions = [];
let loadCurrentEvolution = 0;
let filteredPokemons = []
let species = []
let images = []


function init() {
    loadMorePokemons();

}


function loadMorePokemons() {
    loadCurrentCards += 20;
    loadAmountOfPokemon(loadCurrentCards);
}


async function loadAmountOfPokemon(loadCurrentCards) {
    let url = ('https://pokeapi.co/api/v2/generation/1/');
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    let generation1_pokemons = responseAsJSON;
    currentPokemons = generation1_pokemons['pokemon_species'].lenght;
    loadAllPokemons(loadCurrentCards);
}


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


function renderPokemonCards(loadCurrentCards, x) {
    for (let i = x; i < loadCurrentCards; i++) {
        document.getElementById('all-pokemon-cards').innerHTML += generatePokemonCards(i);
        showNumber(i);
        showName(i);
        showImageSmall(i)
        showType(i);
    }
}


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


function showName(i) {
    let pokemonName = allPokemons[i].name;
    document.getElementById(`card-title${i}`).innerHTML = pokemonName;
    document.getElementById('pokeName').innerHTML = pokemonName;
}


function showImage(i) {
    let pokemonImage = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokemonImage').src = pokemonImage;
}


function showImageSmall(i) {
    let pokemonImageSmall = allPokemons[i]['sprites']['front_default'];
    document.getElementById(`card-image${i}`).src = pokemonImageSmall
}


function showType(index) {
    document.getElementById('card-type' + index).innerHTML = "";
    for (let i = 0; i < allPokemons[index]['types'].length; i++) {
        document.getElementById('card-type' + index).innerHTML += `
        <div class="card-type card-text ${allPokemons[index]['types'][i]['type']['name']}">${allPokemons[index]['types'][i]['type']['name']}</div>
        `;
    }
}


function showSoloPokemonCard(i) {
    document.body.style.position = "fixed"

    document.getElementById('soloCard').classList.remove('d-none');
    document.getElementById('soloCard').innerHTML = generateSingleCards(i);
    showNumber(i);
    showName(i);
    showImage(i);
    showTypeSolo(i);
    showAboutPokemon(i);
}


function generateSingleCards(i) {
    return `
    <div id="pokemon-background">
        <div class="card-head">
            <div>
                <span class="close-btn" onclick="closeSoloCard()">X</span>
            </div>
            <div id="pokemon">
                <h1 id="pokeName"></h1>
            </div>
            <div class="pokemon-number">
                #<span id="pokeNumber">001</span>
            </div>
        </div>    
        <div id="card-type-solo${i}" class="card-type-solo"></div>
                <div class="info-container">
            <img id="pokemonImage" src="">
            <div id="pokemonInfoHead" class="flex">
                <div id="about" class="" onclick="showAbout(${i})">
                    About
                </div>
                <div id="base" class="gray" onclick="showBaseStats(${i})">
                    Base Stats
                </div>
                <div id="evolution" class="gray" onclick="showEvolutions(${i})">
                    Evolution
                </div>
                <div id="move" class="gray" onclick="showMoves(${i})">
                    Moves
                </div>
            </div>
            <div>
                <table id="table${i}" class="table">
                    <tr>
                        <td>Height</td>
                        <td id="heightPokemon"></td>
                    </tr>
                    <tr>
                        <td>Weigth</td>
                        <td id="weightPokemon"></td>
                    </tr>
                    <tr>
                        <td>Abilities</td>
                        <td id="abilities"></td>
                    </tr>
                </table>
            </div>
    </div>

        </div>
    `;
}


function showTypeSolo(index) {
    document.getElementById('card-type-solo' + index).innerHTML = "";
    for (let i = 0; i < allPokemons[index]['types'].length; i++) {
        document.getElementById('card-type-solo' + index).innerHTML += `
        <div class="card-type-solo ${allPokemons[index]['types'][i]['type']['name']}">${allPokemons[index]['types'][i]['type']['name']}</div>
        `;
    }
}


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


function showAbout(i) {
    document.getElementById(`table${i}`).innerHTML = generateAboutPokemon();
    showAboutPokemon(i);
    displayAbout(i);
    document.getElementById('pokemon-background').style.height = '550px';

}


function showBaseStats(i) {
    displayBaseStets(i);
    let pokemonBaseStats = getPokemonBaseStats(i);
    let pokemonBaseStatsColor = getPokemonBaseStatsColor(pokemonBaseStats);
    document.getElementById('pokemon-background').style.height = '665px';
    document.getElementById('table' + i).innerHTML = generateBaseStats(pokemonBaseStats, pokemonBaseStatsColor);
}


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


function getBaseStatsColor(stats) {
    if (stats > 50) {
        return '#5bc686';
    } else {
        return '#fb7171';
    }
}


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





async function loadPokemonSpecies(k) {
    let url = (`https://pokeapi.co/api/v2/pokemon-species/${k + 1}`);
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    species = responseAsJSON;
    loadEvolutions()
}

async function loadEvolutions() {
    let url = species.evolution_chain.url
    let res = await fetch(url);
    let resAsJSON = await res.json();
    evolutions = resAsJSON;
    let evolutionChainId = species.evolution_chain.url.split("/").slice(-2, -1)[0]
    showEvolutionName()
    loadEvolutionImages(evolutionChainId)
}

async function loadEvolutionImages(id) {
    let url = `https://pokeapi.co/api/v2/evolution-chain/${id}`
    let res = await fetch(url)
    let resAsJSON = await res.json()
    images = resAsJSON;
    showEvolutionImage(images.chain)
}


function showEvolutionName() {
    let evolutionNameContainer = document.getElementById("evolution-name")
    let firstEvolution = evolutions.chain.species.name
    let trElementFirstName = document.createElement('td');
    trElementFirstName.textContent = firstEvolution;
    evolutionNameContainer.appendChild(trElementFirstName);

    let names = []
    let evolutionDetails = evolutions

    while (evolutionDetails.chain.evolves_to.length > 0) {
        let evolutionNameUrl = evolutionDetails.chain.evolves_to[0].species.name
        names.push(evolutionNameUrl)
        if (evolutionDetails.chain.evolves_to[0].evolves_to[0] == undefined) {
            break
        }
        let thirdName = evolutionDetails.chain.evolves_to[0].evolves_to[0].species.name;
        names.push(thirdName)
        break
    }
    names.forEach((name) => {
        let trElement = document.createElement('td');
        trElement.textContent = name;
        evolutionNameContainer.appendChild(trElement);
    })

}


function showEvolutionImage(imagesChain) {
    let evolutionImageContainer = document.getElementById("evolution-image")
    evolutionImageContainer.innerHTML = "";
    let currentPokemon = imagesChain.species.name;
    let evolutionImageUrl = `https://img.pokemondb.net/sprites/black-white/normal/${currentPokemon}.png`
    let firstImgElement = document.createElement('img');
    let arrow = document.createElement("img")
    arrow.src = "img/arrow-2-32.png"
    arrow.classList.add("arrow")
    firstImgElement.src = evolutionImageUrl;
    firstImgElement.alt = currentPokemon;
    evolutionImageContainer.appendChild(firstImgElement);
    evolutionImageContainer.appendChild(arrow);



    let evolutions = []
    let evolutionDetails = imagesChain
    while (evolutionDetails.evolves_to.length > 0) {
        let evolutionImageUrl = `https://img.pokemondb.net/sprites/black-white/normal/${evolutionDetails.evolves_to[0].species.name}.png`;
        let evolutionImgElement = document.createElement('img');
        let arrow2 = document.createElement("img")
        arrow2.src = "img/arrow-2-32.png"
        arrow2.classList.add("arrow")
        evolutionImgElement.src = evolutionImageUrl;
        evolutionImgElement.alt = evolutionDetails.evolves_to[0].species.name;
        evolutionImageContainer.appendChild(evolutionImgElement);
        evolutionImageContainer.appendChild(arrow2);

        evolutions.push(evolutionDetails.evolves_to[0].species.name);

        let thirdImage = evolutionDetails.evolves_to[0].evolves_to[0];
        if (evolutionDetails.evolves_to[0].evolves_to[0] == undefined) {
            arrow2.classList.add("d-none")
            break
        }
        if (thirdImage) {
            let thirdImageUrl = `https://img.pokemondb.net/sprites/black-white/normal/${thirdImage.species.name}.png`;
            let thirdImgElement = document.createElement('img');
            thirdImgElement.src = thirdImageUrl;
            thirdImgElement.alt = thirdImage.species.name;
            evolutionImageContainer.appendChild(thirdImgElement);

            evolutions.push(thirdImage.species.name);
        }
        break;
    }
}



function showEvolutions(i) {
    loadPokemonSpecies(i)
    displayEvolution(i);
    document.getElementById('pokemon-background').style.height = '665px';
    document.getElementById('table' + i).innerHTML = '';
    document.getElementById('table' + i).innerHTML = generateEvolution();
}


function generateEvolution() {
    return `
    
        <div id="evolution-image"></div>
        
     
        <div id="evolution-name"></div>

    `;
}


function showMoves(i) {
    dispalyMove(i)
    document.getElementById('table' + i).innerHTML = '';
    document.getElementById(`table` + i).innerHTML = generateMovesPokemon();
    document.getElementById('pokemon-background').style.height = '665px';
    showMovesFromPokemon(i)
}


function generateMovesPokemon() {
    return `
        <ul class="list" id="moves">
           
        </ul>
    `
}

function showMovesFromPokemon(i) {
    let listContainer = document.getElementById("moves")
    let pokemon = allPokemons[i]
    console.log(pokemon.moves);
    pokemon.moves.forEach(moves => {
        console.log(moves.move.name);
        let list = document.createElement("li")
        let moveList = moves.move.name
        list.textContent = moveList
        listContainer.appendChild(list)
    });


}


function displayBaseStets(i) {
    document.getElementById('base').classList.remove('gray');
    document.getElementById('base').classList.add('big');
    document.getElementById('about').classList.add('gray');
    document.getElementById('evolution').classList.add('gray');
    document.getElementById('move').classList.add('gray');
    document.getElementById('table' + i).classList.remove('tableEvolution')
}


function displayAbout(i) {
    document.getElementById('base').classList.add('gray');
    document.getElementById('about').classList.add('big');
    document.getElementById('about').classList.remove('gray');
    document.getElementById('evolution').classList.add('gray');
    document.getElementById('move').classList.add('gray');
    document.getElementById('table' + i).classList.remove('tableEvolution')
}


function displayEvolution(i) {
    document.getElementById('base').classList.add('gray');
    document.getElementById('evolution').classList.add('big');
    document.getElementById('about').classList.add('gray');
    document.getElementById('evolution').classList.remove('gray');
    document.getElementById('move').classList.add('gray');
    document.getElementById('table' + i).classList.add('tableEvolution')
}


function dispalyMove(i) {
    document.getElementById('base').classList.add('gray');
    document.getElementById('about').classList.add('gray');
    document.getElementById('evolution').classList.add('gray');
    document.getElementById('move').classList.remove('gray');
    document.getElementById('move').classList.add('big');
    document.getElementById('table' + i).classList.remove('tableEvolution')
}





function closeSoloCard() {
    document.getElementById('soloCard').classList.add('d-none');
    document.body.style.position = ""
}

function filterPokemons() {
    let search = document.getElementById('search').value.toLowerCase().trim();
    let filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search))
    if (filteredPokemons.lenght == 0) {
        loadAmountOfPokemon(loadCurrentCards);
    } else {
        showFilteredPokemon(filteredPokemons);
    }
}

function showFilteredPokemon(filteredPokemons) {
    console.log(filteredPokemons);
    document.getElementById('all-pokemon-cards').innerHTML = '';
    for (let j = 0; j < filteredPokemons.length; j++) {
        let id = filteredPokemons[j].id
        let name = filteredPokemons[j].name
        let number = filteredPokemons[j].id
        let types = filteredPokemons[j].types
        let img = filteredPokemons[j].sprites.front_default
        document.getElementById('all-pokemon-cards').innerHTML += generateFilterPokemon(id, name, number);
        showFilterName(id, name);
        showFilterImageSmall(id, img);
        showFilterNumber(id, number);
        showFilterType(id, types);
    }
}

function generateFilterPokemon(i, name, number) {
    return `
    <div id="filteredPokemons${i}" class="all-cards" onclick="showSoloFilteredPokemonCard(${i - 1})">        
        <h2 id="card-title${i}">${{ name }}</h2>
        <div id="card-type${i}">
            
            
        </div>
        <div class="number-name">        
            <div class="card-number">
                <div>
                    #<span id="card-number${i}"></span>
                </div>
            </div>
            <div class="card-image">
                <img id="pokemonImage${i}" src="">
            </div>
        </div>            
    </div>
        
    `;
}

function showFilterName(i, name) {
    document.getElementById(`card-title${i}`).innerHTML = name;

}

function showFilterSoloName(i) {
    let pokemonName = allPokemons[i].name;
    document.getElementById('filterPokeName').innerHTML = pokemonName;
}

function showFilterImageSmall(i, img) {
    document.getElementById(`pokemonImage${i}`).src = img;
}

function showFilterImage(i) {
    let pokemonImage = allPokemons[i].sprites.other.dream_world.front_default;
    document.getElementById('filterPokemonImage').src = pokemonImage;
}

function showFilterNumber(i, number) {
    // let num = number + 1
    if (number <= 9) {
        number = `0${number}`;
    }
    if (number < 99) {
        number = `0${number}`;
    }
    document.getElementById(`card-number${i}`).innerHTML = number
}

function showSoloFilterNumber(i) {
    let pokemonFilterNumber = i + 1
    if (i <= 9) {
        pokemonFilterNumber = `0${pokemonFilterNumber}`;
    }
    if (i < 99) {
        pokemonFilterNumber = `0${pokemonFilterNumber}`;
    }
    document.getElementById(`pokeNumber`).innerHTML = pokemonFilterNumber
}

function showFilterType(index, types) {
    document.getElementById('card-type' + index).innerHTML = "";
    for (let i = 0; i < types.length; i++) {
        document.getElementById('card-type' + index).innerHTML += `
        <div class="card-type card-text ${types[i]['type']['name']}">${types[i]['type']['name']}</div>
        `;
    }
}

function showTypeFilteredSolo(index) {
    document.getElementById('filter-card-type-solo' + index).innerHTML = "";
    for (let i = 0; i < allPokemons[index]['types'].length; i++) {
        document.getElementById('filter-card-type-solo' + index).innerHTML += `
        <div class="card-type-solo card-text ${allPokemons[index].types[i].type.name}">${allPokemons[index].types[i].type.name}</div>
        `;
    }
}

function showSoloFilteredPokemonCard(i) {
    document.getElementById('soloCard').classList.remove('d-none');
    document.getElementById('soloCard').innerHTML = generateSingleFilteredCards(i, name);
    showFilterSoloName(i)
    showSoloFilterNumber(i)
    showTypeFilteredSolo(i)
    showFilterImage(i);
}

function generateSingleFilteredCards(i, name) {
    return `
    <div id="pokemon-background">
        <div class="card-head">
            <div>
                <span class="close-btn" onclick="closeSoloCard()">X</span>
            </div>
            <div id="pokemon">
                <h1 id="filterPokeName">${{ name }}</h1>
            </div>
            <div class="pokemon-number">
                #<span id="pokeNumber">001</span>
            </div>
        </div>
        <div id="filter-card-type-solo${i}" class="card-type-solo"></div>
                <div class="pokeImgSolo">
                    <img id="filterPokemonImage" src="">
                </div>
                <div class="info-container">
                    <div id="pokemonInfoHead" class="flex">
                        <div id="about" class="" onclick="showAbout(${i})">
                            About
                        </div>
                        <div id="base" class="gray" onclick="showBaseStats(${i})">
                            Base Stats
                        </div>
                        <div id="evolution" class="gray" onclick="showEvolutions(${i})">
                            Evolution
                        </div>
                        <div id="move" class="gray" onclick="showMoves(${i})">
                            Moves
                        </div>
                    </div>
                <div>
                    <table id="table${i}" class="table">
                        <tr>
                            <td>Height</td>
                            <td id="heightPokemon"></td>
                        </tr>
                        <tr>
                            <td>Weigth</td>
                            <td id="weightPokemon"></td>
                        </tr>
                        <tr>
                            <td>Abilities</td>
                            <td id="abilities"></td>
                        </tr>
                    </table>
                </div>
        </div>
    </div>
    `;
}
