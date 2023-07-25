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
        console.log(valueJSON)
        
    })
    