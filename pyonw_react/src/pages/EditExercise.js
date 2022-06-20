import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Navigation from '../components/navigation';

export const EditExercisePage = ({exerciseToEdit}) => {
console.log(exerciseToEdit)
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();
    const EditExercise = async () => {
        const editedExercise ={name, reps, weight, unit, date};
        const response = await fetch('/exercises/'+ exerciseToEdit._id, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert('Successfully edited the exercise');
        } else{
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        history.push('/');
    };
    

    return (
        <div>
            <Navigation></Navigation>
            <h1>Edit Workout</h1>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="text"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="text"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select
                name = "unit" 
                id= "unit" 
                value ={unit} 
                onChange={e => setUnit(e.target.value)} 
                type ='select' >
                    <option value ="lbs">lbs</option>
                    <option value ="kgs">kgs</option>
                </select>
            <input
            type="text"
            value={date}
            onChange={e => setDate(e.target.value)} />

            <button
                onClick={EditExercise}
            >Save</button>
        </div>
    );
}

export default EditExercisePage;