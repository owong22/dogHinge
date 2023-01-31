import DogProfile from "./DogProfile";
import { useEffect, useState, useRef } from "react";

const Likes = ({
  likedDogs,
  setLikedDogs,
  constLikedDogs,
  setConstLikedDogs,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filters, setFilters] = useState([]);
  const initialRender = useRef(true);
  const secondRender = useRef(true);
  let uniqueDogProf = [
    ...new Set(
      likedDogs.map((current) => current.info.results[0].location.country)
    ),
  ];

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
        if (current.info.results[0].location.country == filters[0]) {
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
    <div>
      <h1>Likes</h1>
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
          <button>Enter</button>
        </form>
      </div>

      <button
        onClick={() => {
          filterByCountry("All");
        }}
        className="px-4 py-2 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        All
      </button>
      {uniqueDogProf.map((current) => {
        // Better way to solve key id issue? Is using a index a better solution?
        return (
          <div key={Math.random()}>
            <button
              onClick={() => {
                filterByCountry(current);
              }}
              className="px-4 py-2 m-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              {current}
            </button>
          </div>
        );
      })}
      {likedDogs.map((current) => {
        return (
          <div key={current.info.results[0].id.value}>
            <DogProfile dogProf={current} />
          </div>
        );
      })}
    </div>
  );
};

export default Likes;
