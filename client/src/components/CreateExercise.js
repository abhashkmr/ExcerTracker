import React, {useState,useEffect} from "react";
import {useHistory} from "react-router-dom";
import DatePicker from 'react-datepicker';
import axios from 'axios';

const CreateExercise=()=>{
  const [username, setUsername] = useState("Abhash");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date,setDate]=useState(new Date());
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();


    
  function CharacterDropDown() {
    const [loading, setLoading] = React.useState(true);
    const [items, setItems] = React.useState([
      { label: "Loading ...", value: "" }
    ]);
    React.useEffect(() => {
      async function getCharacters() {
        const response = await fetch("http://localhost:5000/users/");
        const body = await response.json();
        setItems(body.results.map(({ name }) => ({ label: name, value: name })));
        setLoading(false);
      }
      getCharacters();
    }, []);
    return (
      <select disabled={loading}>
        {items.map(item => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
      </select>
    );
  }


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const exercise = { username,description,duration,date };
        console.log(exercise);
        axios.post('http://localhost:5000/exercises/add', exercise)
        .then(res => console.log(res.data));
        history.push("/");
    
        // fetch("https://my-json-server.typicode.com/abhashkmr/blog-project-db/blogs/", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(exercise),
        // }).then(() => {
        //   console.log("new exercise added");
        //   history.push("/");
        // });
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
                  value={username}
                  onChange={(e) => {
                      setUsername(e.target.value);}
                    }>
                  {/* {
                    this.state.users.map(function(user) {
                      return <option 
                        key={user}
                        value={user}>{user}
                        </option>;
                    })
                  } */ }
              </select>
            </div>
            <div className="form-group"> 
              <label>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);}
                  }
                  />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);}
                  }
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={date}
                  onChange={(e) => {
                    setDate(date);}
                  }
                />
              </div>
            </div>
    
            <div className="form-group">
              <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
        );
}

export default CreateExercise;