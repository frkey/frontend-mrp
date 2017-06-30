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
              :columns="columnsNames"
              v-on:change="changePage"
              v-on:searching="onSearch"
              :actions="actions"></datasource>
          </div>
          <div class="panel-body" v-if="roles && !roles['manager.delete']">
            <datasource
              language="en"
              :pagination="pagination"
              :table-data="response"
              :columns="columnsNames"
              v-on:change="changePage"
              v-on:searching="onSearch"></datasource>
          </div>
        </div>
      </div >
      <div class="col-sm-12" v-else>
        <button v-on:click="isProductList = true" class="col-sm-2 btn btn-primary btn-md pull-right">
          <i class='fa fa-arrow-circle-left' aria-hidden='true'></i>Back
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Datasource from 'vue-datasource'
import messageService from '../../services/messageService'
import rolesService from '../../services/rolesService'
import {eventHelper} from '../../services/eventHelper'
import bodyTransformation from '../../utils/bodyTransformation'
import languageService from '../../services/languageService'
// import formatDateUtil from '../../utils/formatDate'

export default {
  name: 'Repository',
  components: {
    Datasource
  },
  props: ['buttons', 'selectMethodCallback', 'backend', 'columns'],
  watch: {
    products: function (val) {
      this.products = val
      this.loadItems(null, this.pagination)
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
      actions: []
    }
  },
  methods: {
    changePage (values) {
      this.pagination.current_page = values.page
      this.pagination.perpage = values.perpage
      this.loadItems(null, this.pagination)
    },
    onSearch (searchQuery) {
      this.pagination.current_page = 1
      bodyTransformation.frontendNameToBackendName(searchQuery, this.t, this.columns, (query) => {
        this.loadItems(query, this.pagination)
      })
    },
    reload () {
      this.loadItems(null, this.pagination)
    },
    editItem (item) {
      eventHelper.emit('itemDetails', item)
    },
    removeItem (item) {
      var _self = this
      this.backend.remove(item, (response) => {
        _self.reload()
        messageService.successMessage(_self, this.t('pages.messages.product.productRemoved'))
      }, (error) => {
        messageService.errorMessage(_self, error)
      })
    },
    loadItems (search, pagination) {
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

      this.backend.load(options, (response) => {
        _self.pagination.current_page = response.data.page
        _self.pagination.last_page = response.data.pages
        _self.pagination.perpage = response.data.limit
        _self.pagination.total = response.data.total
        _self.response = response.data.docs
      }, (error) => {
        messageService.errorMessage(_self, error.message)
      })
    }
  },
  mounted () {
    languageService.loadLanguage(this)
    var _self = this

    this.buttons.forEach(button => {
      if (button === 'insertTree') {
        this.actions.push({
          text: this.t('pages.messages.showProducts.insertProduct'), // Button label
          icon: 'fa fa-plus', // Button icon
          class: 'btn-success btn-md', // Button class (background color)
          event (e, row) { // Event handler callback. Gets event instace and selected row
            eventHelper.emit('insertProductInTree', row.row)
          }
        })
      }

      if (button === 'edit') {
        this.actions.push({
          text: this.t('pages.messages.showProducts.selectProduct'), // Button label
          icon: 'fa fa-check', // Button icon
          class: 'btn-md btn-success', // Button class (background color)
          event (e, row) { // Event handler callback. Gets event instace and selected row
            if (_self.selectMethodCallback === undefined) {
              _self.editItem(row.row)
            } else {
              _self.selectMethodCallback(row.row)
            }
          }
        })
      }

      if (button === 'reload') {
        this.actions.push({
          text: this.t('pages.messages.showProducts.reloadProducts'), // Button label
          icon: 'fa fa-refresh', // Button icon
          class: 'btn-primary btn-md', // Button class (background color)
          event (e, row) { // Event handler callback. Gets event instace and selected row
            _self.reload()
          }
        })
      }

      if (button === 'remove') {
        this.actions.push({
          text: this.t('pages.messages.showProducts.removeProduct'), // Button label
          icon: 'fa fa-times', // Button icon
          class: 'btn-md btn-danger', // Button class (background color)
          event (e, row) { // Event handler callback. Gets event instace and selected row
            var r = window.confirm(_self.t('pages.messages.showProducts.removeProduct.confirmation'))
            if (r === true) {
              _self.removeItem(row.row)
            }
          }
        })
      }

      if (button === 'showTree') {
        this.actions.push({
          text: this.t('pages.messages.showProducts.productTree'), // Button label
          icon: 'fa fa-share', // Button icon
          class: 'btn-md btn-info', // Button class (background color)
          event (e, row) { // Event handler callback. Gets event instace and selected row
            window.location = '/products/' + row.row._id + '/structure'
          }
        })
      }

      if (button === 'previewTree') {
        this.actions.push({
          text: this.t('pages.messages.showProducts.previewTree'), // Button label
          icon: 'fa fa-eye', // Button icon
          class: 'btn-md btn-warning', // Button class (background color)
          event (e, row) { // Event handler callback. Gets event instace and selected row
            _self.previewProductTree(row.row)
          }
        })
      }

      if (button instanceof Object) {
        this.actions.push(button)
      }
    })

    this.columnsNames = []
    for (var i = 0; i < this.columns.length; i++) {
      this.columnsNames[i] = {}
      this.columnsNames[i].name = this.t(this.columns[i].name)
      this.columnsNames[i].key = this.columns[i].key
      this.columnsNames[i].render = this.columns[i].render
    }

    eventHelper.init()
    eventHelper.on('reloadItemList', () => {
      _self.reload()
    })
    rolesService.loadUserRoles(this)
    this.loadItems(null, this.pagination)
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
