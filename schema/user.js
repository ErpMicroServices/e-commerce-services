import schema from 'validate';
import {isEmail} from 'validator';

const user_login = schema();
user_login
  .path('user_id')
  .type('string')
  .required("User ID is required")
  .use(isEmail, "User ID must be a valid email");

user_login
  .path('password')
  .type('string')
  .required("Password is required");

export default user_login;
