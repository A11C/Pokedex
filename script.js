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
  
   fetch("./info.json").then((value)=>{
        return value.json()
    }).then((valueJSON)=>{
        crearPokemon(valueJSON)        
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
    
    function crearPokemon(pokemons){
        for(let pokemon of pokemons){
            console.log(pokemon.name)
        }
    }