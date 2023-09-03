const { User } = require('../models');

module.exports = {
    async getUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json(err)
      }
    },
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId });
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async createUser(req, res) {
      try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async updateUser(req, res) {
        try {
           const update = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
           ) 
        
      if (!update) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(update);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
    async deleteUser(req, res) {
        try {
            const deleteUser = await User.findOneAndRemove({ _id: req.params.userId});

            if (!deleteUser) {
                return res.status(404).json({ message: 'No user with this id!' });
              }
        
              res.json({ message: 'User successfully deleted!' });
            } catch (err) {
              res.status(500).json(err);
            }
          },
  };
  