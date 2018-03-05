const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

function getRequiredPropMsg (prop) {
  return `${prop} is required!`
}

let userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: getRequiredPropMsg('Username'),
    unique: true
  },
  hashedPass: {
    type: mongoose.Schema.Types.String,
    required: getRequiredPropMsg('Password')
  },
  salt: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  firstName: {
    type: mongoose.Schema.Types.String,
    required: getRequiredPropMsg('First Name')
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: getRequiredPropMsg('Last Name')
  },
  age: {
    type: mongoose.Schema.Types.Number,
    min: [0, 'Age must be between 0 and 120'],
    max: [120, 'Age must be between 0 and 120']
  },
  roles: [{ type: mongoose.Schema.Types.String }],
  votes: { type: mongoose.Schema.Types.Number, default: 0 }
})

userSchema.method({
  authenticate: (password) => {
    let newHashedPass = encryption.generateHashedPassword(this.salt, password)

    if (newHashedPass === this.hashedPass) {
      console.log(newHashedPass)
      return true
    }

    console.log('Invalid password!')
    return false
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User

module.exports.seedAdminUser = () => {
  User.find({username: 'Admin'}).then(users => {
    if (users.length > 0) {
      return
    }

    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, 'T3stAdm!nPass')

    User.create({
      username: 'Admin',
      hashedPass: hashedPass,
      salt: salt,
      firstName: 'Admin',
      lastName: 'Adminov',
      age: 19,
      roles: ['Admin']
    }).then(admin => {
      console.log(`Admin: ${admin.username} seeded successfully`)
    })
  })
}
