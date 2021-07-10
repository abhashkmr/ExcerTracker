import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const CreateExercise = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([])
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/users/");

      setUsers(result.data);
      console.log(result.data);
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const exercise = { username, description, duration, date };

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));
    history.push("/");
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
        
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          >
            {users &&
              users.map((item) => {
                return (
                  <>
                   
                    <option  value={item.username} >
                   
                      {item.username}
                    </option>
                   
                </>
                )
              })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={(e) => {
                setDate(date);
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
