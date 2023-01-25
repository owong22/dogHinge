import { useEffect } from "react";
const Discover = ({
  dogProfileCount,
  dogInfo,
  setDogProfileCount,
  setLikedDogs,
  likedDogs,
}) => {
  return (
    <div>
      <h1>Discover</h1>

      <img src={dogInfo[dogProfileCount].image} alt="" />

      <button
        onClick={() => {
          setDogProfileCount((current) => {
            return current + 1;
          });
        }}
      >
        "Dislike"
      </button>

      <button
        onClick={() => {
          setDogProfileCount((current) => {
            return current + 1;
          });

          setLikedDogs([...likedDogs, dogInfo[dogProfileCount]]);
        }}
      >
        "Like"
      </button>
      {console.log(likedDogs)}
      {likedDogs.map((current) => {
        return (
          <div>
            <img src={current.image} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default Discover;
