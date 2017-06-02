<template>
  <section class="content">
    <div class="row">
      <div class="col-sm-12" v-if="isProductList">
        <div class="panel panel-info">
          <div class="panel-body" v-if="roles && roles['manager.delete']">
            <datasource
              language="en"
              :pagination="pagination"
              :table-data="response"
              :columns="columns"
              v-on:change="changePage"
              v-on:searching="onSearch"
              :actions="actions"></datasource>
          </div>
          <div class="panel-body" v-if="roles && !roles['manager.delete']">
            <datasource
              language="en"
              :pagination="pagination"
              :table-data="response"
              :columns="columns"
              v-on:change="changePage"
              v-on:searching="onSearch"></datasource>
          </div>
        </div>
      </div >
      <div class="col-sm-12" v-else>
        <button v-on:click="isProductList = true" class="col-sm-2 btn btn-primary btn-md pull-right">
          <i class='fa fa-arrow-circle-left' aria-hidden='true'></i>Back
        </button>
        <Treeview :treeData="treeviewData"></Treeview>
      </div>
    </div>
  </section>
</template>

<script>
</script>
<script>
import Datasource from 'vue-datasource'
import messageService from '../../services/messageService'
import rolesService from '../../services/rolesService'
import {eventHelper} from '../../services/eventHelper'
import productBackend from '../../apis/productBackend'
import Treeview from '../data/Treeview'
import bodyTransformation from '../../utils/bodyTransformation'
import languageService from '../../services/languageService'
import VueNumeric from 'vue-numeric'

