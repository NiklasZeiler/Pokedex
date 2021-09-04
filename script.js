let currentPokemons;
let allPokemons = [];
let loadCurrentCards = 0;


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
                <span class="close-btn" onclick="closeSoloCard(${i})">X</span>
            </div>
            <div id="pokemon">
                <h1 id="pokeName">Name</h1>
            </div>
            <div class="pokemon-number">
                #<span id="pokeNumber">001</span>
            </div>
        </div>    
        <div id="card-type-solo${i}" class="card-type-solo"></div>
    </div>
        <div class="info-container">
            <img id="pokemonImage" src="">
            <div id="pokemonInfoHead" class="flex">
                <div id="about" class="" onclick="showAboutPokemon(${i})">
                    About
                </div>
                <div id="base" class="gray" onclick="showBaseStats(${i})">
                    Base Stats
                </div>
                <div id="evolution" class="gray" onclick="showEvolutions()">
                    Evolution
                </div>
                <div id="move" class="gray" onclick="showMoves()">
                    Moves
                </div>
            </div>
            <div>
                <table id="table${i}" class="table">
                    <tr>
                        <td>Height</td>
                        <td id="height">60cm</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td id="weight">8.5 kg</td>
                    </tr>
                    <tr>
                        <td>Abilities</td>
                        <td id="abilities">Blaze, Solar-Power</td>
                    </tr>
                </table>
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


function showBaseStats(i) {
    document.getElementById('base').classList.remove('gray');
    document.getElementById('about').classList.add('gray');
    document.getElementById('evolution').classList.add('gray');
    document.getElementById('move').classList.add('gray');
    changeColorBaseStats();
    document.getElementById('pokemon-background').style.height = '750px';
}


function changeColorBaseStats() {
    chooseColorBaseStats(hp, '#5bc686', '#fb7171');
    chooseColorBaseStats(attack, '#5bc686', '#fb7171');
    chooseColorBaseStats(defense, '#5bc686', '#fb7171');
    chooseColorBaseStats(spAtk, '#5bc686', '#fb7171');
    chooseColorBaseStats(spDef, '#5bc686', '#fb7171');
    chooseColorBaseStats(speed, '#5bc686', '#fb7171');
    chooseColorBaseStats(total, '#5bc686', '#fb7171');
    chooseColorBaseStats(totalWitdh, '#5bc686', '#fb7171');
    // generateBaseStats();
}


function chooseColorBaseStats(attribut, color, color2, i) {
    changeColorBaseStats();
    if (attribut > 50) {
        attributColor = color;
    } else {
        attributColor = color2;
    }
    let hp = allPokemons[i]['stats'][0]['base_stat'];
    let attack = allPokemons[i]['stats'][1]['base_stat'];
    let defense = allPokemons[i]['stats'][2]['base_stat'];
    let spAtk = allPokemons[i]['stats'][3]['base_stat'];
    let spDef = allPokemons[i]['stats'][4]['base_stat'];
    let speed = allPokemons[i]['stats'][5]['base_stat'];
    let total = hp + attack + defense + spAtk + spDef + speed;
    let totalWitdh = total / 6;
    document.getElementById(`table${i}`).innerHTML = generateBaseStats(hp, attack, defense, spAtk, spDef, speed, total, totalWitdh, hpColor, attackColor, defenseColor, spAtkColor, spDefColor, speedColor, totalColor);
}


// function showBaseStats(i) {
//     document.getElementById('base').classList.remove('gray');
//     document.getElementById('about').classList.add('gray');
//     document.getElementById('evolution').classList.add('gray');
//     document.getElementById('move').classList.add('gray');
//     let hp = allPokemons[i]['stats'][0]['base_stat'];
//     let attack = allPokemons[i]['stats'][1]['base_stat'];
//     let defense = allPokemons[i]['stats'][2]['base_stat'];
//     let spAtk = allPokemons[i]['stats'][3]['base_stat'];
//     let spDef = allPokemons[i]['stats'][4]['base_stat'];
//     let speed = allPokemons[i]['stats'][5]['base_stat'];
//     let total = hp + attack + defense + spAtk + spDef + speed;
//     let totalWitdh = total / 6;
//     changeColorBaseStats();
//     document.getElementById('pokemon-background').style.height = '750px';
//     document.getElementById('table').innerHTML = generateBaseStats(changeColorBaseStats());
// }



