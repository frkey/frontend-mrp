<template>
  <div>
    <h1 class="text-center" v-translate>pages.products.header</h1>

    <section >
      <div class="col-sm-12" v-if="!productEdit">
        <productData ref='productDataComponent' :insertTreeButton="false" :previewTreeButton="false" :eventName="productData"></productData>
      </div>

      <div class="col-sm-12">
        <button type="submit" v-on:click="productEdit = true; response={purchasePrice: 0}" class=" col-sm-4 btn btn-primary btn-md pull-right" v-if="!productEdit"> <i class="fa fa-plus" aria-hidden="true"></i>{{ t('pages.products.button.newProduct') }}</button>

        <section class="box box-info" v-if="productEdit">
          <h1 class="text-center" v-translate>pages.products.productData</h1>
          <div class="box-body">
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.products.label.code</h5>
                <input v-validate="{ rules: { required: true } }" name='Code' class="form-control" type="text"  v-model="response.code">
                <span class="label label-danger" v-show="errors.has('Code')">{{ isErrors('Code') }}</span>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.products.label.name</h5>
                <input v-validate="{ rules: { required: true } }" name="Name"  class="form-control" type="text" v-model="response.name">
                <span class="label label-danger" v-show="errors.has('Name')">{{ isErrors('Name') }}</span>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.products.label.family</h5>
                <input v-validate="{ rules: { required: true } }" name="Family"  class="form-control" type="text" v-model="response.family">
                <span class="label label-danger" v-show="errors.has('Family')">{{ isErrors('Family') }}</span>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.products.label.productType</h5>
                <select name="product_type" v-validate="{ rules: { required: true } }" class="pull-left form-control" v-model="response.productType">
                  <option value="1">comprado</option>
                  <option value="2">produzido</option>
                </select>
                <span class="label label-danger" v-show="errors.has('product_type')">{{isErrors('product_type')}}</span>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.products.label.unitType</h5>
                <select name="unit" v-validate="{ rules: { required: true } }" class="pull-left form-control" v-model="response.unit">
                  <option value='units' v-translate>un</option>
                  <option value='kg' v-translate>kg</option>
                  <option value='m' v-translate>m</option>
                  <option value='cm' v-translate>cm</option>
                  <option value='m²' v-translate>m²</option>
                  <option value='m³' v-translate>m³</option>
                  <option value='liters' v-translate>l</option>
                </select>
                <span class="label label-danger" v-show="errors.has('unit')">{{ isErrors('unit') }}</span>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.products.label.leadTime</h5>
                <input v-validate="{ rules: { required: true, numeric:true } }" name="lead_time"  class="form-control" type="text" v-model="response.leadTime">
                <span class="label label-danger" v-show="errors.has('lead_time')">{{ isErrors('lead_time') }}</span>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.products.label.purchasePrice</h5>
                <vue-numeric  name="purchase_price"  class="form-control" type="text" v-model="response.purchasePrice" currency="R$" separator="." precision="2"></vue-numeric>
              </div>
            </div>
            <div class="col-sm-12">
              <div class="box-header with-border">
                <h5 class="description-header align-left" v-translate>pages.products.label.description</h5>
                <textarea class="col-sm-12" v-model="response.description"></textarea>
              </div>
            </div>
          </div>
          <div class="row" v-if="roles && roles['manager.write']">
            <button type="submit" v-on:click="createProduct" class="col-sm-2 btn btn-primary btn-md pull-right">{{ t('pages.products.button.save') }}</button>
            <button type="submit" v-on:click="productEdit = false; response = undefined" class="col-sm-2 btn btn-primary btn-md pull-right" v-if="productEdit"><i class="fa fa-times" aria-hidden="true"></i> {{ t('pages.products.button.close') }}</button>
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
import productBackend from '../../apis/productBackend'
import productData from '../data/ShowProducts'
import { eventHelper } from '../../services/eventHelper'
import languageService from '../../services/languageService'
import VueNumeric from 'vue-numeric'

export default {
  name: 'Repository',
  components: {
    productData,
    VueNumeric
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
      productEdit: false
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
          productBackend.updateProduct(_id, _self.response, (response) => {
            _self.productEdit = false
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
          productBackend.insertProduct(_self.response, (response) => {
            _self.productEdit = false
            eventHelper.emit('reloadProductList')
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
    eventHelper.on('productData', (productData) => {
      _self.productEdit = true
      productData.purchasePrice = productData.purchasePrice ? productData.purchasePrice : 0
      _self.response = productData
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
