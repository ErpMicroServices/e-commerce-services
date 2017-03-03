import schema from 'validate';
import {isEmail} from 'validator';

const user_login = schema({
  user_id:{
    type: 'string',
    required: true,
    use: isEmail,
    message: 'User login id is required, and must be a valid email address'
  },
  password:{
    type:'string',
    required: true,
    message: 'Password is required'
  }
});

export default user_login;
