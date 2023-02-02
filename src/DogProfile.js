const DogProfile = ({ dogProf }) => {
  return (
    <div className="mx-2 my-3 rounded-md shadow-lg w-96 bg-slate-300">
      <div>
        <img
          src={dogProf.image}
          alt="Cute Dog"
          className="object-fit w-96 h-80"
        />
      </div>
      <div className="flex flex-col text-2xl">
        <div className="flex flex-row justify-between mx-5 my-2">
          <div>
            <p>{dogProf.info.results[0].name.first}</p>
          </div>
          <div>
            <p>{dogProf.info.results[0].gender}</p>
          </div>
        </div>
        <div className="flex flex-row justify-between mx-5 mb-2">
          <div>
            <p>{Math.floor(dogProf.info.results[0].dob.age / 7)} years</p>
          </div>
          <div>
            <p>{dogProf.info.results[0].location.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogProfile;
