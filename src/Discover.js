import { useEffect } from "react";
const Discover = ({ dogProfileCount, dogInfo, setDogProfileCount }) => {
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
        "Like"
      </button>
    </div>
  );
};

export default Discover;
