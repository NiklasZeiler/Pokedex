let currentPokemons;
let allPokemons = [];
let bg_color;
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
        showTypes(i);
    }
}


function generatePokemonCards(i) {
    return `
    <div id="allCards${i}" class="all-cards" onclick="showSoloPokemonCard(${i})">        
        <h2 id="card-title${i}"></h2>
        <div>
            <div class="card-element card-text" id="card-element${i}">
            </div>
            <div class="card-type card-text" id="card-type${i}">
            </div>
        </div>        
        <div class="card-number">
            <div>
                #<span id="card-number${i}"></span>
            </div>
        </div>
        <div class="card-image">
            <img id="card-image${i}" src="">
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


function showTypes(i) {
    let type1 = allPokemons[i]['types'][0]['type']['name'];
    let type2 = allPokemons[i]['types'][1]['type']['name'];
    document.getElementById(`card-element${i}`).innerHTML = type1;
    document.getElementById('pokeType1').innerHTML = type1;
    document.getElementById(`card-type${i}`).innerHTML = type2;
    document.getElementById('pokeType2').innerHTML = type2;
    // checkBgColor(i);
    removeType2(type2, i);

}


function showSoloPokemonCard(i) {
    document.getElementById('soloCard').classList.remove('d-none');
    document.getElementById('soloCard').innerHTML = generateSingleCards(i);
    showNumber(i);
    showName(i);
    showImage(i);
    showTypes(i);
    showAboutPokemon(i);
    showBgColor(i);
}


function generateSingleCards(i) {
    return `
    <div id="pokemon-background">
        <div class="card-head">
            <div class="close-btn">
                <span onclick="closeSoloCard()">X</span>
            </div>
            <div id="pokemon">
                <h1 id="pokeName">Name</h1>
            </div>
            <div class="pokemon-number">
                #<span id="pokeNumber">001</span>
            </div>
        </div>
        <div class="pokemon-art">
            <div>
                <span class="bg-text" id="pokeType1">grass</span>
            </div>
            <div>
                <span class="bg-text" id="pokeType2">poisen</span>
            </div>
        </div>
    </div>
        <div class="info-container">
            <img id="pokemonImage" src="">
            <div id="pokemonInfoHead">
                <div id="about" class="redBorderline" onclick="showAbout(${i})">
                    About
                </div>
                <div id="base" class="gray" onclick="showBaseStats(${i})">
                    Base Stats
                </div>
                <div onclick="showEvolutions()">
                    Evolution
                </div>
                <div onclick="showMoves()">
                    Moves
                </div>
            </div>
            <div>
                <table>
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


function showBaseStats(i) {
    document.getElementById('base').classList.add('redBorderline');
    document.getElementById('about').classList.remove('redBorderline');
    document.getElementById('base').classList.remove('gray');
    document.getElementById('about').classList.add('gray');
    document.getElementById('soloCard').style.height = '750px';
}


function showAboutPokemon(i) {
    let height = allPokemons[i]['height'];
    let weight = allPokemons[i]['weight'];
    document.getElementById('height').innerHTML = height + ' cm';
    document.getElementById('weight').innerHTML = weight + ' kg';
    document.getElementById('abilities').innerHTML = '';
    for (let j = 0; j < allPokemons[i]['abilities']['lenght']; j++) {
        let abilities = allPokemons[i]['abilities'][lenght][j]['abilities']['name'];
        if (j == 0) {
            document.getElementById('abilities').innerHTML += `${abilities}`;
        } else {
            document.getElementById('abilities').innerHTML += `${abilities}`;
        }

    }

}


function closeSoloCard() {
    document.getElementById('soloCard').classList.remove(bg_color);
    document.getElementById('soloCard').classList.add('d-none');
}


// function checkBgColor(i) {
//     loadPokemonClassFirstColor('grass', allPokemons[i], 'grass', 'bg-grass');
// }


// function loadPokemonClassFirstColor(type1, i, class1, bgColor) {
//     let card = document.getElementById('pokeType1' + i);
//     if (type1 == class1);
//     bg_color = bgColor;
//     card.classList.add(bgColor);    
// }


function removeType2(type2, i) {
    let cardType = document.getElementById('card-type' + i);
    let cardType2 = document.getElementById('pokeType2');
    if (type2 == 1) {
        type2 = '';
        cardType.classList.add('d-none');
        cardType2.classList.add('d-none');
    }
    if (type2 == 2) {
        type2 = allPokemons[i]['types'][1]['type']['name'];
        cardType.innerHTML = type2;
        cardType2.classList.remove('d-none');
        cardType2.innerHTML = type2;
    }
    // checkBgColor(i);
}