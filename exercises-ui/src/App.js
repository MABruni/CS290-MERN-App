import './App.css';
import React from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react'

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header>
        <h1>Exercises database</h1>
        <p>Here you can record all the exercises you do and keep track of your progress.</p>
      </header>
      <Router>
        <div className="App-header">
          <div className='Nav-items'>
            <nav> 
              <Link className='Home-nav' to='/'>Home</Link>
            </nav>
            <nav> 
              <Link className='Create-nav' to='/add-exercise'>Create Exercise</Link>
            </nav>
          </div>
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}/>
            <Route path="/add-exercise" element={<CreateExercisePage />}/>
            <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}/>
          </Routes>
        </div>
      </Router>
      <footer>
        <p>© 2023 Miguel Angel Bruni Montero</p>
      </footer>
    </div>
  );
}

export default App;