import DogProfile from "./DogProfile";

const Likes = ({ likedDogs, setLikedDogs }) => {
  return (
    <div>
      <h1>Likes</h1>
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
