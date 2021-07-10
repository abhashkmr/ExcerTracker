import axios from "axios";
import { useState, useEffect } from "react";
import Exercise from "./Exercise"

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/exercises/");

      setExercises(result.data);
      console.log(result.data);
    };

    fetchData();
  },[]);

 

  return (
    <div>
      { exercises && exercises.map(item=>{
        return <Exercise props = {item} key = {item._id} />
      })}

      {/* <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table> */}
    </div>
  );
};

export default ExercisesList;
