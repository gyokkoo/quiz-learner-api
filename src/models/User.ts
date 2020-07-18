import { Schema, model } from 'mongoose';
import { generateHashedPassword, generateSalt } from '../utilities/encryption';

function getRequiredPropMsg(prop: string): string {
  return `${prop} is required!`;
}

const userSchema: Schema = new Schema({
  username: {
    type: Schema.Types.String,
    required: getRequiredPropMsg('Username'),
    unique: true,
  },
  hashedPass: {
    type: Schema.Types.String,
    required: getRequiredPropMsg('Password'),
  },
  salt: {
    type: Schema.Types.String,
    required: true,
  },
  firstName: {
    type: Schema.Types.String,
    required: getRequiredPropMsg('First Name'),
  },
  lastName: {
    type: Schema.Types.String,
    required: getRequiredPropMsg('Last Name'),
  },
  roles: [
    {
      type: Schema.Types.String,
    },
  ],
  rating: {
    type: Schema.Types.Number,
    default: 0,
    min: 0,
    max: 10,
  },
  solvedQuizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SolvedQuiz',
    },
  ],
  addedQuizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
    },
  ],
  dateRegistered: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});

userSchema.method({
  authenticate: function (password: string) {
    const newPass = generateHashedPassword(this.salt, password);

    if (newPass === this.hashedPass) {
      return true;
    }

    console.log('Invalid password!');
    return false;
  },
});

export const User = model('User', userSchema);

export function seedAdminUser() {
  User.find({ username: 'Admin' }).then((users) => {
    if (users.length > 0) {
      return;
    }

    const salt = generateSalt();
    const hashedPass = generateHashedPassword(salt, 'T3stAdm!nPass');

    User.create({
      username: 'Admin',
      hashedPass: hashedPass,
      salt: salt,
      firstName: 'Admin',
      lastName: 'Adminov',
      age: 19,
      roles: ['Admin'],
    }).then((admin) => {
      console.log(`Admin user seeded successfully`);
    });
  });
}
