const router = require('express').Router();
const { createThought, getThoughts, getSingleThought, updateThought, deleteThought, createReaction, removeReaction } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).post(updateThought).delete(deleteThought);

router.route('/:thoughtId/reaction').post(createReaction);

router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

module.exports = router;
