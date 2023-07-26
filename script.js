/*Formato de recepción de cada Pokemon
{
    "abilities": [
      "Overgrow"
    ],
    "detailPageURL": "/us/pokedex/bulbasaur",
    "weight": 15.2,
    "weakness": [
      "Fire",
      "Psychic",
      "Flying",
      "Ice"
    ],
    "number": "001",
    "height": 28,
    "collectibles_slug": "bulbasaur",
    "featured": "true",
    "slug": "bulbasaur",
    "name": "Bulbasaur",
    "ThumbnailAltText": "Bulbasaur",
    "ThumbnailImage": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    "id": 1,
    "type": [
      "grass",
      "poison"
    ]
  }*/
request(0)
var idR = 0
var searchValue = ''

function request(action) {
  fetch("./info.json").then((value) => {
    return value.json()
  }).then((valueJSON) => {
    switch (action) {
      case 0:
        createCards(valueJSON)
        break
      case 1:
        requestFill(valueJSON)
        break
      case 2:
        search(valueJSON)
        break
    }
  })
}

/*
class Pokemon{
    constructor(abilities, detailPageURL, weight, weakness, number, height, collectibles_slug, featured, slug, name, ThumbnailAltText, ThumbnailImage, id, type){
        this.abilities = abilities
        this.detailPageURL = detailPageURL
        this.weight = weight
        this.weakness = weakness
        this.number = number
        this.height = height
        this.collectibles_slug = collectibles_slug
        this.featured = featured
        this.slug = slug
        this.name = name
        this.ThumbnailAltText = ThumbnailAltText
        this.ThumbnailImage = ThumbnailImage
        this.id = id
        this.type = type
    }
}*/

function abilitiesUpper(pokemon) {
  let abilities = ""
  let i = 0
  for (let abilitie of pokemon.abilities) {
    abilities += abilitie[0].toUpperCase() + abilitie.substring(1)
    if (pokemon.abilities.length - 1 != i) {
      abilities += ", "
    }
    i++
  }
  return abilities
}

function typesUpper(pokemon) {
  let types = ""
  let i = 0
  for (let type of pokemon.type) {
    types += type[0].toUpperCase() + type.substring(1)
    if (pokemon.type.length - 1 != i) {
      types += ", "
    }
    i++
  }
  return types
}

function weaknessUpper(pokemon) {
  let weakness = ""
  let i = 0
  for (let weaknes of pokemon.weakness) {
    weakness += weaknes[0].toUpperCase() + weaknes.substring(1)
    if (pokemon.weakness.length - 1 != i) {
      weakness += ", "
    }
    i++
  }
  return weakness
}

function createCards(pokemons) {
  let i = 0
  document.getElementById("cards").innerHTML = "";
  for (let pokemon of pokemons) {
    let abilities = abilitiesUpper(pokemon)
    let types = typesUpper(pokemon)
    document.getElementById("cards").innerHTML += `
    <div class="col">
      <div class="card h-100">
        <div class="card-header" id="pokemonNumberName">${pokemon.number} ${pokemon.name}</div>
          <img src="${pokemon.ThumbnailImage}"
            class="card-img-top img-fluid img-thumbnail" alt="${pokemon.ThumbnailAltText}" id="pokemonThumbnail">
        <div class="card-body">
          <h5 class="card-title">Pokemon Type</h5>
          <p class="card-text" id="pokemonTypes">${types}</p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#modalInfo" id="about" onclick="modalFill(${pokemon.id})">About</button>
        </div>
        <div class="card-footer">
              <small class="text-body-secondary" id="pokemonAbilities">Abilities: ${abilities}</small>
        </div>
      </div>
    </div>`

    i++
    if (i == 151) {
      return
    }
  }
}

function searchButton() {  
  searchValue = document.getElementById('searchInput').value  
  request(2)
}

function search(pokemons) {
  document.getElementById("cards").innerHTML = "";
  for (let pokemon of pokemons) {
    if (pokemon.name.includes(searchValue) || pokemon.number.includes(searchValue)) {
      let abilities = abilitiesUpper(pokemon)
      let types = typesUpper(pokemon)
      document.getElementById("cards").innerHTML += `
    <div class="col">
      <div class="card h-100">
        <div class="card-header" id="pokemonNumberName">${pokemon.number} ${pokemon.name}</div>
          <img src="${pokemon.ThumbnailImage}"
            class="card-img-top img-fluid img-thumbnail" alt="${pokemon.ThumbnailAltText}" id="pokemonThumbnail">
        <div class="card-body">
          <h5 class="card-title">Pokemon Type</h5>
          <p class="card-text" id="pokemonTypes">${types}</p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#modalInfo" id="about" onclick="modalFill(${pokemon.id})">About</button>
        </div>
        <div class="card-footer">
              <small class="text-body-secondary" id="pokemonAbilities">Abilities: ${abilities}</small>
        </div>
      </div>
    </div>`
    }
  }
}

function modalFill(id) {
  idR = id
  request(1)
}

function requestFill(pokemons) {
  for (let pokemon of pokemons) {
    if (pokemon.id == idR) {
      document.getElementById('modalNumberName').innerHTML = `${pokemon.number}<span class="strong"> ${pokemon.name} </span> `
      let imgThumb = document.getElementById('modalThumbnail')
      imgThumb.setAttribute('src', pokemon.ThumbnailImage)
      imgThumb.setAttribute('alt', pokemon.ThumbnailAltText)
      let types = typesUpper(pokemon)
      document.getElementById('modalType').innerHTML = `&nbsp &nbsp &nbsp ${types}`
      let abilities = abilitiesUpper(pokemon)
      document.getElementById('modalAbilities').innerHTML = `&nbsp &nbsp &nbsp${abilities}`
      let weakness = weaknessUpper(pokemon)
      document.getElementById('modalWeakness').innerHTML = `&nbsp &nbsp${weakness}`
      document.getElementById('modalHeight').innerHTML = `${pokemon.height}`
      document.getElementById('modalWeight').innerHTML = `${pokemon.weight}`
    }
  }
}

/*
      
      <div class="modal fade" id="exampleModal${pokemon.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Pokemon name : ${pokemon.name}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
*/