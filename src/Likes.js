import DogProfile from "./DogProfile";

const Likes = ({
  likedDogs,
  setLikedDogs,
  constLikedDogs,
  setConstLikedDogs,
}) => {
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
  return (
    <div>
      <h1>Likes</h1>
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