// function chooseCurrentColor(i) {
//     let hp = allPokemons[i]['stats'][0]['base_stat'];
//     let attack = allPokemons[i]['stats'][1]['base_stat'];
//     let defense = allPokemons[i]['stats'][2]['base_stat'];
//     let spAtk = allPokemons[i]['stats'][3]['base_stat'];
//     let spDef = allPokemons[i]['stats'][4]['base_stat'];
//     let speed = allPokemons[i]['stats'][5]['base_stat'];
//     let total = hp + attack + defense + spAtk + spDef + speed;
//     let totalWitdh = total / 6;

//     if (hp > 50) {
//         hpColor = '#5bc686';
//     }
//     else {
//         hpColor = '#fb7171';
//     }

//     if (attack > 50) {
//         attackColor = '#5bc686';
//     }
//     else {
//         attackColor = '#fb7171';
//     }

//     if (defense > 50) {
//         defenseColor = '#5bc686';
//     }
//     else {
//         defenseColor = '#fb7171';
//     }

//     if (spAtk > 50) {
//         spAtkColor = '#5bc686';
//     }
//     else {
//         spAtkColor = '#fb7171';
//     }

//     if (spDef > 50) {
//         spDefColor = '#5bc686';
//     }
//     else {
//         spDefColor = '#fb7171';
//     }

//     if (speed > 50) {
//         speedColor = '#5bc686';
//     }
//     else {
//         speedColor = '#fb7171';
//     }
//     if (totalWitdh > '50') {
//         totalColor = '#5bc686';
//     }
//     else {
//         totalColor = '#fb7171';
//     }
//     document.getElementById(`table${i}`).innerHTML = generateBaseStats(hp, attack, defense, spAtk, spDef, speed, total, totalWitdh, hpColor, attackColor, defenseColor, spAtkColor, spDefColor, speedColor, totalColor);
// }


function generateBaseStats(hp, attack, defense, spAtk, spDef, speed, total, totalWitdh, hpColor, attackColor, defenseColor, spAtkColor, spDefColor, speedColor, totalColor) {
    return `
    	<tr>
            <td>HP</td>
            <td id="hp" class="hp">${hp}
                <div  class="range-view">
                    <span style="width:${hp}% ; background-color: ${hpColor}" class="baseStatsLine"></span>
                </div>
            </td>
        </tr>
        <tr>
            <td>Attack</td>
            <td id="attack" class="attack">${attack}
                <div  class="range-view">
                    <span style="width:${attack}% ; background-color: ${attackColor}" class="baseStatsLine"></span>
                </div>
            </td>
        </tr>
        <tr>
            <td>Defense</td>
            <td id="defense" class="defense">${defense}
                <div  class="range-view">
                    <span style="width:${defense}% ; background-color: ${defenseColor} " class="baseStatsLine"></span>
                </div>
            </td>
        </tr>
        <tr>
            <td>Sp. Atk</td>
            <td id="spAtk" class="spAtk">${spAtk}
                <div  class="range-view">
                    <span style="width:${spAtk}% ; background-color: ${spAtkColor} " class="baseStatsLine"></span>
                </div>
            </td>
        </tr>
        <tr>
            <td>Sp. Def</td>
            <td id="spDef" class="spDef">${spDef}
                <div  class="range-view">
                    <span style="width:${spDef}% ; background-color: ${spDefColor}" class="baseStatsLine"></span>
                </div>
            </td>
        </tr>
        <tr>
            <td>Speed</td>
            <td id="speed" class="speed">${speed}
                <div  class="range-view">
                    <span style="width:${speed}% ; background-color: ${speedColor}" class="baseStatsLine"></span>
                </div>
            </td>
        </tr>
        <tr>
            <td>Total</td>
            <td id="total" class="total">${total}
                <div  class="range-view">
                    <span style="width:${totalWitdh}% ; background-color: ${totalColor}" class="baseStatsLine"></span>
                </div>
            </td>
        </tr>    
    `;
}


function showAboutPokemon(i) {
    document.getElementById('base').classList.add('gray');
    document.getElementById('about').classList.remove('gray');
    document.getElementById('evolution').classList.add('gray');
    document.getElementById('move').classList.add('gray');
    let height = allPokemons[i]['height'];
    let weight = allPokemons[i]['weight'];
    document.getElementById('height').innerHTML = `${height} cm`;
    document.getElementById('weight').innerHTML = `${weight} kg`;
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


function closeSoloCard() {
    document.getElementById('soloCard').classList.add('d-none');
}
