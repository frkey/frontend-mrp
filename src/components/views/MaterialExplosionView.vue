<template>
  <div>
    <h1 class="text-center" v-translate>pages.materialExplosion.header</h1>
    <section>
      <div class="col-sm-12">
        <showNecessity :explosionMethodCallback="materialExplosion" :selectButton="false" :removeButton="false"></showNecessity>
      </div>
      <div class="col-sm-12" v-if="showProductTable">
        <productData :necessityId="necessityId" :insertTreeButton="false" :previewTreeButton="false" :removeButton="false"
                     :reloadButton="false" :selectButton="false" :showTreeButton="false"></productData>
      </div>
      <br>
      </section>
  </div>
</template>
<script>
import rolesService from '../../services/rolesService'
import showNecessity from '../data/ShowNecessity'
import necessityItem from '../data/NecessityItem'
import productData from '../data/ShowProducts'
import languageService from '../../services/languageService'
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
    productData,
    necessityItem,
    VueNumeric,
    Datepicker
  },
  data () {
    return {
      necessityId: undefined,
      operation: 'material',
      response: undefined,
      error: {},
      roles: undefined,
      showProductTable: false
    }
  },
  methods: {
    materialExplosion (necessity) {
      this.necessityId = necessity._id
      this.showProductTable = true
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
