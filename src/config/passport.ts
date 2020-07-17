import { use } from 'passport';

import localSignupStrategy from '../utilities/local-signup';
import localLoginStrategy from '../utilities/local-login';

export default () => {
  use('local-signup', localSignupStrategy);
  use('local-login', localLoginStrategy);
};
