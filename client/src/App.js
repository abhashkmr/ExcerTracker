import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router,Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import CreateExercise from './components/CreateExercise'
import CreateUser from './components/CreateUser'
import EditExercise from './components/EditExercise'
import ExercisesList from './components/ExercisesList'


function App() {
  return (
   <Router>
     <Navbar/>
     
     <Route path="/" exact component={ExercisesList}/>
     <Route path="/create"  component={CreateExercise}/>
     <Route path="/user"  component={CreateUser}/>
     <Router path="/edit/:id" component={EditExercise}/>
   </Router>

  );
}

export default App;
