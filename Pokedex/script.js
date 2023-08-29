function fetchPokedexApi() {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=1008').then((response) => response.json())
    .then((data) => {
        let pokedex = document.querySelector('#pokedex');

        for(let i = 0; i < data.results.length; i = i + 1) {
            let pokemon = createDiv('pokemon', pokedex);
            pokemon.setAttribute('id', i+1);

            let pokemonName = data.results[i].name;

            let pokeButton = document.createElement('button');
            pokeButton.innerText = pokemonName.toUpperCase();
            pokemon.appendChild(pokeButton);

            fetch(data.results[i].url).then((response) => response.json()).then((description) => {

                let pokeDescription = createDiv('hidden', pokemon);
                pokeDescription.setAttribute('id', pokemonName);
                pokeButton.onclick = () => {
                    changeDisplay(pokeDescription);
                };

                let pokeInfo = document.createElement('p');
                pokeInfo.innerText = 'National nº: #' + description.id.toString().padStart(4, '0');
                pokeDescription.appendChild(pokeInfo);

                addType(description, pokeDescription);

                addImg(description, pokeDescription);

                fetch(description.species.url).then((response) => response.json()).then((flavorText) => {
                    addFlavorText(flavorText, pokeDescription);
                });
            })
        }
    })
}

function createDiv(divClass, mainDiv) {
    let div = document.createElement('div');
    div.classList.add(divClass);
    mainDiv.appendChild(div);
    return div;
}

function addFlavorText(flavor, mainDiv) {
    let allFlavorTextEntries = createDiv('poke-info', mainDiv); 

    let flavorEntries = flavor.flavor_text_entries;

    flavorEntries.forEach((entry) => {
        if (entry.language.name == 'en') {
            flavorTextByGame(entry, allFlavorTextEntries);
        }
    })

    return allFlavorTextEntries;
}

function flavorTextByGame (text, mainDiv) {
    let flavorTextEntries = createDiv('flavor-text', mainDiv);
    let game = document.createElement('p');
    game.innerText = 'Game:' + text.version.name;
    console.log(text.version.name);
    flavorTextEntries.appendChild(game);
    let cleanedFlavorText = text.flavor_text.replace(/\n/g, ' ');
    flavorTextEntries.innerText += cleanedFlavorText.replace(/[^a-zA-Z0-9.,!?áéíóúÁÉÍÓÚâêîôûÂÊÎÔÛàèìòùÀÈÌÒÙçÇãõÃÕ ]/g, '');
    return flavorTextEntries;

}

function addImg(src, mainDiv) {
    let divImg = createDiv('div-img', mainDiv);
    let pokeImg = document.createElement('img');
    pokeImg.src = src.sprites.other['official-artwork'].front_default;
    pokeImg.classList.add('main-img');
    divImg.appendChild(pokeImg);
    return divImg;
}

function addType(src, mainDiv) {
    let allTypes = createDiv('type-div', mainDiv);
    let buttonType = document.createElement('button');
    buttonType.classList.add(src.types[0].type.name, 'type-icon');
    buttonType.innerText = src.types[0].type.name;
    allTypes.appendChild(buttonType);

    if (src.types.length == 2) {
        let secondType = document.createElement('button');
        secondType.classList.add(src.types[1].type.name, 'type-icon');
        secondType.innerText = src.types[1].type.name;
        allTypes.appendChild(secondType);
    }
    return allTypes;
}

function changeDisplay(div) {
    div.classList.toggle("hidden");
}

fetchPokedexApi()