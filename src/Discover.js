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
  constLikedDogs,
  setConstLikedDogs,
}) => {
  return (
    <div className="mx-20">
      <h1 className="mb-3 text-6xl font-bold text-gray-600">Discover</h1>
      <div className="flex justify-center mt-28">
        <DogProfile dogProf={dogInfo[dogProfileCount]} />
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => {
            setDogProfileCount((current) => {
              return current + 1;
            });
          }}
        >
          <ImCancelCircle className="w-12 h-12 m-6" />
        </button>
        <button
          onClick={() => {
            setDogProfileCount((current) => {
              return current + 1;
            });
            setConstLikedDogs([...likedDogs, dogInfo[dogProfileCount]]);
            setLikedDogs([...likedDogs, dogInfo[dogProfileCount]]);
          }}
        >
          <FcLike className="m-6 w-14 h-14" />
        </button>
      </div>
    </div>
  );
};

export default Discover;
