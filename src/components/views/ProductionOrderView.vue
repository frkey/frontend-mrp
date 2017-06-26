<template>
  <div>
    <h1 class="text-center" v-translate>pages.productionOrders.header</h1>

    <section >
      <div class="col-sm-12" v-if="!productionOrderEdit">
        <productionOrderData :insertTreeButton="false" :previewTreeButton="false" eventName="productionOrderData"></productionOrderData>
      </div>

      <div class="col-sm-12">
        <button type="submit" v-on:click="productionOrderEdit = true; response = {product: {}}" class=" col-sm-4 btn btn-primary btn-md pull-right" v-if="!productionOrderEdit"> <i class="fa fa-plus" aria-hidden="true"></i>{{ ' ' + t('pages.productionOrders.button.newProductionOrder') }}</button>

        <section class="box box-info" v-if="productionOrderEdit">
          <h1 class="text-center" v-translate>pages.products.productionOrderData</h1>
          <div class="box-body">
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.productionOrders.label.code</h5>
                <input v-validate="{ rules: {} }" name='Code' class="form-control" type="text"  v-model="response.code">
                <span class="label label-danger" v-show="errors.has('Code')">{{ isErrors('Code') }}</span>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.productionOrders.label.productCode</h5>
                <input v-validate="{ rules: { required: true } }" name="ProductCode"  class="form-control" type="text" v-model="response.product.code">
                <span class="label label-danger" v-show="errors.has('Name')">{{ isErrors('Name') }}</span>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.productionOrders.label.originalDeadline</h5>
                <datepicker class="description-header align-left" language="pt-br" v-if="response._id == undefined" v-model="response.originalDeadline"></datepicker>
                <input type="text" class="description-header align-right" v-model="formattedOriginalDeadline" v-else>
                <span class="label label-danger" v-show="errors.has('Name')">{{ isErrors('Name') }}</span>
              </div>
            </div>
          </div>
          <div class="row" v-if="roles && roles['manager.write']">
            <button type="submit" v-on:click="createProduct" class="col-sm-2 btn btn-primary btn-md pull-right">{{ t('pages.products.button.save') }}</button>
            <button type="submit" v-on:click="productionOrderEdit = false; response = undefined" class="col-sm-2 btn btn-primary btn-md pull-right" v-if="productionOrderEdit"><i class="fa fa-times" aria-hidden="true"></i> {{ t('pages.products.button.close') }}</button>
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
import productionOrderBackend from '../../apis/productionOrderBackend'
import productionOrderData from '../data/ShowProductionOrders.vue'
import { eventHelper } from '../../services/eventHelper'
import languageService from '../../services/languageService'
import VueNumeric from 'vue-numeric'
import Datepicker from 'vuejs-datepicker'
import formatDateUtil from '../../utils/formatDate'

export default {
  name: 'Repository',
  components: {
    productionOrderData,
    VueNumeric,
    Datepicker
  },
  data () {
    return {
      response: undefined,
      error: {},
      totalItems: 0,
      itemsPage: 10,
      maxSize: 5,
      pagination: {currentPage: 1},
      roles: undefined,
      productionOrderEdit: false
    }
  },
  computed: {
    formattedOriginalDeadline: function () {
      return formatDateUtil.formatDate(this.response.originalDeadline)
    }
  },
  methods: {
    createProduct () {
      var _self = this
      messageService.verifyFields(_self, () => {
        delete (_self.response.costValue)
        delete (_self.response.__v)

        if (_self.response._id) {
          var _id = _self.response._id
          delete (_self.response._id)
          productionOrderBackend.updateProduct(_id, _self.response, (response) => {
            _self.productionOrderEdit = false
            eventHelper.emit('reloadProductList')
            messageService.successMessage(_self, _self.t('pages.messages.product.productUpdated'))
          }, (error) => {
            if (error.response.data) {
              messageService.errorMessage(_self, error.response.data.message)
            } else {
              messageService.errorMessage(_self, error.message)
            }
          })
        } else {
          productionOrderBackend.insertProduct(_self.response, (response) => {
            _self.productionOrderEdit = false
            eventHelper.emit('reloadProductionOrderList')
            messageService.successMessage(_self, _self.t('pages.messages.product.productInserted'))
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
    }
  },
  mounted () {
    var _self = this
    rolesService.loadUserRoles(_self)
    languageService.loadLanguage(this)
    eventHelper.init()
    eventHelper.on('productionOrderData', (productionOrderData) => {
      _self.productionOrderEdit = true
      productionOrderData.purchasePrice = productionOrderData.purchasePrice ? productionOrderData.purchasePrice : 0
      _self.response = productionOrderData
    })
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

</style>
