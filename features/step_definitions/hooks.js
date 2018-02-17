// features/step_definitions/hooks.js
import {After, Before} from 'cucumber'

Before(function (result, callback) {
  this.result = {
    data: null,
    error: null
  }
  this.user = {
    user_id: '',
    password: ''
  }
  this.db.none('delete from user_login')
  .then((data) => callback())
  .catch((error) => callback(error))
})

After(function () {
})

