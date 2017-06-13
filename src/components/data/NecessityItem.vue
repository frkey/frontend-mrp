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
import Treeview from '../data/Treeview'
import languageService from '../../services/languageService'
import VueNumeric from 'vue-numeric'
import necessityBackend from '../../apis/necessityBackend'
import bodyTransformation from '../../utils/bodyTransformation'

export default {
  name: 'Repository',
  props: ['necessityId'],
  components: {
    Datasource,
    Treeview,
    VueNumeric
  },
  watch: {
    necessityId: function (val) {
      console.log('a')
      if (val !== undefined) {
        console.log('a')
        this.necessityId = val
        this.loadnecessityItems(undefined, this.pagination, val)
      }
    }
  },
  data () {
    var _self = this
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
        name: 'pages.messages.showNecessity.fields.name',
        key: 'name'
      }, {
        name: 'pages.messages.necessityItem.fields.quantity',
        key: 'quantity'
      }, {
        name: 'pages.messages.necessityItem.fields.deadline',
        key: 'deadline',
        render (value) {
          var date = new Date(value)
          return _self.formatDate(date)
        }
      }]
    }
  },
  methods: {
    changePage (values) {
      this.pagination.current_page = values.page
      this.pagination.perpage = values.perpage
      this.loadnecessityItems(undefined, this.pagination, this.necessityId)
    },
    formatDate (date) {
      var day = date.getDate()
      var month = date.getMonth()
      var year = date.getFullYear()

      return day + '/' + month + '/' + year
    },
    onSearch (searchQuery) {
      bodyTransformation.frontendNameToBackendName(searchQuery, this.t, this.columns, (query) => {
        console.log(query)
        this.pagination.current_page = 1
        this.loadnecessityItems(query, this.pagination, this.necessityId)
      })
    },
    reload () {
      this.loadnecessityItems(undefined, this.pagination, this.necessityId)
    },
    loadnecessityItems (search, pagination, id) {
      var options = {}
      var _self = this

      if (id === undefined) {
        return
      }

      if (pagination.perpage) {
        options.limit = pagination.perpage
      }
      if (pagination.current_page) {
        options.page = pagination.current_page
      }
      if (search) {
        options.search = search
      }

      necessityBackend.loadNecessityItems(id, options, (response) => {
        _self.pagination.current_page = response.page
        _self.pagination.last_page = response.data.pages
        _self.pagination.perpage = response.data.limit
        _self.pagination.total = response.data.total
        _self.response = response.data.docs
        console.log(_self.response)
      }, (error) => {
        console.log(error)
        messageService.errorMessage(_self, error.message)
      })
    },
    removeItem (item) {
      necessityBackend.removeNecessityItem(this.necessityId, item._id, (response) => {
        this.loadnecessityItems(undefined, this.pagination, this.necessityId)
        messageService.successMessage(this, this.t('pages.messages.necessityItem.removed'))
      }, error => {
        messageService.errorMessage(this, error)
      })
    }
  },
  mounted () {
    var _self = this
    _self.loadnecessityItems(undefined, _self.pagination, _self.necessityId)
    rolesService.loadUserRoles(this)
    languageService.loadLanguage(this)
    for (var i = 0; i < this.columns.length; i++) {
      this.columns[i].name = this.t(this.columns[i].name)
    }
    eventHelper.init()
    eventHelper.on('add_necessity_item', (necessityData) => {
      necessityBackend.insertNecessityItem(_self.necessityId, necessityData, (response) => {
        _self.loadnecessityItems(undefined, _self.pagination, _self.necessityId)
        messageService.successMessage(_self, _self.t('pages.messages.necessityItem.inserted'))
      }, (error) => {
        console.log(error)
        messageService.errorMessage(_self, error)
      })
    })

    this.actions.push({
      text: this.t('pages.messages.necessityItem.removeButton'), // Button label
      icon: 'fa fa-remove', // Button icon
      class: 'btn-md btn-danger', // Button class (background color)
      event (e, row) { // Event handler callback. Gets event instace and selected row
        _self.removeItem(row.row)
      }
    })
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
