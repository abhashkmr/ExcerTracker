import axios from 'axios';
import {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const  CreateUser= () => {
    const [isPending,setIsPending]=useState(false);
    const [username,setUsername]=useState("");
    const history =useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const user={username:username};
        console.log(user);
        
         axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data));

        setIsPending(false);

        };
      


    return (  
        <div>
        <h3>Create New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
          </div>
          <div className="form-group">
            {!isPending &&  <input type="submit" value="Create User" className="btn btn-primary" />}
            {isPending && <input type="submit" value="Adding user" disabled className="btn btn-primary"/>}
          </div>
        </form>
      </div>
    );
}
 
export default CreateUser;
