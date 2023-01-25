import { useState, useEffect } from "react";
import Discover from "./Discover";
import Likes from "./Likes";
import "./App.css";

const DogPhotosURL = "https://dog.ceo/api/breeds/image/random"; // Dog Photos API

const DogFactsURL = "https://dog-api.kinduff.com/api/facts"; // Dog Facts API

const FakeUserURL = "https://randomuser.me/api/"; // Fake User to get a name for the dog

function App() {
  const [dogInfo, setDogInfo] = useState([]);
  const [discoverPage, setDiscoverPage] = useState(true);
  const [numDogProfiles, setNumDogProfiles] = useState(1);

  const getDogData = async () => {
    const imageResponse = await fetch(DogPhotosURL);
    const imageData = await imageResponse.json();
    const userResponse = await fetch(FakeUserURL);
    const userData = await userResponse.json();

    let tempArray = [];
    tempArray["image"] = imageData.message;
    tempArray["info"] = userData;
    setDogInfo([...dogInfo, tempArray]);
  };
  useEffect(() => {
    getDogData();
  }, [numDogProfiles]);
  return (
    <div>
      <h1 className="text-3xl font-bold text-red-500 underline">
        Welcome to Dog Hinge!
      </h1>
      {console.log(dogInfo)}
      <button
        onClick={() => {
          setDiscoverPage(!discoverPage);
        }}
      >
        {discoverPage ? <p>See your Likes</p> : <p>Discover</p>}
      </button>
      {discoverPage ? (
        <Discover
          numDogProfiles={numDogProfiles}
          setNumDogProfiles={setNumDogProfiles}
          dogInfo={dogInfo}
        />
      ) : (
        <Likes />
      )}
    </div>
  );
}

export default App;
