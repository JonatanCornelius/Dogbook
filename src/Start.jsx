import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DogContext } from "./Provider";
import "./Start.css";

const Start = () => {
  const [dogs, setDogs] = useState([]);
  const { fetchAllDogs, removeDog } = useContext(DogContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getDogs = async () => {
      try {
        const dogs = await fetchAllDogs();
        setDogs(dogs);
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };
    getDogs();
  }, [fetchAllDogs]);

  const handleRemoveDog = async (id) => {
    if (window.confirm("Are you sure you want to remove this dog?")) {
      await removeDog(id);
      setDogs((prevDogs) => prevDogs.filter((dog) => dog._id !== id)); // Uppdatera hundlistan efter borttagning
      navigate("/");
    }
  };

  return (
    <div className="start-container">
      <button onClick={() => navigate("/create")} className="create-dog-btn">
        Create Dog
      </button>
      <h2>Dogs List</h2>
      <ul className="dogs-list">
        {dogs.map((dog) => (
          <li key={dog._id} className="dog-item" style={{ cursor: "pointer" }}>
            <Link
              to={`/profile/${dog._id}`}
              className={`dog-link ${dog.presence ? "green-text" : "red-text"}`}
            >
              <strong>Name:</strong> {dog.name}
            </Link>
            <button
              onClick={() => handleRemoveDog(dog._id)}
              className="remove-btn"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Start;
