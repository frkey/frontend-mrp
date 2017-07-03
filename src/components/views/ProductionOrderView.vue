<template>
  <div>
    <modal :showModal="pageControl.findProduct" :closeAction="closeModal">
      <h1 slot="header">{{ t('pages.messages.necessityItem.header') }}</h1>
      <div slot="body">
        <productData :insertTreeButton="false" :previewTreeButton="false" :removeButton="false" :showTreeButton="false"></productData>
      </div>
    </modal>
    <h1 class="text-center" v-translate>pages.productionOrders.header</h1>

    <section >
      <div class="col-sm-12" v-if="!pageControl.edit">
        <productionOrderData :buttons="buttons" :backend="backend" :columns="columns"></productionOrderData>
      </div>

      <div class="col-sm-12">
        <button type="submit" v-on:click="pageControl.edit = true" class=" col-sm-4 btn btn-primary btn-md pull-right" v-if="!pageControl.edit"> <i class="fa fa-plus" aria-hidden="true"></i>{{ ' ' + t('pages.productionOrders.button.newProductionOrder') }}</button>

        <section class="box box-info" v-if="pageControl.edit">
          <h1 class="text-center" v-translate>pages.products.productionOrderData</h1>
          <div class="box-body">
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.productionOrders.label.code</h5>
                <input v-validate="{ rules: { required: true } }" name='Code' class="form-control" type="text" v-model="response.code">
                <span class="label label-danger" v-show="errors.has('Code')">{{ isErrors('Code') }}</span>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.productionOrders.label.productCode</h5>
                <div class="input-group">
                  <input type="text" class="search form-control" v-model="modalProduct.code" v-validate="{ rules: { required: true } }" name="productCode">
                  <span class="input-group-btn">
                    <button class="btn btn-flat" v-on:click="pageControl.findProduct = true">
                      <i class="fa fa-search"></i>
                    </button>
                  </span>
                </div>
                <span class="label label-danger" v-show="errors.has('prodcuctCode')">{{ isErrors('productCode') }}</span>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.productionOrders.label.quantity</h5>
                <input v-validate="{ rules: { required: true } }" name='Quantity' class="form-control" type="text"  v-model="response.quantity">
                <span class="label label-danger" v-show="errors.has('Quantity')">{{ isErrors('Quantity') }}</span>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="col-sm-6">
                <div class="box-header">
                  <h5 class="description-header align-left" v-translate>pages.productionOrders.label.originalDeadline</h5>
                  <datepicker class="description-header align-left" language="pt-br" v-bind:disabled-picker="editing" v-model="response.originalDeadline"></datepicker>
                  <span class="label label-danger" v-show="errors.has('Name')">{{ isErrors('Name') }}</span>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="box-header">
                  <h5 class="description-header align-left" v-translate>pages.productionOrders.label.revisedDeadline</h5>
                  <datepicker class="description-header" language="pt-br" v-model="response.revisedDeadline"></datepicker>
                  <span class="label label-danger" v-show="errors.has('Name')">{{ isErrors('Name') }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.productionOrders.label.orderType</h5>
                <select name="orderType" v-validate="{ rules: { required: true } }" class="pull-left form-control" v-model="response.type">
                  <option value="1" v-translate>enums.productionOrder.type.1</option>
                  <option value="2" v-translate>enums.productionOrder.type.2</option>
                </select>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.productionOrders.label.orderStatus</h5>
                <select name="orderStatus" v-validate="{ rules: { required: true } }" class="pull-left form-control" v-model="response.status">
                  <option value="1" v-translate>enums.productionOrder.status.1</option>
                  <option value="2" v-translate>enums.productionOrder.status.2</option>
                  <option value="3" v-translate>enums.productionOrder.status.3</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row" v-if="roles && roles['manager.write']">
            <div class="col-sm-12">
              <button type="submit" v-on:click="createProductionOrder" class="col-sm-2 btn btn-primary btn-md last-element pull-right"><i class="fa fa-check" aria-hidden="true"></i> {{t('pages.products.button.save') }}</button>
              <button type="submit" v-on:click="pageControl.edit = false; response = undefined" class="col-sm-2 btn btn-primary btn-md last-element pull-right" v-if="pageControl.edit"><i class="fa fa-times" aria-hidden="true"></i> {{ t('pages.products.button.close') }}</button>
            </div>
          </div>
        </section>
      </div>
      <br>
    </section>
  </div>
</template>

<script>
import messageService from '../../services/messageService'
import rolesService from '../../services/rolesService'
import productionOrderData from '../data/BasicOperationsCRUD.vue'
import productData from '../data/ShowProducts'
import { eventHelper } from '../../services/eventHelper'
import languageService from '../../services/languageService'
import VueNumeric from 'vue-numeric'
import Datepicker from 'vuejs-datepicker'
import formatDateUtil from '../../utils/formatDate'
import modal from 'modal-vue'

export default {
  name: 'Repository',
  components: {
    productionOrderData,
    VueNumeric,
    Datepicker,
    modal,
    productData
  },
  data () {
    return {
      response: {},
      error: {},
      totalItems: 0,
      itemsPage: 10,
      maxSize: 5,
      pagination: {currentPage: 1},
      roles: undefined,
      modalProduct: {},
      pageControl: {
        edit: false,
        findProduct: false
      },
      editing: false,
      buttons: ['edit', 'remove', 'reload'],
      columns: [{
        name: 'pages.messages.showProductionOrders.fields.code',
        key: 'code'
      }, {
        name: 'pages.messages.showProductionOrders.fields.productCode',
        key: 'productCode'
      }, {
        name: 'pages.messages.showProductionOrders.fields.quantity',
        key: 'quantity'
      }, {
        name: 'pages.messages.showProductionOrders.fields.originalDeadline',
        key: 'originalDeadline',
        render (value) {
          if (value) {
            var date = new Date(value)
            return formatDateUtil.formatDate(date)
          } else {
            return ''
          }
        }
      }, {
        name: 'pages.messages.showProductionOrders.fields.revisedDeadline',
        key: 'revisedDeadline',
        render (value) {
          if (value) {
            var date = new Date(value)
            return formatDateUtil.formatDate(date)
          } else {
            return ''
          }
        }
      }, {
        name: 'pages.messages.showProductionOrders.fields.orderType',
        key: 'type',
        render (value) {
          return global.Vue.t(`enums.productionOrder.type.${value}`)
        }
      }, {
        name: 'pages.messages.showProductionOrders.fields.orderStatus',
        key: 'status',
        render (value) {
          return global.Vue.t(`enums.productionOrder.status.${value}`)
        }
      }]
    }
  },
  computed: {
    formattedOriginalDeadline: function () {
      return formatDateUtil.formatDate(this.response.originalDeadline)
    },
    formattedRevisedDeadline: function () {
      return formatDateUtil.formatDate(this.response.revisedDeadline)
    }
  },
  methods: {
    createProductionOrder () {
      var _self = this
      messageService.verifyFields(_self, () => {
        delete (_self.response.__v)

        if (_self.response._id) {
          var _id = _self.response._id
          this.backend.update(_id, _self.response, (response) => {
            _self.pageControl.edit = false
            eventHelper.emit('reloadItemList')
            messageService.successMessage(_self, _self.t('pages.messages.productionOrder.updated'))
          }, (error) => {
            if (error.response.data) {
              messageService.errorMessage(_self, error.response.data.message)
            } else {
              messageService.errorMessage(_self, error.message)
            }
          })
        } else {
          console.log(JSON.stringify(this.response))
          this.backend.insert(_self.response, (response) => {
            _self.pageControl.edit = false
            eventHelper.emit('reloadItemList')
            messageService.successMessage(_self, _self.t('pages.messages.productionOrder.inserted'))
          }, (error) => {
            if (error.response) {
              messageService.errorMessage(_self, error.response.data.message)
            } else {
              messageService.errorMessage(_self, error.message)
            }
          })
        }
      }, error => {
        messageService.errorMessage(_self, error)
      })
    },
    isErrors (field) {
      var msg = this.errors.first(field)
      if (msg) {
        msg = msg.replace(' ' + field, '')
      }
      return msg
    },
    closeModal () {
      this.pageControl.findProduct = false
    }
  },
  mounted () {
    var _self = this
    rolesService.loadUserRoles(_self)
    languageService.loadLanguage(this)
    eventHelper.init()
    eventHelper.on('itemDetails', (productionOrderData) => {
      _self.pageControl.edit = true
      _self.response = productionOrderData
    })
    eventHelper.on('productData', (productData) => {
      this.closeModal()
      this.modalProduct = productData
      this.response.productId = productData._id
    })
  },
  created () {
    this.backend = require('../../apis/productionOrderBackend')
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

.last-element {
  margin-bottom: 5px;
  margin-right: 5px;
}

</style>
