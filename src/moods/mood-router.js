const express = require('express')
const MoodsService = require('./moods-service.js')
const { requireAuth } = require('../middleware/jwt-auth')

const moodRouter = express.Router()
const jsonBodyParser = express.json()

moodRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        // console.log(req.user.id)
        MoodsService.getAllMoods(req.app.get('db'), Number(req.user.id))
        .then(moods => {
            res.json(MoodsService.serializeMoods(moods))
        })
        .catch(next)
    })

moodRouter
    .route('/')
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const { current_mood, note } = req.body

        const newMood = { current_mood, note }

        for (const [key, value] of Object.entries(newMood))
        if (value == null)
          return res.status(400).json({
            error: `Missing '${key}' in request body`
          })

        console.log(req.user)

        newMood.user_id = req.user.id

        MoodsService.insertMood(
            req.app.get('db'),
            newMood
        )
        .then(mood => {
            res.status(201)
            .json(MoodsService.serializeMood(mood))
        })
        .catch(next)
    })

module.exports = moodRouter

// moodRouter
//     .route('/')