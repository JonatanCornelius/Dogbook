import React, { createContext } from "react";
import axios from "axios";

const DogContext = createContext();

const DogProvider = ({ children }) => {
  async function fetchAllDogs() {
    try {
      const response = await axios.get("http://localhost:3000/dogs");
      return response.data;
    } catch (error) {
      console.error("Error fetching dogs:", error);
      return null;
    }
  }

  const fetchDogImage = async () => {
    try {
      const response = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );
      return response.data.message;
    } catch (error) {
      console.error("Error fetching dog image:", error);
      return "";
    }
  };

  const fetchDogById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/dogs/${id}`);
      const dog = response.data;
      return dog;
    } catch (error) {
      console.error("Error fetching dog by id: ", error);
      return null;
    }
  };

  async function removeDog(idToRemove, setDogs) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/dogs/${idToRemove}`
      );
      if (response.status === 200) {
        alert("Dog removed successfully!");
      } else {
        alert("Failed to remove dog.");
      }
    } catch (error) {
      console.error("Error removing dog:", error);
      alert("Failed to remove dog.");
    }
  }

  async function addDogProfile(newDogData) {
    try {
      const response = await axios.post(
        "http://localhost:3000/dogs/addDogProfile",
        newDogData
      );
      if (response.status === 201) {
        alert("Dog profile added successfully!");
      } else {
        alert("Failed to add dog profile.");
      }
    } catch (error) {
      console.error("Error adding dog profile:", error);
      alert("Failed to add dog profile.");
    }
  }

  return (
    <DogContext.Provider
      value={{
        fetchAllDogs,
        fetchDogById,
        fetchDogImage,
        removeDog,
        addDogProfile,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};

export { DogContext, DogProvider };
