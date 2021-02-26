const User = require('../models/user');

module.exports = {
  findOrCreate: async (oAuthData) => {
    try {
      const user = await User.findOne({ oAuthId: oAuthData.id });
      if (!user) {
        const newUser = new User({
          oAuthId: oAuthData.id, 
          username: oAuthData.username,
          displayName: oAuthData.displayName || '',
          profileUrl: oAuthData.profileUrl,
          photos: oAuthData.photos
        });
        await newUser.save();
        return newUser;
      }
      return user;
    } catch (e) {
      return Error('User not found');
    }
  },
  findById: async (id) => {
    return User.findOne({ oAuthId: id });
  },
  deleteUser: (req, res, next) => {
    User.findOneAndDelete({ oAuthId: req.user.id })
      .then((data) => {
        if (!data) res.status(203).send('no user found')
        return next();
      })
      .catch((err) => next(err))
  }
};