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
  const [likedDogs, setLikedDogs] = useState([]);
  const [constLikedDogs, setConstLikedDogs] = useState([]); // A copy of the likedDogs state that is needed to return all liked dogs back to the page
  // Seems like a highly inefficent solution?

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
        <div className="flex justify-center text-2xl mt-80">
          <h2>
            View Dog profiles, like and save your favories or dislike if it's
            not your type of breed. Have fun!
          </h2>
        </div>
        <div className="flex justify-center text-lg mt-7">
          <button
            onClick={() => {
              setReadIntro(true);
            }}
            className="p-4 font-bold text-white bg-green-500 rounded-lg hover:bg-green-700"
          >
            Let's see some Dogs!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="flex justify-center my-5 mb-4 font-bold text-red-500 underline text-7xl bg-red-50">
        Welcome to Dog Hinge!
      </h1>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setDiscoverPage(!discoverPage);
            setLikedDogs(constLikedDogs); // Undos any search filters on the likes page. When user goes back to likes page, all likes are shown
          }}
          className="px-4 py-2 my-10 font-bold text-white transform rounded bg-rose-600 hover:scale-110 motion-reduce:transform-none"
        >
          {discoverPage ? <p>See your Likes</p> : <p>Discover Dogs</p>}
        </button>
      </div>
      {readIntro && discoverPage ? (
        <Discover
          dogProfileCount={dogProfileCount}
          setDogProfileCount={setDogProfileCount}
          dogInfo={dogInfo}
          setLikedDogs={setLikedDogs}
          likedDogs={likedDogs}
          constLikedDogs={constLikedDogs}
          setConstLikedDogs={setConstLikedDogs}
        />
      ) : (
        <Likes
          likedDogs={likedDogs}
          setLikedDogs={setLikedDogs}
          constLikedDogs={constLikedDogs}
          setConstLikedDogs={setConstLikedDogs}
        />
      )}
    </div>
  );
}

export default App;
