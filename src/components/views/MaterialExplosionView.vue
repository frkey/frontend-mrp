<template>
  <div>
    <h1 class="text-center" v-translate>pages.materialExplosion.header</h1>
    <section>
      <div class="col-sm-12">
        <showNecessity :explosionMethodCallback="materialExplosion" :selectButton="false" :removeButton="false"></showNecessity>
      </div>
      <br>
      </section>
  </div>
</template>
<script>
import rolesService from '../../services/rolesService'
import showNecessity from '../data/ShowNecessity'
import necessityItem from '../data/NecessityItem'
import showProducts from '../data/ShowProducts'
import languageService from '../../services/languageService'
import necessityBackend from '../../apis/necessityBackend'
// import authService from '../../services/authService'
// import messageService from '../../services/messageService'
import Datepicker from 'vuejs-datepicker'
import VueNumeric from 'vue-numeric'
import Modal from 'modal-vue'

export default {
  name: 'Repository',
  components: {
    Modal,
    showNecessity,
    showProducts,
    necessityItem,
    VueNumeric,
    Datepicker
  },
  data () {
    return {
      operation: 'material',
      response: undefined,
      error: {},
      roles: undefined
    }
  },
  methods: {
    materialExplosion (necessity) {
      var options = {}

      necessityBackend.materialExplosion(necessity._id, options, (response) => {
        console.log(response)
      }, (error) => {
        console.log(error)
      })
    },
    isErrors (field) {
      var msg = this.errors.first(field)
      if (msg) {
        msg = msg.replace(' ' + field, '')
      }
      return msg
    }
  },
  mounted () {
    var _self = this
    rolesService.loadUserRoles(_self)
    languageService.loadLanguage(_self)
  }
}
</script>

<style>
.box-content {
  min-height: 45px;
}
.box-description{
  padding-top: 10%;
  text-align: center;
}
.pagination {
    margin-left: 40%;
}
.information-label {
  font-weight: bold;
  text-align: center;
}
</style>
