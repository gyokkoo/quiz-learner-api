const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

function getRequiredPropMsg(prop) {
  return `${prop} is required!`;
}

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: getRequiredPropMsg('Username'),
    unique: true,
  },
  hashedPass: {
    type: mongoose.Schema.Types.String,
    required: getRequiredPropMsg('Password'),
  },
  salt: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  firstName: {
    type: mongoose.Schema.Types.String,
    required: getRequiredPropMsg('First Name'),
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: getRequiredPropMsg('Last Name'),
  },
  roles: [{
    type: mongoose.Schema.Types.String,
  }],
  rating: {
    type: mongoose.Schema.Types.Number,
    default: 0,
    min: 0,
    max: 10,
  },
  solvedQuizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SolvedQuiz',
  }],
  addedQuizzes: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Quiz',
  }],
  dateRegistered: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
});

userSchema.method({
  authenticate: function(password) {
    const newPass = encryption.generateHashedPassword(this.salt, password);

    if (newPass === this.hashedPass) {
      return true;
    }

    console.log('Invalid password!');
    return false;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.seedAdminUser = () => {
  User.find({ username: 'Admin' }).then((users) => {
    if (users.length > 0) {
      return;
    }

    const salt = encryption.generateSalt();
    const hashedPass = encryption.generateHashedPassword(salt, 'T3stAdm!nPass');

    User.create({
      username: 'Admin',
      hashedPass: hashedPass,
      salt: salt,
      firstName: 'Admin',
      lastName: 'Adminov',
      age: 19,
      roles: ['Admin'],
    }).then((admin) => {
      console.log(`Admin: ${admin.username} seeded successfully`);
    });
  });
};
