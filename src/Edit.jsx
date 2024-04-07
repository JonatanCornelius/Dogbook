import React, { useState, useEffect, useContext } from "react";
import { DogContext } from "./Provider";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Start.css";

const Edit = () => {
  const { fetchDogById, fetchAllDogs } = useContext(DogContext);
  const [dog, setDog] = useState({});
  const [dogs, setDogs] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [temperament, setTemperament] = useState("");
  const [breed, setBreed] = useState("");
  const [preference, setPreference] = useState("");
  const [nickname, setNickname] = useState("");
  const [presence, setPresence] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDog = await fetchDogById(id);
        setDog(fetchedDog);
        setName(fetchedDog.name);
        setGender(fetchedDog.gender);
        setAge(fetchedDog.age);
        setTemperament(fetchedDog.temperament);
        setBreed(fetchedDog.breed);
        setPreference(fetchedDog.preference);
        setNickname(fetchedDog.nickname);
        setPresence(fetchedDog.presence);
        setSelectedFriends(fetchedDog.friends.map((friend) => friend._id));
      } catch (error) {
        console.error("Error fetching dog profile:", error);
      }
    };
    fetchData();
  }, [id, fetchDogById]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dogsData = await fetchAllDogs();
        setDogs(dogsData);
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };
    fetchData();
  }, [fetchAllDogs]);

  const handleCheckBoxChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedFriends([...selectedFriends, value]);
    } else {
      setSelectedFriends(
        selectedFriends.filter((friendId) => friendId !== value)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredSelectedFriends = selectedFriends.filter(
      (friendId) => friendId !== id
    );
    try {
      const response = await axios.put(
        `http://localhost:3000/dogs/edit/${id}`,
        {
          name,
          age,
          breed,
          gender,
          temperament,
          preference,
          nickname,
          presence,
          friends: filteredSelectedFriends,
        }
      );
      if (response.status === 200) {
        alert("Changes saved successfully!");
        navigate(`/profile/${id}`);
      } else {
        console.error("Failed to edit profile");
      }
    } catch (error) {
      console.error("Error saving dog profile:", error);
    }
  };

  return (
    <div className="start-container">
      <button onClick={() => navigate("/")} className="create-dog-btn">
        Back to Start
      </button>
      <h1>EDIT PAGE</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-row">
          <label htmlFor="name">Change name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="age">Change age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>
            Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
        <div className="form-row">
          <label htmlFor="temperament">Change temperament:</label>
          <input
            type="text"
            id="temperament"
            value={temperament}
            onChange={(e) => setTemperament(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="breed">Change breed:</label>
          <input
            type="text"
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="preference">Change preference:</label>
          <input
            type="text"
            id="preference"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="nickname">Change nickname:</label>{" "}
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="presence">Is present?:</label>{" "}
          <input
            type="checkbox"
            id="presence"
            checked={presence}
            onChange={(e) => setPresence(e.target.checked)}
          />
        </div>
        <div className="form-row">
          <fieldset>
            <legend>Select Friends:</legend>
            {dogs
              .filter((dog) => dog._id !== id)
              .map((dog) => (
                <div key={dog._id}>
                  <input
                    type="checkbox"
                    id={dog._id}
                    value={dog._id}
                    checked={selectedFriends.includes(dog._id)}
                    onChange={handleCheckBoxChange}
                  />
                  <label htmlFor={dog._id}>{dog.name}</label>
                </div>
              ))}
          </fieldset>
        </div>
        <div className="form-row">
          <button type="submit" className="create-dog-btn">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
