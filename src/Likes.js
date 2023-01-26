const Likes = ({ likedDogs, setLikedDogs }) => {
  return (
    <div>
      <h1>Likes</h1>
      {likedDogs.map((current) => {
        return (
          <div key={current.info.results[0].id.value}>
            <img src={current.image} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default Likes;
