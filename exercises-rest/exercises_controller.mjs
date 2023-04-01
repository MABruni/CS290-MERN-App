import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, repetitions, weight, 
 * units and date provided in the request body.
 */
app.post('/exercises', (req, res) => {
  if(typeof req.body.name !== 'string' || !req.body.name || typeof req.body.reps !== 'number' || req.body.reps <= 0 
    || typeof req.body.weight !== 'number' || req.body.weight <= 0 || (req.body.unit !== 'lbs' &&  req.body.unit !== 'kgs')
    || !exercises.isDateValid(req.body.date)) {
      res.status(400).set('Content-Type', 'application/json').json({ Error: 'Invalid request' });
  } else {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
      .then(exercise => {
        res.status(201).set('Content-Type', 'application/json').json(exercise);
      })
      .catch(error => {
        res.status(400).json({ Error: 'Request failed' });
    })
  }
});

/**
 * Retrieve the exercise with the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
  const exerciseId = req.params._id;
  exercises.findExerciseById(exerciseId)
    .then(exercise => { 
      if (exercise !== null) {
        res.status(200).set('Content-Type', 'application/json').json(exercise);
      } else {
        res.status(404).set('Content-Type', 'application/json').json({ Error: 'Not found' });
      }         
      })
    .catch(error => {
        res.status(400).json({ Error: 'Request failed' });
    });
});

/**
 * Retrieve all exercises in the database.
 */
app.get('/exercises', (req, res) => {
  exercises.findExercise({})
    .then(exercise => { 
      if (exercise) {
        res.status(200).json(exercise);
      }         
      })
    .catch(error => {
        res.status(400).json({ Error: 'Request failed' });
      });
});

/**
 * Update the exercise whose id is provided in the path parameter 
 * and set its name, repetitions, weight, units and date to the 
 * values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
  if(typeof req.body.name !== 'string' || !req.body.name || typeof req.body.reps !== 'number' || req.body.reps <= 0 
  || typeof req.body.weight !== 'number' || req.body.weight <= 0 || (req.body.unit !== 'lbs' &&  req.body.unit !== 'kgs')
  || !exercises.isDateValid(req.body.date)) {
    res.status(400).set('Content-Type', 'application/json').json({ Error: 'Invalid request' });
  } else {
    exercises.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(numUpdated => {
        if (numUpdated === 1) {
            res.status(200).set('Content-Type', 'application/json').json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
        } else {
            res.status(404).set('Content-Type', 'application/json').json({ Error: 'Not found' });
        }
    })
    .catch(error => {
        res.status(400).json({ Error: 'Request failed' });
    });
  }
});

/**
 * Delete the exercise with the id provided in the query parameters.
 */
app.delete('/exercises/:_id', (req, res) => {
  exercises.deleteExerciseById({ _id: req.params._id })
    .then(deletedCount => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).set('Content-Type', 'application/json').json( { Error: 'Not found' });
      }
    })
    .catch(error => {
      res.send({ error: 'Request failed' });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});