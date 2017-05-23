<template>
  <section class="content">
    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-info">
          <div class="panel-heading">All Products</div>
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

export default {
  name: 'Repository',
  components: {
    Datasource
  },
  data () {
    return {
      response: [],
      pagination: {
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
        name: 'code',
        key: 'code'
      }, {
        name: 'family',
        key: 'family'
      }, {
        name: 'productType',
        key: 'productType'
      }, {
        name: 'amountInStock',
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
      this.loadProducts(searchQuery, this.pagination)
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
        messageService.successMessage(_self, 'Product has removed')
      }, (error) => {
        messageService.errorMessage(_self, error)
      })
    },
    loadProducts (search, pagination) {
      var _self = this
      var options = {}

      if (pagination.per_page) {
        options.limit = pagination.per_page
      }
      if (pagination.current_page) {
        options.page = pagination.current_page
      }
      if (search) {
        options.search = search
      }

      productBackend.loadProducts(options, (response) => {
        if (response.status !== 200) {
          _self.error = response.statusText
          return
        }
        _self.pagination.current_page = pagination.current_page
        _self.pagination.last_page = response.data.pages
        _self.pagination.perpage = response.data.limit
        _self.response = response.data.docs
      }, (error) => {
        if (error.response.data) {
          messageService.errorMessage(_self, error.response.data.message)
        } else {
          messageService.errorMessage(_self, error.message)
        }
      })
    }
  },
  mounted () {
    var _self = this
    this.actions.push({
      text: 'Select product', // Button label
      icon: 'fa fa-check', // Button icon
      class: 'btn-success pull-right', // Button class (background color)
      event (e, row) { // Event handler callback. Gets event instace and selected row
        _self.selectProduct(row.row)
      }
    })
    this.actions.push({
      text: 'Reload products', // Button label
      icon: 'fa fa-refresh', // Button icon
      class: 'btn-primary pull-right', // Button class (background color)
      event (e, row) { // Event handler callback. Gets event instace and selected row
        _self.reload()
      }
    })
    this.actions.push({
      text: 'Remove product', // Button label
      icon: 'fa fa-times', // Button icon
      class: 'btn-danger pull-right', // Button class (background color)
      event (e, row) { // Event handler callback. Gets event instace and selected row
        var r = window.confirm('Are you sure to delete Product?')
        if (r === true) {
          _self.removeProduct(row.row)
        }
      }
    })
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
