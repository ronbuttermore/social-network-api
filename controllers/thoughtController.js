const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err)
      }
    },
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ thoughtId: req.params.thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id}},
            { new: true }
        );
        
        if (!user) {
            return res
              .status(404)
              .json({ message: 'Thought created, but found no user with that ID' });
          }
    
          res.json('Created the thought 🎉');
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
      async updateThought(req, res) {
        try {
           const update = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
           ) 
        
      if (!update) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(update);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
    async deleteThought(req, res) {
        try {
            const removeThought = await Thought.findOneAndRemove({ _id: req.params.thoughtId});
            if (!removeThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const newReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true},
            );
            res.json(newReaction);
        
            if (!newReaction) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(newReaction);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            const rmReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $pull: {reactions: req.params.reactionId } },
                { new: true },
            );

            if (!rmReaction) {
                return res.status(404).json({ message: 'No thought with this id!' });
              }
        
              res.json(rmReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
        