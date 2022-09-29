import React from "react";
import Pet from "./Pet";

function PetBrowser({ pets, onAdoptPet, adopt }) {

  const renderPets = pets.map(pet => (
    <Pet key={pet.id} pet={pet} onAdoptPet={onAdoptPet} adopt={adopt}/>
  ))

  return <div className="ui cards">{renderPets}</div>;
}

export default PetBrowser;
