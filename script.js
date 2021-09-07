let currentPokemons;
let allPokemons = [];
let loadCurrentCards = 0;
let evolutions = [];

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
    generation1_pokemons = responseAsJSON;
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
    let pokemonName = allPokemons[i]['name'];
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
                <h1 id="pokeName">Name</h1>
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


function showTypeSolo(index) {
    document.getElementById('card-type-solo' + index).innerHTML = "";
    for (let i = 0; i < allPokemons[index]['types'].length; i++) {
        document.getElementById('card-type-solo' + index).innerHTML += `
        <div class="card-type-solo ${allPokemons[index]['types'][i]['type']['name']}">${allPokemons[index]['types'][i]['type']['name']}</div>
        `;
    }
}


function generateAboutPokemon(i) {
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
    document.getElementById(`table${i}`).innerHTML = generateAboutPokemon(i);
    showAboutPokemon(i);
    displayAbout();
    document.getElementById('pokemon-background').style.height = '550px';

}


function showBaseStats(i) {
    displayBaseStets();
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


async function loadEvolutions() {
    let url = (`https://pokeapi.co/api/v2/evolution-chain/1/`);
    let res = await fetch(url);
    let resAsJSON = await res.json();
    evolutions[0] = resAsJSON;
}

function showEvolutionName() {
    let firstEvolutionName = evolutions["chain"]["species"]["name"];
    let secondEvolutionName = evolutions["chain"]["evolves_to"][0]["species"]["name"];
    let thirdEvolutionName = evolutions["chain"]["evolves_to"][0]["evolves_to"][0]["species"]["name"];
    document.getElementById('evolutionName1').innerHTML = firstEvolutionName;
    document.getElementById('evolutionName2').innerHTML = secondEvolutionName;
    document.getElementById('evolutionName3').innerHTML = thirdEvolutionName;

}
/**
 * Kann es sein das ich das hier mit einer For-Schleife lösen muss???
 */
function showEvolutionImage(i) {
    let firstEvolutionImage = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    let secondEvolutionImage = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    let thirdEvolutionImage = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokemonFirstEvolution').src = firstEvolutionImage;
    document.getElementById('pokemonSecondEvolution').src = secondEvolutionImage;
    document.getElementById('pokemonThirdEvolution').src = thirdEvolutionImage;

}

function showEvolutionNumber() {

}


function showEvolutions(i) {
    displayEvolution();
    document.getElementById('table' + i).innerHTML = '';
    showEvolutionImage(i);
    document.getElementById('table' + i).innerHTML += generateEvolution();
}


function generateEvolution() {
    return `
        <tr>
            <td>
            <img id="pokemonFirstEvolution" src="">
            </td>
            <td>Nummer</td>
            <td id="evolutionName1">Name</td>
        </tr>
        <tr>
            <td>
            <img id="pokemonSecondEvolution" src="">
            </td>
            <td>Nummer</td>
            <td id="evolutionName2">Name</td>
        </tr>
        <tr>
            <td>
            <img id="pokemonThirdEvolution" src="">
            </td>
            <td>Nummer</td>
            <td id="evolutionName3">Name</td>
        </tr>
    `;
}

function displayBaseStets() {
    document.getElementById('base').classList.remove('gray');
    document.getElementById('about').classList.add('gray');
    document.getElementById('evolution').classList.add('gray');
    document.getElementById('move').classList.add('gray');
}


function displayAbout() {
    document.getElementById('base').classList.add('gray');
    document.getElementById('about').classList.remove('gray');
    document.getElementById('evolution').classList.add('gray');
    document.getElementById('move').classList.add('gray');
}


function displayEvolution() {
    document.getElementById('base').classList.add('gray');
    document.getElementById('about').classList.add('gray');
    document.getElementById('evolution').classList.remove('gray');
    document.getElementById('move').classList.add('gray');
}


// function dispalyMove() {
//     document.getElementById('base').classList.add('gray');
//     document.getElementById('about').classList.add('gray');
//     document.getElementById('evolution').classList.add('gray');
//     document.getElementById('move').classList.remove('gray');
// }





function closeSoloCard() {
    document.getElementById('soloCard').classList.add('d-none');
}
