<template>
  <div>
    <h1 class="text-center" v-translate>pages.messages.warehouse.header</h1>

    <section v-if="pageControll.isOK">
      <div class="col-sm-12">
        <basic-operation :columns="columns" :backend="warehouseBackend" :selectMethodCallback="selectWarehouse" :buttons="buttons"></basic-operation>
        <button v-on:click="editWarehouse" type="submit" class=" col-sm-4 btn btn-primary btn-md pull-right" > <i class="fa fa-plus" aria-hidden="true"></i> {{ t('pages.warehouse.button.newWarehouse') }}</button>
      </div>

      <div class="col-sm-12" v-if="pageControll.showWarehouse">
        <section class="box box-info" >
          <div class="box-body">
            <h1 class="text-center" v-translate>pages.necessity.header</h1>
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.messages.warehouse.fields.code</h5>
                <input  v-validate="{ rules: { required: true } }" name='name' class="form-control" type="text"  v-model="response.name">
                <span class="label label-danger" v-show="errors.has('name')">{{ isErrors('name') }}</span>
              </div>
            </div>

            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.messages.warehouse.fields.validSince</h5>
                <input  v-validate="{ rules: { required: true } }" name='name' class="form-control" type="text"  v-model="response.name">
                <span class="label label-danger" v-show="errors.has('name')">{{ isErrors('name') }}</span>
              </div>
            </div>

            <div class="col-sm-12">
              <div class="box-header with-border">
                <h5 class="description-header align-left" v-translate>pages.messages.warehouse.fields.description</h5>
                <textarea class="col-sm-12" v-model="response.description"></textarea>
              </div>
            </div>
          </div>
          <div v-if="roles && roles['manager.write']">
            <button type="submit" v-on:click="saveData" class="col-sm-2 btn btn-primary btn-md pull-right">{{ t('pages.products.button.save') }}</button>
            <button type="submit" v-on:click="closeWarehouse" class="col-sm-2 btn btn-danger btn-md pull-right">{{ t('pages.products.button.close') }}</button>
          </div>
        </section>
      </div>
      <br>
      </section>
  </div>
</template>
<script>
// import messageService from '../../services/messageService'
import rolesService from '../../services/rolesService'
import showNecessity from '../data/ShowNecessity'
import necessityItem from '../data/NecessityItem'
import basicOperationsCRUD from '../data/BasicOperationsCRUD'
// import {eventHelper} from '../../services/eventHelper'
import languageService from '../../services/languageService'
import Datepicker from 'vuejs-datepicker'
import VueNumeric from 'vue-numeric'
import Modal from 'modal-vue'

export default {
  name: 'Repository',
  components: {
    Modal,
    showNecessity,
    necessityItem,
    VueNumeric,
    Datepicker,
    'basic-operation': basicOperationsCRUD
  },
  data () {
    return {
      warehouseBackend: {},
      response: {},
      pageControll: {
        showWarehouse: false,
        isOK: false
      },
      columns: [{
        name: 'pages.messages.warehouse.fields.code',
        key: 'code'
      }, {
        name: 'pages.messages.warehouse.fields.validSince',
        key: 'validSince'
      }, {
        name: 'pages.messages.warehouse.fields.unitId',
        key: 'unitId'
      }, {
        name: 'pages.messages.warehouse.fields.description',
        key: 'description'
      }, {
        name: 'pages.messages.warehouse.fields.blocked',
        key: 'BLOCKED'
      }],
      buttons: ['edit', 'reload', 'remove']
    }
  },
  methods: {
    saveData () {
      this.warehouseBackend.insert(this.response, (result) => {
        console.log(result)
      }, (error) => {
        console.log(error)
      })
    },
    editWarehouse (data) {
      this.response = data
      this.pageControll.showWarehouse = true
    },
    closeWarehouse () {
      this.pageControll.showWarehouse = false
    },
    selectWarehouse (warehouse) {
      if (!warehouse) {
        this.editWarehouse({})
      } else {
        this.editWarehouse(warehouse)
      }
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
    this.warehouseBackend = require('./../../apis/warehouseBackend')
    this.pageControll.isOK = true
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
