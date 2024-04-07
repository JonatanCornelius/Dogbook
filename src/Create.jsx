import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DogContext } from "./Provider";
import "./Start.css";

const Create = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [temperament, setTemperament] = useState("");
  const [preference, setPreference] = useState("");
  const [nickname, setNickname] = useState("");
  const [presence, setPresence] = useState(false);
  const [breed, setBreed] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [dogs, setDogs] = useState([]);
  const navigate = useNavigate();

  const { addDogProfile, fetchAllDogs } = useContext(DogContext);

  useEffect(() => {
    const getDogs = async () => {
      try {
        const dogsData = await fetchAllDogs();
        setDogs(dogsData);
      } catch (error) {
        console.error("Error fetching dogs", error);
      }
    };
    getDogs();
  }, [fetchAllDogs]);

  const handleCheckBoxChange = (event) => {
    const { checked, value } = event.target;
    if (checked && !selectedFriends.includes(value)) {
      setSelectedFriends((prevSelectedFriends) => [
        ...prevSelectedFriends,
        value,
      ]);
    } else if (!checked && selectedFriends.includes(value)) {
      setSelectedFriends((prevSelectedFriends) =>
        prevSelectedFriends.filter((friendId) => friendId !== value)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDogProfile({
        name,
        age,
        breed,
        gender,
        temperament,
        preference,
        nickname,
        presence,
        friends: selectedFriends,
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding dog profile:", error);
    }
  };

  return (
    <div className="start-container">
      {" "}
      {}
      <button onClick={() => navigate("/")} className="create-dog-btn">
        Back to Start
      </button>{" "}
      {}
      <h1>CREATE PAGE</h1>
      <form onSubmit={handleSubmit}>
        {}
        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="age">Age:</label>
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
          <label htmlFor="temperament">Temperament:</label>
          <input
            type="text"
            id="temperament"
            value={temperament}
            onChange={(e) => setTemperament(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="breed">Breed:</label>
          <input
            type="text"
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="preference">Preference:</label>
          <input
            type="text"
            id="preference"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="nickname">Nickname:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="presence">Presence:</label>
          <input
            type="checkbox"
            id="presence"
            checked={presence}
            onChange={(e) => setPresence(e.target.checked)}
          />
        </div>
        <div className="form-row">
          <fieldset>
            <legend>Select friends:</legend>
            {dogs.map((dog) => (
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
            Add Dog Profile
          </button>{" "}
          {}
        </div>
      </form>
    </div>
  );
};

export default Create;
