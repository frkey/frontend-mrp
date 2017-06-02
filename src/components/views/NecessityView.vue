<template>
  <div>
    <modal :showModal="showModal" :closeAction="close" v-if="newNecessityItem">
      <h1 slot="header">{{ t('pages.messages.necessityItem.header') }}</h1>
      <div slot="body">
        <h5 class="description-header align-left" v-translate>pages.messages.necessityItem.fields.productName</h5>
        <input v-validate="{ rules: { required: true} }" name="Nome"  class="form-control" type="text" v-model="newNecessityItem.product.name">
        <span class="label label-danger" v-show="errors.has('Nome')">{{isErrors('Nome')}}</span>
        <h5 class="description-header align-left" v-translate>pages.messages.necessityItem.fields.quantity</h5>
        <input v-validate="{ rules: { required: true , numeric:true} }" name="Quantidade"  class="form-control" type="text" v-model="newNecessityItem.quantity">
        <span class="label label-danger" v-show="errors.has('Quantidade')">{{isErrors('Quantidade')}}</span>
        <h5 class="description-header align-left" v-translate>pages.messages.necessityItem.fields.deadline</h5>
        <input name="deadline"  class="form-control" type="text" v-model="newNecessityItem.deadline" v-mask="'##/##/#### ##:##'"/>
        <button v-on:click="saveItemData" class="btn btn-primary btn-md pull-right">{{t('pages.products.button.save') }}</button>
        <br>
      </div>
    </modal>
    <h1 class="text-center" v-translate>pages.necessities.header</h1>

    <section >

      <div class="col-sm-12">
        <showNecessity :selectMethodCallback="selectNecessity"></showNecessity>
        <button type="submit" v-on:click="necessityEdit = true; response={}; showAddItem=false" class=" col-sm-4 btn btn-primary btn-md pull-right" v-if="!necessityEdit"> <i class="fa fa-plus" aria-hidden="true"></i> {{ t('pages.necessity.button.newNecessity') }}</button>
      </div>

      <div class="col-sm-12">
        <section class="box box-info" v-if="necessityEdit">
          <div class="box-body">
            <h1 class="text-center" v-translate>pages.necessity.header</h1>
            <div class="col-sm-12">
              <div class="box-header">
                <h5 class="description-header align-left" v-translate>pages.messages.showNecessity.fields.name</h5>
                <input  v-validate="{ rules: { required: true } }" name='name' class="form-control" type="text"  v-model="response.name">
                <span class="label label-danger" v-show="errors.has('name')">{{ isErrors('name') }}</span>
              </div>
            </div>

            <div class="col-sm-12">
              <div class="box-header with-border">
                <h5 class="description-header align-left" v-translate>pages.messages.showNecessity.fields.description</h5>
                <textarea class="col-sm-12" v-model="response.description"></textarea>
              </div>
            </div>
            <section v-if="showAddItem">
              <h5 class="information-label" v-translate>pages.messages.showNecessity.products.choose</h5>
              <div class="col-sm-6">
                <h5 class="description-header align-left" v-translate>pages.messages.showNecessity.products.all</h5>
                <showProducts :removeButton="false" :reloadButton="false" :selectMethodCallback="selectProduct" :selectButton="true" :showTreeButton="false" :insertTreeButton="false" :previewTreeButton="false"></showProducts>
              </div>
              <div class="col-sm-6" v-if="response">
                <h5 class="description-header align-left" v-translate>pages.messages.showNecessity.fields.selected</h5>
                <necessityItem :necessityId="response ? response._id : undefined"></necessityItem>
              </div>
            </section>
          </div>
          <div v-if="roles && roles['manager.write']">
            <button type="submit" v-on:click="saveData" class="col-sm-2 btn btn-primary btn-md pull-right">{{ t('pages.products.button.save') }}</button>
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
import showNecessity from '../data/ShowNecessity'
import necessityItem from '../data/NecessityItem'
import showProducts from '../data/ShowProducts'
import {eventHelper} from '../../services/eventHelper'
import languageService from '../../services/languageService'
import necessityBackend from '../../apis/necessityBackend'
import VueNumeric from 'vue-numeric'
import Modal from 'modal-vue'

export default {
  name: 'Repository',
  components: {
    Modal,
    showNecessity,
    showProducts,
    necessityItem,
    VueNumeric
  },
  data () {
    return {
      newNecessityItem: undefined,
      response: undefined,
      error: {},
      totalItems: 0,
      itemsPage: 10,
      maxSize: 5,
      showModal: false,
      pagination: {currentPage: 1},
      roles: undefined,
      necessityEdit: false,
      showAddItem: false,
      items: []
    }
  },
  methods: {
    saveData () {
      var _self = this
      messageService.verifyFields(_self, () => {
        var id = _self.response._id
        delete (_self.response._id)
        delete (_self.response.__v)

        if (this.response._id) {
          necessityBackend.updateNecessity(id, _self.response, (response) => {
            this.response = response.data
            this.showAddItem = true
            messageService.successMessage(_self, 'Necessidade criada com sucesso')
          }, (error) => {
            this.showAddItem = false
            messageService.errorMessage(_self, error)
          })
        } else {
          necessityBackend.insertNecessity(this.response, (response) => {
            this.response = response.data
            this.showAddItem = true
            messageService.successMessage(_self, 'Necessidade criada com sucesso')
          }, (error) => {
            this.showAddItem = false
            messageService.errorMessage(_self, error)
          })
        }
      }, error => {
        messageService.errorMessage(_self, error.error)
      })
    },
    selectNecessity (necessity) {
      this.showAddItem = true
      this.necessityEdit = true
      this.response = necessity
    },
    close () {
      this.showModal = false
      this.newNecessityItem = undefined
    },
    selectProduct (product) {
      this.showModal = true
      this.newNecessityItem = {
        product: product,
        quantity: 0,
        deadline: ''
      }
    },
    saveItemData () {
      this.newNecessityItem.productId = this.newNecessityItem.product._id
      var date = ''
      if (this.newNecessityItem.deadline !== undefined) {
        date = new Date(this.newNecessityItem.deadline)
        date = date.toISOString()
      }
      eventHelper.emit('add_necessity_item', {
        productId: this.newNecessityItem.product._id,
        productName: this.newNecessityItem.productName,
        quantity: this.newNecessityItem.quantity,
        deadline: date
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
.information-label {
  font-weight: bold;
  text-align: center;
}
</style>
