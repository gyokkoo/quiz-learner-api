const passport = require('passport');
const localSignupStrategy = require('../utilities/local-signup');
const localLoginStrategy = require('../utilities/local-login');

module.exports = () => {
  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login', localLoginStrategy);
};
