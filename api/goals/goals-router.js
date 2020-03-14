const express = require('express');
const Goals = require('./goals-model');
const wsAcces = require('../../auth/wsAccess');
const router = express.Router();

//Create new Goal
router.post('/', wsAcces(['admin', 'contrib']), (req, res) => {
    const data = req.body;

    Goals.add(data)
        .then(goal =>
            res.status(201).json({
                message: 'New Goal created',
                goal
            })
        )
        .catch(err => res.status(500).json({ message: err.message }));
});

//Get Goals on WS
router.get('/:id', wsAcces(['admin', 'contrib', 'viewer']), (req, res) => {
    const id = req.params.id;

    Goals.findByWorkspace(id)
        .then(goals => res.status(200).json(goals))
        .catch(err => res.status(500).json({ message: err.message }));
});

//Update Goal

//Delete Goal

module.exports = router;