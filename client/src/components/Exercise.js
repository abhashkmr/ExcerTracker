import axios from "axios"
import {useHistory} from 'react-router';

const Exercise = ({props}) => {
    const history=useHistory();

    const handleDelete = async(id)=>{
        const result = await axios.delete(`http://localhost:5000/exercises/${id}`);
        if(result)
        {
            window.alert("Deleted!!!")
            history.push("/")

        }
        
    }

    return (
        <div>
        {props.username}
        <button onClick = {()=>handleDelete(props._id)}>Delete </button>
        <br/>
        </div>
      );
}
 
export default Exercise;