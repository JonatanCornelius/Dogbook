import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DogContext } from "./Provider";

const Profile = () => {
  const [dogImage, setDogImage] = useState("");
  const [dog, setDog] = useState(null);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchAllDogs, fetchDogById, fetchDogImage } = useContext(DogContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dogData = await fetchDogImage(); // Fetch dog image
        setDogImage(dogData); // Set dog image URL
      } catch (error) {
        console.error("Error fetching dog image:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dogs = await fetchAllDogs();
        const dog = await fetchDogById(id);
        const friendIds = dog.friends.map((friend) => friend._id); // Hämta ID:n för vänner
        const dogFriends = dogs.filter((dog) => friendIds.includes(dog._id)); // Filtrera vänner från alla hundar
        setFriends(dogFriends);
        setDog(dog);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, fetchAllDogs, fetchDogById]);

  return (
    <div>
      <button onClick={() => navigate("/")}>Go to Start</button>
      {/* Edit button, navigate to edit page with dog id */}
      <button onClick={() => navigate(`/edit/${dog._id}`)}>Edit Dog</button>
      {/* Display dog information */}
      <h1>{dog ? `${dog.name}'s Profile!` : "Loading..."}</h1>
      {dog && (
        <>
          {/* Display dog image if available */}
          {dogImage && <img className="dog-image" src={dogImage} alt="Dog" />}
          <div>
            <p>
              <strong>Name:</strong> {dog.name}
            </p>
            <p>
              <strong>Nickname:</strong> {dog.nickname}
            </p>
            <p>
              <strong>Age:</strong> {dog.age}
            </p>
            <p>
              <strong>Breed:</strong> {dog.breed}
            </p>
            <p>
              <strong>Temperament:</strong> {dog.temperament}
            </p>
            <p>
              <strong>Preferences:</strong> {dog.preference}
            </p>
            <p>{dog.presence ? "Present" : "Not Present"}</p>
            <h2>Friends:</h2>
            <ul>
              {friends.map((friend) => (
                <li key={friend._id}>{friend.name}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
