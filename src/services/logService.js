import axios from 'axios'

var logURL = '/speds/logs'

function success (user, message) {
  var payload = {
    user: {
      username: user.username,
      name: user.name
    },
    operation: message
  }
  axios.post(logURL, payload).then(response => {

  })
}

export default {
  success: success
}
