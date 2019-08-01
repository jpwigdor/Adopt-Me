import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";

const SearchParams = () => {
  // location = default location
  // setLocation = new typed location
  // all hooks begin with "use"
  // old version would have used setState much more often

  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState("");
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown] = useDropdown("Breed", "", breeds);

  // useEffect replaces componentDidMount(), componentWillUnmount(), componentDidUpdate()
  useEffect(() => {
    // pet.breeds("dog").then(console.log, console.error);
    updateBreeds([]); // requesting new breeds? this will clear out existing breeds shown.
    updateBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    });
  });

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => {
              setLocation(e.target.value);
            }}
          />
        </label>

        <AnimalDropdown />
        <BreedDropdown />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
