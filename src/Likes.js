import DogProfile from "./DogProfile";
import { useEffect, useState, useRef } from "react";

const Likes = ({ likedDogs, setLikedDogs, constLikedDogs }) => {
  const [inputValue, setInputValue] = useState("");
  const [filters, setFilters] = useState([]);
  const initialRender = useRef(true);
  const secondRender = useRef(true);
  let numRows = ""; // Change the className to adjust the grid depending on how many profiles there are. 3 or less profiles liked will only have 3 rows.

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
      // } else if (secondRender.current) {
      //   secondRender.current = false;
    } else {
      constFilterProfiles(filters);
    }
  }, [filters]);

  likedDogs.length <= 3
    ? (numRows = "grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1")
    : (numRows =
        "grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 2xl:grid-cols-4");

  return (
    <div className="flex flex-col mx-20">
      <div>
        <h1 className="mb-3 text-6xl font-bold text-gray-600">Your Likes</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="text-xl ">Search by Profile Trait:</label>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div className="flex justify-center my-3">
            <button
              type="submit"
              className="px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Apply Filter
            </button>
            <button
              type="reset"
              onClick={() => {
                setFilters([]);
              }}
              className="px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        </form>
      </div>

      <div className={numRows}>
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
