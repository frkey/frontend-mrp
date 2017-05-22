<template>
  <section class="content">
    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-info">
          <div class="panel-heading">Tokens</div>
          <div class="panel-body">
            <datasource
              language="en"
              :pagination="pagination"
              :table-data="response"
              :columns="columns"
              v-on:change="changePage"
              v-on:searching="onSearch"
              :actions="actions"></datasource>
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
      actions: [],
      columns: [{
        name: 'import_name',
        key: 'importName'
      }, {
        name: 'user',
        key: 'user.name'
      }, {
        name: 'username',
        key: 'user.username'
      }, {
        name: 'creation_date',
        key: 'creationDate'
      }, {
        name: 'description',
        key: 'description'
      }, {
        name: 'files',
        key: 'files',
        render (value) { // Render callback
          return value.toString().replace(',', ', ')
        }
      }]
    }
  },
  methods: {
    changePage (values) {
      this.pagination.current_page = values.page
      this.pagination.perpage = values.perpage
      this.loadSPEDS(null, this.pagination)
    },
    onSearch (searchQuery) {
      this.pagination.current_page = 1
      this.loadSPEDS(this.getTrueField(searchQuery), this.pagination)
    },
    loadSPEDS (search, pagination) {
      // var _self = this
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
      messageService.successMessage()
    }
  },
  mounted () {
    this.loadSPEDS(null, this.pagination)
    rolesService.loadUserRoles(this)
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
