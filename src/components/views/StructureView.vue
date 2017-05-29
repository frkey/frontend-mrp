<template>
  <section class='content'>
    <h1 class="text-center" v-translate>pages.structure.header</h1>
    <div class='row'>
      <modal :showModal="showModal" :closeAction="close" v-if="this.relationshipData.parent">
        <h1 slot="header">{{ t('pages.structure.relation.edit.quantity') }}</h1>
        <div slot="body">
          <button v-on:click="saveRelationshipData" class="btn btn-primary btn-md pull-right">{{t('pages.products.button.save') }}</button>
          <span >{{relationshipMessage}}</span>
          <h5 class="description-header align-left" v-translate>pages.structure.relation.children.quantity</h5>
          <input v-validate="{ rules: { required: true , decimal:true} }" name="quantidade"  class="form-control" type="text" v-model="relationshipData.quantity">
          <span class="label label-danger" v-show="errors.has('quantidade')">{{isErrors('quantidade')}}</span>
        </div>
      </modal>
      <div class='col-sm-6'>
        <div class='row' v-if="relationshipData.parent !== undefined && !productStructIsVisible && relationshipData.node !== undefined">
          <div class='panel panel-info'>
            <div class='panel-heading' v-translate>pages.structure.relation.header</div>
              <div class='panel-body'>
                  <div class="box-body">
                    <div class="col-sm-12">
                    <div class="col-sm-12">
                      <div class="box-header">
                        <h5 class="description-header align-left" v-translate>pages.structure.relation.fathersName</h5>
                        <input v-validate="{ rules: { required: true } }" name="Pai"  class="form-control" type="text" v-model="relationshipData.parent.text">
                        <span class="label label-danger" v-show="errors.has('Pai')">{{ isErrors('Pai') }}</span>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="box-header">
                        <h5 class="description-header align-left" v-translate>pages.structure.relation.sonName</h5>
                        <input v-validate="{ rules: { required: true } }" name="Filho"  class="form-control" type="text" v-model="relationshipData.node.text">
                        <span class="label label-danger" v-show="errors.has('Filho')">{{ isErrors('Filho') }}</span>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="box-header">
                        <h5 class="description-header align-left" v-translate>pages.structure.relation.children.quantity</h5>
                        <input v-validate="{ rules: { required: true , decimal:true} }" name="Quantidade"  class="form-control" type="text" v-model="relationshipData.quantity">
                        <span class="label label-danger" v-show="errors.has('Quantidade')">{{ isErrors('Quantidade') }}</span>
                      </div>
                    </div>
                    <div class="row" v-if="roles && roles['manager.write']">
                      <button v-on:click="saveRelationshipData" class="col-sm-2 btn btn-primary btn-md pull-right" v-translate>pages.products.button.save</button>
                      <button  v-on:click="closeRelationshipData" class="col-sm-2 btn btn-warning btn-md pull-right" v-translate>pages.products.button.close</button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class='row'>
          <div class='panel panel-info'  v-show="productStructIsVisible">
            <div class='panel-heading' v-translate>pages.structure.header</div>
            <div class='panel-body'>
              <tree :onDelete="removeRelationShipData" :onEdit="openQuantityChange" :nodeChanged='nodeChanged' :onSelect='onSelect'></tree>
            </div>
          </div>
        </div>
      </div>
      <div class='col-sm-6'>
        <div class='panel panel-info'>
          <div class='panel-heading' v-translate>pages.sidebar.item.products</div>
          <div class='panel-body'>
              <productData ref='productData' :selectButton="false" :eventName="productStructData" :removeButton="false"></productData>
          </div>
        </div>
      </div>
    </div>
    <div class='row'>
      <div class='col-sm-12' >
        <div class='panel panel-info'>
          <div class='panel-heading' v-translate>pages.structure.treeview.general</div>
            <div class='panel-body'>
              <div>
                <Treeview :treeData="treeviewData"></Treeview>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import messageService from '../../services/messageService'
import rolesService from '../../services/rolesService'
import productBackend from '../../apis/productBackend'
import tree from '../data/tree'
import productData from '../data/ShowProducts'
import Treeview from '../data/Treeview'
import {eventHelper} from '../../services/eventHelper'
import languageService from '../../services/languageService'
import Modal from 'modal-vue'

