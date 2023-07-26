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

fetch("./info.json").then((value) => {
  return value.json()
}).then((valueJSON) => {
  createCards(valueJSON)
})

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

function createCards(pokemons) {
  document.getElementById("card").innerHTML = "";
  for (let pokemon of pokemons) {
    document.getElementById("card").innerHTML += `
      <div class="col-md-4 mt-3">
      <div class="card p-3 ps-5 pe-5">
      <h3 >${pokemon.name}</h3>
      <img src="${pokemon.ThumbnailImage}"width="100%" height="100px"/>
      <p class="mt-2">${pokemon.type}</p>
      <p class="mt-2">${pokemon.id}</p>
      <button type="button id="${pokemon.id}" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal${pokemon.id}>info</button>
      
      
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
      `;
    /*if (pokemon.name.includes("saur")) {
      console.log(`${pokemon.id} The pokemon ${pokemon.number} names ${pokemon.name}`)
    }*/
  }
}