export default {
  name: 'Repository',
  components: {
    Datasource,
    Treeview,
    VueNumeric
  },
  props: ['products', 'removeButton', 'reloadButton', 'selectButton',
    'showTreeButton', 'insertTreeButton', 'previewTreeButton', 'selectMethodCallback'],
  watch: {
    products: function (val) {
      this.products = val
      this.loadProducts(null, this.pagination)
    }
  },
  data () {
    return {
      isProductList: true,
      treeviewData: {},
      response: [],
      pagination: {
        limits: [15, 20],
        total: 25,
        per_page: 15,
        last_page: 1,
        current_page: 1,
        from: 1,
        to: 1
      },
      roles: undefined,
      actions: [],
      columns: [{
        name: 'pages.messages.showProducts.fields.code',
        key: 'code'
      }, {
        name: 'pages.messages.showProducts.fields.name',
        key: 'name'
      }, {
        name: 'pages.messages.showProducts.fields.family',
        key: 'family'
      }, {
        name: 'pages.messages.showProducts.fields.productType',
        key: 'productType'
      }, {
        name: 'pages.messages.showProducts.fields.amountInStock',
        key: 'amountInStock'
      }]
    }
  },
  methods: {
    changePage (values) {
      this.pagination.current_page = values.page
      this.pagination.perpage = values.perpage
      this.loadProducts(null, this.pagination)
    },
    onSearch (searchQuery) {
      this.pagination.current_page = 1
      bodyTransformation.frontendNameToBackendName(searchQuery, this.t, this.columns, (query) => {
        console.log(query)
        this.loadProducts(query, this.pagination)
      })
    },
    reload () {
      this.loadProducts(null, this.pagination)
    },
    selectProduct (product) {
      eventHelper.emit('productData', product)
    },
    removeProduct (product) {
      var _self = this
      productBackend.removeProduct(product, (response) => {
        _self.reload()
        messageService.successMessage(_self, this.t('pages.messages.product.productRemoved'))
      }, (error) => {
        messageService.errorMessage(_self, error)
      })
    },
    previewProductTree (data) {
      productBackend.getChildreen(data._id, (response) => {
        this.treeData = response.data
        this.treeviewData = response.data[0]
        this.isProductList = false
      }, (error) => {
        console.log(error)
        messageService.errorMessage(this, this.t('pages.messages.product.childrenErrorOcurred'))
      })
    },
    loadProducts (search, pagination) {
      var _self = this
      var options = {}

      if (pagination.perpage) {
        options.limit = pagination.perpage
      }
      if (pagination.current_page) {
        options.page = pagination.current_page
      }
      if (search) {
        options.search = search
      }

      if (this.products === undefined) {
        productBackend.loadProducts(options, (response) => {
          _self.pagination.current_page = pagination.current_page
          _self.pagination.last_page = response.data.pages
          _self.pagination.perpage = response.data.limit
          _self.response = response.data.docs
        }, (error) => {
          console.log(error)
          messageService.errorMessage(_self, error.message)
        })
      } else {
        _self.response = this.products
      }
    }
  },
  mounted () {
    languageService.loadLanguage(this)
    var _self = this
    if (this.insertTreeButton === undefined || this.insertTreeButton === true) {
      this.actions.push({
        text: this.t('pages.messages.showProducts.insertProduct'), // Button label
        icon: 'fa fa-plus', // Button icon
        class: 'btn-success btn-md', // Button class (background color)
        event (e, row) { // Event handler callback. Gets event instace and selected row
          eventHelper.emit('insertProductInTree', row.row)
        }
      })
    }

    if (this.selectButton === undefined || this.selectButton === true) {
      this.actions.push({
        text: this.t('pages.messages.showProducts.selectProduct'), // Button label
        icon: 'fa fa-check', // Button icon
        class: 'btn-md btn-success', // Button class (background color)
        event (e, row) { // Event handler callback. Gets event instace and selected row
          if (_self.selectMethodCallback === undefined) {
            _self.selectProduct(row.row)
          } else {
            _self.selectMethodCallback(row.row)
          }
        }
      })
    }

    if (this.reloadButton === undefined || this.reloadButton === true) {
      this.actions.push({
        text: this.t('pages.messages.showProducts.reloadProducts'), // Button label
        icon: 'fa fa-refresh', // Button icon
        class: 'btn-primary btn-md', // Button class (background color)
        event (e, row) { // Event handler callback. Gets event instace and selected row
          _self.reload()
        }
      })
    }

    if (this.removeButton === undefined || this.removeButton === true) {
      this.actions.push({
        text: this.t('pages.messages.showProducts.removeProduct'), // Button label
        icon: 'fa fa-times', // Button icon
        class: 'btn-md btn-danger', // Button class (background color)
        event (e, row) { // Event handler callback. Gets event instace and selected row
          var r = window.confirm(_self.t('pages.messages.showProducts.removeProduct.confirmation'))
          if (r === true) {
            _self.removeProduct(row.row)
          }
        }
      })
    }

    if (this.showTreeButton === undefined || this.showTreeButton === true) {
      this.actions.push({
        text: this.t('pages.messages.showProducts.productTree'), // Button label
        icon: 'fa fa-share', // Button icon
        class: 'btn-md btn-info', // Button class (background color)
        event (e, row) { // Event handler callback. Gets event instace and selected row
          window.location = '/products/' + row.row._id + '/structure'
        }
      })
    }

    if (this.previewTreeButton === undefined || this.previewTreeButton === true) {
      this.actions.push({
        text: this.t('pages.messages.showProducts.previewTree'), // Button label
        icon: 'fa fa-eye', // Button icon
        class: 'btn-md btn-warning', // Button class (background color)
        event (e, row) { // Event handler callback. Gets event instace and selected row
          _self.previewProductTree(row.row)
        }
      })
    }

    for (var i = 0; i < this.columns.length; i++) {
      this.columns[i].name = this.t(this.columns[i].name)
    }

    eventHelper.init()
    eventHelper.on('reloadProductList', () => {
      _self.reload()
    })
    rolesService.loadUserRoles(this)
    this.loadProducts(null, this.pagination)
  }
}
</script>

<style>
  .btn-treeInsert {
    background: #4B0082;
    color: white;
  }
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
