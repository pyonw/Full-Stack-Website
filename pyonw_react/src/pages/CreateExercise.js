import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Navigation from '../components/navigation';
export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const history = useHistory();
    const addExercise = async () => {
        const newExercise ={name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert('Successfully added the exercise');
        } else{
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push('/');
    };
    

    return (
        <div>
            <Navigation></Navigation>
            <h1>Add Workout</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="text"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="text"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select
                name = "unit" 
                id= "unit" 
                value ={unit} 
                onChange={e =>{ console.log(e.target.value) 
                    setUnit(e.target.value)} }
                type ='select' >
                    <option value ="lbs">lbs</option>
                    <option value ="kgs">kgs</option>
                </select>
            <input
            type="text"
            placeholder="MM-DD-YY"
            value={date}
            onChange={e => setDate(e.target.value)} />

            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;