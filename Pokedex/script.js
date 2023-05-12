function fetchPokedexApi() {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=1010').then((response) => response.json())
    .then((data) => {
        let pokedex = document.querySelector('#pokedex');

        for(let i = 0; i < data.results.length; i = i + 1) {
            let pokemon = document.createElement('div');
            pokemon.setAttribute('id', i+1);
            pokedex.appendChild(pokemon);

            let pokeButton = document.createElement('button');
            pokeButton.innerText = data.results[i].name.toUpperCase();
            pokemon.appendChild(pokeButton);

            fetch(data.results[i].url).then((response) => response.json()).then((description) => {
                //console.log(description)

                let pokeDescription = document.createElement('div');
                pokeDescription.classList.add('description', 'hidden');
                pokemon.appendChild(pokeDescription);

                let pokeInfo = document.createElement('p');
                let text = [];
                pokeInfo.innerText = 'National nº: #' + pokemon.id.toString().padStart(4, '0');
                pokeDescription.appendChild(pokeInfo);

                let allTypes = document.createElement('div');
                allTypes.appendChild(addType(description.types[0].type.name));
                if (description.types.length == 2) {
                    allTypes.appendChild(addType(description.types[1].type.name));
                }
                pokeDescription.appendChild(allTypes);

            })
        }
    })
}

function addType(type) {
    let buttonType = document.createElement('button');
    buttonType.classList.add(type, 'type-icon');
    buttonType.innerText = type;

    return buttonType;
}

function changeDisplay (div) {
    div.classList.remove('hidden');
}