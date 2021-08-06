const express = require('express')
const router = express.Router()
const Workout = require('../models/Workout')

router.post('/api/workouts/', (req, res) => {
    Workout.create({})
    .then((workoutDB)=> {
        res.json(workoutDB)
    }).catch((err) => {
        res.json(err)
    })
});

router.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, {
        $push:{exercises:req.body}},{new:true, runValidators:true}
    ).then ((workoutDB) => {
        res.json(workoutDB)
    }).catch((err) => {
        res.json(err)
    })
});

router.get('/api/workouts/', (req, res) => {
    Workout.aggregate([{
        $addFields:{
            totalDuration:{
                $sum:'$exercises.duration'
            }
        }
    }]).then ((workoutDB) => {
        res.json(workoutDB)
    }).catch((err) => {
        res.json(err)
    })
});

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([{
        $addFields:{
            totalDuration:{
                $sum:'$exercises.duration'
            }
        }
    }]).then ((workoutDB) => {
        res.json(workoutDB)
    }).catch((err) => {
        res.json(err)
    })
});

// router.delete('/api/workouts/', (req, res) =>{
//     Workout.findByIdAndDelete({req.body.id})
// })

module.exports = router