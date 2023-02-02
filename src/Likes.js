import DogProfile from "./DogProfile";
import { useEffect, useState, useRef } from "react";

const Likes = ({ likedDogs, setLikedDogs, constLikedDogs }) => {
  const [inputValue, setInputValue] = useState("");
  const [filters, setFilters] = useState([]);
  const initialRender = useRef(true);
  const secondRender = useRef(true);

  const filterByCountry = (country) => {
    if (country == "All") {
      setLikedDogs(constLikedDogs);
    } else {
      let newArray = likedDogs.filter((current) => {
        if (country == current.info.results[0].location.country) {
          return current;
        }
      });
      setLikedDogs(newArray);
    }
  };

  const constFilterProfiles = (filters) => {
    if (filters == "") {
      setLikedDogs(constLikedDogs);
    } else {
      let filteredArray = likedDogs.filter((current) => {
        let returnBool = true;
        for (let i = 0; i < filters.length; i++) {
          if (
            current.info.results[0].location.country.toLowerCase() ==
              filters[i].toLowerCase() ||
            current.info.results[0].name.first.toLowerCase() ==
              filters[i].toLowerCase() ||
            current.info.results[0].gender.toLowerCase() ==
              filters[i].toLowerCase() ||
            Math.floor(current.info.results[0].dob.age / 7) ==
              Math.floor(filters[i])
          ) {
          } else {
            returnBool = false;
          }
        }
        if (returnBool) {
          return current;
        }
      });
      setLikedDogs(filteredArray);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters([]);
    if (inputValue) {
      setFilters([...filters, inputValue]);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else if (secondRender.current) {
      secondRender.current = false;
    } else {
      constFilterProfiles(filters);
    }
  }, [filters]);
  return (
    <div className="flex flex-col">
      <div>
        <h1>Your Likes</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Search by Profile Trait</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button>Apply Filter</button>
        </form>
      </div>
      <button
        onClick={() => {
          setFilters([]);
        }}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Clear Filters
      </button>

      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
        {likedDogs.map((current) => {
          return (
            <div
              key={current.info.results[0].id.value + Math.random()}
              className="flex justify-center"
            >
              <DogProfile dogProf={current} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Likes;
