const DogProfile = ({ dogProf }) => {
  return (
    <div>
      <img src={dogProf.image} alt="" />
      <p>{dogProf.info.results[0].name.first}</p>
      <p>{dogProf.info.results[0].gender}</p>
      <p>{Math.floor(dogProf.info.results[0].dob.age / 7)} years</p>
      <p>{dogProf.info.results[0].location.country}</p>
    </div>
  );
};

export default DogProfile;
