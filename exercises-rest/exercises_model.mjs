import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true},
}, {collection:'exercises'});

/**
 * Compile the model from the schema.
 */
const Exercise = mongoose.model('Exercise', exerciseSchema);

/**
 * Creates an exercise in the database with the given parameters.
 * @param {String} name name of the exercise
 * @param {Number} reps number of repetitions
 * @param {Number} weight weight used
 * @param {String} unit units the weight is in
 * @param {String} date date the exercise was done
 * @returns a promise that resolves into the new exercise object.
 */
const createExercise = async (name, reps, weight, unit, date) => {
  const newExercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
  return newExercise.save();
};  

/**
* Checks the format and validity of the date field.
* @param {string} date
* @returns True if the date format is MM-DD-YY where MM, DD and YY 
* are 2 digit integers and that the date is a valid one. 
*/
function isDateValid(date) {
  // Checks that the format is correct,
  const format = /^\d\d-\d\d-\d\d$/;

  // Checks that the date is a valid one, taking into account days
  // in a month and leap years. Because we use two integers for the
  // year, we assume 00 to 23 to be in the 2000's and all other ones
  // to be in the 1900's.
  let dateMonth = date.split("-")[0];
  let dateDay = date.split("-")[1];
  let dateYear = date.split("-")[2];
  if(dateYear >= '00' && dateYear <= '23') {
    dateYear = '20' + dateYear
  } else {
    dateYear = '19' + dateYear
  }
  const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
  if ((dateYear % 4 === 0 && dateYear % 100 !== 0) || (dateYear % 400 === 0)) {
    daysInMonth[1] = 29
  };
  if(dateDay > daysInMonth[dateMonth - 1]) {
    return false
  };
  if(dateMonth > 12) {
    return false
  }
  return format.test(date);
}

/**
 * Finds an exercise in the database by its unique id
 * @param {String} _id unique id of the exercise
 * @returns a promise that resolves into the found exercise object
 */
const findExerciseById = async (_id) => {
  const result = Exercise.findById(_id).exec();
  return result;
};

/**
 * Finds exercises that match the filter. If no filter applied
 * returns all exercises in the database.
 * @param {Object} filter filter to apply. 
 * @returns a promise that resolves into an array of exercise 
 * objects that match the filter.
 */
const findExercise = async (filter) => {
  const result = Exercise.find(filter).exec();
  return result;
};

/**
 * Updates an exercise object, found by its unique id, in the 
 * database with the new parameters specified.
 * @param {String} _id unique id for the exercise
 * @param {String} name name of the exercise
 * @param {Number} reps number of repetitions
 * @param {Number} weight weight used
 * @param {String} unit units the weight is in
 * @param {String} date date the exercise was done
 * @returns a promise that resolves into the number of exercises
 * modified.
 */
const updateExercise = async (_id, name, reps, weight, unit, date) => {
  const result = await Exercise.replaceOne({ _id: _id }, {name: name, reps: reps, weight: weight, unit: unit, date: date})
  return result.modifiedCount;
}

/**
 * Deletes an exercise from the database using its unique id.
 * @param {Object} filter unique id of the exercise
 * @returns a promise that resolves into the number of exercises
 * deleted.
 */
const deleteExerciseById = async (filter) => {
  const exercisesRemoved = await Exercise.deleteMany(filter);
  return exercisesRemoved.deletedCount;
}


db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

export { createExercise, findExerciseById, findExercise, updateExercise, deleteExerciseById, isDateValid }