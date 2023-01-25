const Discover = ({ numDogProfiles, dogInfo, setNumDogProfiles }) => {
  return (
    <div>
      <h1>Discover</h1>
      <button
        onClick={() => {
          setNumDogProfiles((current) => {
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
