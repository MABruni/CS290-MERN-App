import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useNavigate();

    const createExercise = async () => {
      const newExercise = {name, reps, weight, unit, date};
      const response = await fetch('/exercises', {
        method: 'POST',
        body: JSON.stringify(newExercise),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if(response.status === 201) {
        alert('Exercise succesfully created')
      } else {
        alert('Exercise could not be created')
        console.log(response.status)
      }
      history('/')
    };

    return (
        <div>
            <h1>Create Exercise</h1>
            <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter repetitions"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Enter weight used"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select
                value={unit}
                onChange={e => setUnit(e.target.value)}>
                  <option value=''>Choose a unit</option>
                  <option value='kgs'>Kilograms</option>
                  <option value='lbs'>Pounds</option>
            </select>
            <input
                type="text"
                placeholder="Enter date (MM-DD-YY))"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={createExercise}
            >Add</button>
        </div>
    );
}

export default CreateExercisePage;