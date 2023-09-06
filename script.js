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

/*Iniciador de la página con la información*/
request()
var idR = 0
var searchValue = ''
var pokemons = []

/*Función de solicitud al json*/
function request() {
  fetch("./info.json").then((value) => {
    return value.json()
  }).then((valueJSON) => {
    createPokes(valueJSON)
  }).catch((error) => {
    alert(`${error}`)
  })
}

function createPokes(pokes) {
  for (i = 0; i < pokes.length; i++) {
    let abilities1 = abilitiesUpper(pokes[i])
    let types = typesUpper(pokes[i])
    let weakness1 = weaknessUpper(pokes[i])
    let poke = new Pokemon({
      abilities: abilities1,
      detailPageURL: pokes[i].detailPageURL,
      weight: pokes[i].weight,
      weakness: weakness1,
      number: pokes[i].number,
      height: pokes[i].height,
      collectibles_slug: pokes[i].collectibles_slug,
      featured: pokes[i].featured,
      slug: pokes[i].slug,
      name: pokes[i].name,
      ThumbnailAltText: pokes[i].ThumbnailAltText,
      ThumbnailImage: pokes[i].ThumbnailImage,
      id: pokes[i].id,
      type: types
    })
    pokemons.push(poke)
  }
  createCards()
}

class Pokemon {
  constructor({ abilities, detailPageURL, weight, weakness, number, height, collectibles_slug, featured, slug, name, ThumbnailAltText, ThumbnailImage, id, type }) {
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
}

/* Bloque de funciones para capitalizar las habilidades, tipos y debilidades */
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

/* Función para la creación de cada tarjeta de los pokemones contenidos en el json  */
function createCards() {
  let i = 0
  document.getElementById("cards").innerHTML = "";
  for (let pokemon of pokemons) {
    document.getElementById("cards").innerHTML += `
    <div class="col">
      <div class="card h-100">
        <div class="card-header" id="pokemonNumberName">Nº ${pokemon.number} ${pokemon.name}</div>
          <img src="${pokemon.ThumbnailImage}"
            class="card-img-top img-fluid img-thumbnail" alt="${pokemon.ThumbnailAltText}" id="pokemonThumbnail">
        <div class="card-body">
          <h5 class="card-title">Type: <small class="text-body-secondary" id="pokemonTypes">${pokemon.type}</small></h5>
          <h5 class="card-title">Abilities: <small class="text-body-secondary" id="pokemonAbilities">${pokemon.abilities}</small></h5>          
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#modalInfo" id="about" onclick="modalFill(${pokemon.id})">About</button>              
        </div>
      </div>
    </div>`

    i++
    if (i == 152) {
      return
    }
  }
}

/*Función que se lanza al darle clik al botón de buscar */
function searchButton() {
  searchValue = document.getElementById('searchInput').value
  document.getElementById('searchInput').value = ''
  if (searchValue == '') {
    createCards()
  } else {
    search()
  }
}
/*Función que detecta si dentro del contenedor del input se presiona Enter */
var searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    searchButton()
  }
})

/*Función para "recargar" la página al presionar ESC */
document.addEventListener("keyup", function (event) {
  if (event.key === 'Escape') {
    createCards()
  }
});

/* Función para generar las tarjetas de los pokemones encontrados */
function search() {
  document.getElementById("cards").innerHTML = "";
  for (let pokemon of pokemons) {
    if (pokemon.name.includes(searchValue) || pokemon.number.includes(searchValue)) {
      document.getElementById("cards").innerHTML += `
    <div class="col">
      <div class="card h-100">
        <div class="card-header" id="pokemonNumberName">Nº ${pokemon.number} ${pokemon.name}</div>
          <img src="${pokemon.ThumbnailImage}"
            class="card-img-top img-fluid img-thumbnail" alt="${pokemon.ThumbnailAltText}" id="pokemonThumbnail">
        <div class="card-body">
          <h5 class="card-title">Type: <small class="text-body-secondary" id="pokemonTypes">${pokemon.type}</small></h5>
          <h5 class="card-title">Abilities: <small class="text-body-secondary" id="pokemonAbilities">${pokemon.abilities}</small></h5>          
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#modalInfo" id="about" onclick="modalFill(${pokemon.id})">About</button>
        </div>
      </div>
    </div>`
    }
  }
}

/* Función que se lanza al darle al botón About generar */
function modalFill(id) {
  idR = id
  requestFill()
}

/* Función para el rellenado del modal */
function requestFill() {
  for (let pokemon of pokemons) {
    if (pokemon.id == idR) {
      document.getElementById('modalNumberName').innerHTML = `Nº ${pokemon.number}<span class="strong"> ${pokemon.name} </span> `
      let imgThumb = document.getElementById('modalThumbnail')
      imgThumb.setAttribute('src', pokemon.ThumbnailImage)
      imgThumb.setAttribute('alt', pokemon.ThumbnailAltText)
      document.getElementById('modalType').innerHTML = `&nbsp &nbsp &nbsp ${pokemon.type}`
      document.getElementById('modalAbilities').innerHTML = `&nbsp &nbsp &nbsp${pokemon.abilities}`
      document.getElementById('modalWeakness').innerHTML = `&nbsp &nbsp${pokemon.weakness}`
      document.getElementById('modalHeight').innerHTML = `${pokemon.height}`
      document.getElementById('modalWeight').innerHTML = `${pokemon.weight}`
      let url = document.getElementById('url')
      url.setAttribute('href', `https://www.pokemon.com${pokemon.detailPageURL}`)
    }
  }
}