export default {
  name: 'Repository',
  components: {
    tree,
    productData,
    eventHelper,
    Treeview,
    Modal
  },
  data () {
    return {
      showModal: false,
      relationshipData: {},
      productStructIsVisible: true,
      managementCallback: null,
      response: [],
      treeData: [],
      treeviewData: {},
      nodeSelected: {},
      newNode: {}
    }
  },
  methods: {
    close () {
      this.showModal = false
    },
    openQuantityChange () {
      var relationshipData = {}
      this.showModal = true
      if (this.nodeSelected.parent !== '#') {
        relationshipData.node = this.nodeSelected
        relationshipData.parent = this.nodeSelected.parent
        relationshipData.relationshipId = this.nodeSelected.data.relationshipId
        relationshipData.quantity = this.nodeSelected.data.quantity
        this.relationshipData = relationshipData

        this.relationshipMessage = this.t('pages.structure.relation.message')
                                        .replace('{{this.relationshipData.parent.text}}', this.relationshipData.parent.text)
                                        .replace('{{this.relationshipData.quantity}}', this.relationshipData.quantity)
                                        .replace('{{this.relationshipData.node.text}}', this.relationshipData.node.text)

        this.managementCallback = function (_self, body) {
          productBackend.insertChildreen(this.relationshipData.parent.data._id, this.relationshipData.node.data._id, body, (response) => {
            _self.loadChildren()
            messageService.successMessage(_self, this.t('pages.structure.relation.created'))
          }, _self.errorMessage)
        }
      }
    },
    loadChildren () {
      productBackend.getChildreen(this.$route.params.productId, (response) => {
        this.treeData = response.data
        this.treeviewData = response.data[0]
        eventHelper.emit('loadTree', response.data)
      }, (error) => {
        console.log(error)
        messageService.errorMessage(this, this.t('pages.structure.relation.children.error'))
      })
    },
    nodeChanged (node) {
      if (node) {
        this.onSelect(node)
        this.managementCallback = function (_self, body) {
          var __self = _self
          productBackend.removeChildreen(node.old_parent.data._id, node.node.data._id, (response) => {
            productBackend.insertChildreen(node.parent.data._id, node.node.data._id, body, (response) => {
              messageService.successMessage(__self, this.t('pages.structure.relation.created'))
            }, __self.errorMessage)
          }, __self.errorMessage)
        }
        this.showRelationShipData()
      } else {
        this.errorMessage()
      }
    },
    onSelect (node) {
      this.nodeSelected = node
    },
    insertNodeInTree () {
      this.showRelationShipData()
      this.managementCallback = function (_self, body) {
        productBackend.insertChildreen(this.nodeSelected.id, this.newNode._id, body, (response) => {
          _self.loadChildren()
          messageService.successMessage(_self, this.t('pages.structure.relation.created'))
        }, _self.errorMessage)
      }
    },
    closeRelationshipData () {
      this.relationshipData = {parent: undefined, node: undefined}
      this.productStructIsVisible = true
      this.loadChildren()
    },
    saveRelationshipData () {
      this.managementCallback(this, {relationshipId: this.relationshipData.relationshipId, quantity: this.relationshipData.quantity})
      this.modal = false
      this.productStructIsVisible = true
      this.relationshipData = {}
    },
    removeRelationShipData () {
      var _self = this
      var r = window.confirm(this.t('pages.structure.remove'))
      if (r === true) {
        productBackend.removeChildreen(this.nodeSelected.parent.data._id, this.nodeSelected.data._id, (response) => {
          _self.loadChildren()
          this.productStructIsVisible = true
          messageService.successMessage(_self, this.t('pages.structure.relation.remove'))
        }, _self.errorMessage)
      }
    },
    showRelationShipData (isRelationInfo) {
      var relationshipData = {}
      if (!this.isEmpty(this.nodeSelected)) {
        if (isRelationInfo) {
          if (this.nodeSelected.parent !== '#') {
            this.productStructIsVisible = false
            relationshipData.node = this.nodeSelected
            relationshipData.parent = this.nodeSelected.parent
            relationshipData.relationshipId = this.nodeSelected.data.relationshipId
            relationshipData.quantity = this.nodeSelected.data.quantity
            this.relationshipData = relationshipData

            this.managementCallback = function (_self, body) {
              productBackend.insertChildreen(this.relationshipData.parent.data._id, this.relationshipData.node.data._id, body, (response) => {
                _self.loadChildren()
                messageService.successMessage(_self, this.t('pages.structure.relation.created'))
              }, _self.errorMessage)
            }
          }
        } else {
          if (this.nodeSelected.data !== undefined) {
            this.productStructIsVisible = false
            relationshipData.parent = this.nodeSelected
            relationshipData.parent.id = this.nodeSelected.data._id
            relationshipData.node = {id: this.newNode._id, text: this.newNode.code + '-' + this.newNode.name}
          } else {
            if (this.nodeSelected.parent !== '#') {
              this.productStructIsVisible = false
              relationshipData.parent = this.nodeSelected.parent
              relationshipData.node = this.nodeSelected.node
            }
          }
          this.relationshipData = relationshipData
        }
      }
    },
    errorMessage () {
      this.loadChildren()
      messageService.errorMessage(this, this.t('error.general'))
    },
    isEmpty (obj) {
      if (obj == null) return true
      if (obj.length > 0) return false
      if (obj.length === 0) return true
      if (typeof obj !== 'object') return true
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false
      }
      return true
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
    eventHelper.init()
    eventHelper.on('insertProductInTree', (node) => {
      _self.newNode = node
      _self.insertNodeInTree()
    })
    _self.loadChildren()
    languageService.loadLanguage(this)
  }
}
</script>

<style>
  .img-circle {
    height: 120px;
  }
  .panel-info-header{
    padding-top: 1%;
  }
  .align-left {
    text-align: left;
    font-weight: bold;
  }
  .api-operations {
    height: 20px;
  }

  .api-operations:hover {
      cursor: pointer;
  }

  .text-center {
    text-align: center;
  }

  .alert {
    font-size: 100%;
    word-break: break-all;
  }

  .pull-right {
    margin-left: 2px;
  }

</style>
