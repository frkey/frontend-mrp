function successMessage (_self, message) {
  _self.$toast('<h4 class="label-lg" >' + message + '</h2>', {
    className: ['et-info', 'alert'],
    horizontalPosition: 'center',
    duration: 3000,
    mode: 'queue',
    transition: 'slide-left'
  })
}

function errorMessage (_self, message) {
  _self.$toast('<h4 class="label-lg" >' + message + '</h2>', {
    className: ['et-alert', 'alert'],
    horizontalPosition: 'center',
    duration: 3000,
    mode: 'queue',
    transition: 'slide-left'
  })
}

function verifyFields (_self, successCallback, errorCallback) {
  if (_self.errors.all()) {
    if (_self.errors.errors.length > 0) {
      errorCallback(_self.errors.errors[0].msg)
    }
    successCallback()
  } else {
    successCallback()
  }
}

export default {
  successMessage: successMessage,
  errorMessage: errorMessage,
  verifyFields: verifyFields
}
