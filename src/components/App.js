import React, { useState, useEffect } from "react";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  useEffect(() => {
    fetch("http://localhost:3001/pets")
    .then(r => r.json())
    .then(setPets)
  }, [])

  function onChangeType(e) {
    setFilters(e.target.value)
  }

  function renderPets(filteredPet) {
    setPets(filteredPet)
  }

  function onFindPetsClick(petType){
    //if petType === "all" fetch pets
    //else return //pets?type=${petType}
    if (petType === "all") {
      fetch("http://localhost:3001/pets")
      .then(r => r.json())
      .then(fetchPets => renderPets(fetchPets))
    } else if (petType === filters) {
        fetch(`http://localhost:3001/pets?type=${petType}`)
        .then(r => r.json())
        .then(fetchPets => renderPets(fetchPets))
    }
  }

  function onAdoptPet(petID){
    const adoptPet = pets.map(pet => {
      return pet.id === petID ?  {...pet, isAdopted: true} : pet
    })
    setPets(adoptPet)
  }

  // const filteredPets = pets.filter(pet => {
  //    return filters === "all" ? pet : filters === pet.type
  // })


  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onFindPetsClick={onFindPetsClick} filters={filters} onChangeType={onChangeType}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
