import React from 'react';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';

function Exercise ({ exercise, deleteExercise, editExercise }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><MdOutlineEdit onClick={() => editExercise(exercise)} /></td>
            <td><MdDeleteOutline onClick={() => deleteExercise(exercise._id)} /></td>
        </tr>
    );
}

export default Exercise;