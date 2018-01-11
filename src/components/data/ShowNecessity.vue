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
import necessityBackend from '../../apis/necessityBackend'
import languageService from '../../services/languageService'
import VueNumeric from 'vue-numeric'
import bodyTransformation from '../../utils/bodyTransformation'

export default {
  name: 'Repository',
  props: ['selectButton', 'removeButton', 'explosionButton', 'selectMethodCallback', 'explosionMethodCallback'],
  components: {
    Datasource,
    VueNumeric
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
        name: 'pages.messages.showNecessity.fields.name',
        key: 'name'
      }, {
        name: 'pages.messages.showNecessity.fields.description',
        key: 'description'
      }]
    }
  },
  methods: {
    changePage (values) {
      this.pagination.current_page = values.page
      this.pagination.perpage = values.perpage
      this.loadNecessities(null, this.pagination)
    },
    onSearch (searchQuery) {
      bodyTransformation.frontendNameToBackendName(searchQuery, this.t, this.columns, (query) => {
        this.pagination.current_page = 1
        this.loadNecessities(query, this.pagination)
      })
    },
    reload () {
      this.loadNecessities(null, this.pagination)
    },
    removeNecesity (necessity) {
      var confirmation = window.confirm(this.t('pages.messages.necessity.action.remove'))
      if (confirmation) {
        necessityBackend.removeNecesity(necessity._id, () => {
          messageService.successMessage(this, 'pages.messages.necessity.removed')
        }, error => {
          messageService.errorMessage(this, error.message)
        })
      }
    },
    loadNecessities (search, pagination) {
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

      necessityBackend.loadNecessities(options, (response) => {
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
    var _self = this
    languageService.loadLanguage(_self)
    eventHelper.init()
    eventHelper.on('reloadNecessityList', () => {
      _self.reload()
    })

    for (var i = 0; i < this.columns.length; i++) {
      this.columns[i].name = this.t(this.columns[i].name)
    }

    if (this.selectButton === undefined || this.selectButton === true) {
      this.actions.push({
        text: this.t('pages.messages.showNecessity.selectNecessity'), // Button label
        icon: 'fa fa-check', // Button icon
        class: 'btn-md btn-success', // Button class (background color)
        event (e, row) { // Event handler callback. Gets event instace and selected row
          _self.selectMethodCallback(row.row)
        }
      })
    }

    if (this.removeButton === undefined || this.removeButton === true) {
      this.actions.push({
        text: this.t('pages.messages.necessity.removeButton'), // Button label
        icon: 'fa fa-remove', // Button icon
        class: 'btn-md btn-danger', // Button class (background color)
        event (e, row) { // Event handler callback. Gets event instace and selected row
          _self.removeNecesity(row.row)
        }
      })
    }

    if (this.explosionButton === undefined || this.explosionButton === true) {
      this.actions.push({
        text: this.t('pages.messages.necessity.explosionButton'), // Button label
        icon: 'fa fa-sitemap', // Button icon
        class: 'btn-md btn-success', // Button class (background color)
        event (e, row) { // Event handler callback. Gets event instace and selected row
          _self.explosionMethodCallback(row.row)
        }
      })
    }

    rolesService.loadUserRoles(this)
    this.loadNecessities(null, this.pagination)
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
