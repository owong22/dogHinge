import { useEffect } from "react";
import DogProfile from "./DogProfile";
import { FcLike } from "react-icons/fc";
import { ImCancelCircle } from "react-icons/im";
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
      <div>
        <DogProfile dogProf={dogInfo[dogProfileCount]} />
      </div>

      <button
        onClick={() => {
          setDogProfileCount((current) => {
            return current + 1;
          });
        }}
      >
        <ImCancelCircle />
      </button>

      <button
        onClick={() => {
          setDogProfileCount((current) => {
            return current + 1;
          });

          setLikedDogs([...likedDogs, dogInfo[dogProfileCount]]);
        }}
      >
        <FcLike />
      </button>
    </div>
  );
};

export default Discover;
