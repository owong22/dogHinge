import { useState, useEffect } from "react";
import Discover from "./Discover";
import Likes from "./Likes";
import Loading from "./Loading";
import "./App.css";

const DogPhotosURL = "https://dog.ceo/api/breeds/image/random"; // Dog Photos API

const DogFactsURL = "https://dog-api.kinduff.com/api/facts"; // Dog Facts API

const FakeUserURL = "https://randomuser.me/api/"; // Fake User to get a name for the dog

function App() {
  const [dogInfo, setDogInfo] = useState([]);
  const [discoverPage, setDiscoverPage] = useState(true);
  const [dogProfileCount, setDogProfileCount] = useState(0);
  const [readIntro, setReadIntro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getDogData = async () => {
    setIsLoading(true);
    const imageResponse = await fetch(DogPhotosURL);
    const imageData = await imageResponse.json();
    const userResponse = await fetch(FakeUserURL);
    const userData = await userResponse.json();

    let tempArray = [];
    tempArray["image"] = imageData.message;
    tempArray["info"] = userData;
    setDogInfo([...dogInfo, tempArray]);
    setIsLoading(false);
  };
  useEffect(() => {
    getDogData();
  }, [dogProfileCount, readIntro]);

  if (isLoading) {
    return <Loading />;
  }

  if (!readIntro) {
    return (
      <div>
        <h2>
          View Dog profiles, like and save your favories or dislike if it's not
          your type of breed. Have fun!
        </h2>
        <button
          onClick={() => {
            setReadIntro(true);
          }}
        >
          Let's see some Dogs!
        </button>
      </div>
    );
  }

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
      {readIntro && discoverPage ? (
        <Discover
          dogProfileCount={dogProfileCount}
          setDogProfileCount={setDogProfileCount}
          dogInfo={dogInfo}
        />
      ) : (
        <Likes />
      )}
    </div>
  );
}

export default App;
