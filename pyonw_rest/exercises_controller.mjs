import 'dotenv/config';
import express from 'express';
import * as exercises from './exercises_model.mjs';
import {check, oneOf, validationResult} from 'express-validator'

const app = express();

const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

app.post('/exercises',oneOf([
    check('name').notEmpty(),
    check('reps').isInt({min:1}),
    check('weight').isInt({min:1}),
    check('unit').isIn(['kgs','lbs']),
    check('date').isDate({ format: 'MM-DD-YY', strictMode: false, delimiters: ['-']})
]) ,(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ Errors: 'Request failed'})
    }

    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(exercise =>{
        res.status(201).json(exercise);
    })
    .catch(error =>{
        console.log('hi')
        console.error(error);
        res.status(400).json({ Error: 'Request failed' });
    });
});

app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExercisebyId(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});

app.get('/exercises', (req, res) =>{
    let filter = {};
    if(req.query._id !== undefined){
        filter._id = {_id: req.query._id};
    }
    exercises.findExercise(filter, '', 0)
    .then(exercise =>{
        res.status(200).json(exercise);
    })
    .catch(error =>{
        console.error(error);
        res.status(404).json({ Error: 'Not found' });
    });
});

app.put('/exercises/:_id',[
    check('name').notEmpty(),
    check('reps').isInt({min:1}),
    check('weight').isInt({min:1}),
    check('unit').isIn(['kgs','lbs']),
    check('date').isDate({ format: 'MM-DD-YY', strictMode: false, delimiters: ['-']})
] , (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ Errors: 'Request failed'})
    }
    const update = {}
    exercises.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(numUpdated => {
        if(numUpdated ===1){
            res.json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
        } else{
            res.status(404).json({ Error: 'Invalid request'});
        }
    })
    .catch(error =>{
        console.error(error);
        res.status(400).json({ Error: 'Not found'});
    });
});

app.delete('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.deleteExercisebyId(exerciseId)
        .then(deleteCount => {
            if (deleteCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Not Found' });
            }
        })
});