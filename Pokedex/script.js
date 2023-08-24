function fetchPokedexApi() {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=1008').then((response) => response.json())
    .then((data) => {
        let pokedex = document.querySelector('#pokedex');

        for(let i = 0; i < data.results.length; i = i + 1) {
            let pokemon = document.createElement('div');
            pokemon.setAttribute('id', i+1);
            pokedex.appendChild(pokemon);

            let pokemonName = data.results[i].name;

            let pokeButton = document.createElement('button');
            pokeButton.innerText = pokemonName.toUpperCase();
            pokemon.appendChild(pokeButton);

            fetch(data.results[i].url).then((response) => response.json()).then((description) => {

                let pokeDescription = document.createElement('div');
                pokeDescription.classList.add('hidden', 'description');
                pokeDescription.setAttribute('id', pokemonName);
                pokemon.appendChild(pokeDescription);
                pokeButton.onclick = () => {
                    changeDisplay(pokeDescription);
                };

                let pokeInfo = document.createElement('p');
                pokeInfo.innerText = 'National nº: #' + description.id.toString().padStart(4, '0');
                pokeDescription.appendChild(pokeInfo);

                let allTypes = document.createElement('div');
                allTypes.classList.add('type-div');
                allTypes.appendChild(addType(description.types[0].type.name));
                if (description.types.length == 2) {
                    allTypes.appendChild(addType(description.types[1].type.name));
                }
                pokeDescription.appendChild(allTypes);

                let pokeImg = document.createElement('div');
                pokeImg.appendChild(addImg(description.sprites.other['official-artwork'].front_default));
                pokeDescription.appendChild(pokeImg);

                fetch(description.species.url).then((response) => response.json()).then((flavorText) => {
                    let flavorTextEntries = document.createElement('div');
                    flavorTextEntries.classList.add('poke-info');


                    let cleanedFlavorText = flavorText.flavor_text_entries[0].flavor_text.replace(/\n/g, ' ');
                    cleanedFlavorText = cleanedFlavorText.replace(/[^a-zA-Z0-9.,!?áéíóúÁÉÍÓÚâêîôûÂÊÎÔÛàèìòùÀÈÌÒÙçÇãõÃÕ ]/g, '');


                    flavorTextEntries.innerText = cleanedFlavorText;
                    pokeDescription.appendChild(flavorTextEntries);

                });
            })
        }
    })
}

function addImg(src) {
    let pokeImg = document.createElement('img');
    pokeImg.src = src;
    pokeImg.classList.add('main-img');
    return pokeImg;
}

function addType(type) {
    let buttonType = document.createElement('button');
    buttonType.classList.add(type, 'type-icon');
    buttonType.innerText = type;
    return buttonType;
}

function changeDisplay(div) {
    div.classList.toggle("hidden");
}