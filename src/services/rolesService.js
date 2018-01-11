import authService from './authService'

function loadUserRoles (_self) {
  let currentUser = authService.getUser()
  let aux = []

  for (var i = 0; i < currentUser.groups.length; i++) {
    var group = currentUser.groups[i]
    for (var j = 0; j < group.roles.length; j++) {
      aux[group.roles[j].name] = (group.roles[j].name)
    }
  }

  _self.roles = aux
  if (!_self.roles['manager.read']) {
    _self.$router.replace('/forbbiden')
  }
}

export default {
  loadUserRoles: loadUserRoles
}
