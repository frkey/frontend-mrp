<template>
  <div>
    <h1 class="text-center">Products</h1>
    <section >
      <div class="col-sm-12">
        <button type="submit" v-on:click="productEdit = true; response={}" class=" col-sm-2 btn btn-primary btn-md pull-right" v-if="!productEdit"> <i class="fa fa-plus" aria-hidden="true"></i> New Product</button>
      </div>
      <section class="box box-info" v-if="productEdit">
        <div class="box-body">
          <div class="col-sm-12">
            <div class="box-header">
              <h5 class="description-header align-left">Code</h5>
              <input v-validate="{ rules: { required: true } }" name='Code' class="form-control" type="text"  v-model="response.code">
              <span v-show="errors.has('Code')">{{ errors.first('Code') }}</span>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="box-header">
              <h5 class="description-header align-left">Name</h5>
              <input v-validate="{ rules: { required: true } }" name="Name"  class="form-control" type="text" v-model="response.name">
              <span v-show="errors.has('Name')">{{ errors.first('Name') }}</span>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="box-header">
              <h5 class="description-header align-left">Family</h5>
              <input v-validate="{ rules: { required: true } }" name="Family"  class="form-control" type="text" v-model="response.family">
              <span v-show="errors.has('Family')">{{ errors.first('Family') }}</span>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="box-header">
              <h5 class="description-header align-left">Product type</h5>
              <select name="product_type" v-validate="{ rules: { required: true } }" class="pull-left form-control" v-model="response.productType">
                <option>comprado</option>
                <option>produzido</option>
              </select>
              <span v-show="errors.has('product_type')">{{ errors.first('product_type') }}</span>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="box-header">
              <h5 class="description-header align-left">unit</h5>
              <select name="unit" v-validate="{ rules: { required: true } }" class="pull-left form-control" v-model="response.unit">
                <option>unidade</option>
                <option>KG</option>
                <option>m²</option>
                <option>m³</option>
                <option>litros</option>
              </select>
              <span v-show="errors.has('unit')">{{ errors.first('unit') }}</span>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="box-header">
              <h5 class="description-header align-left">Lead time</h5>
              <input v-validate="{ rules: { required: true, numeric:true } }" name="lead_time"  class="form-control" type="text" v-model="response.leadTime">
              <span v-show="errors.has('lead_time')">{{ errors.first('lead_time') }}</span>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="box-header">
              <h5 class="description-header align-left">Purchase price</h5>
              <input v-validate="{ rules: { required: true, decimal:true } }" name="purchase_price"  class="form-control" type="text" v-model="response.purchasePrice">
              <span v-show="errors.has('purchase_price')">{{ errors.first('purchase_price') }}</span>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="box-header with-border">
              <h5 class="description-header align-left">Description</h5>
              <textarea class="col-sm-12" v-model="response.description"></textarea>
            </div>
          </div>
        </div>
        <div class="row" v-if="roles && roles['manager.write']">
          <button type="submit" v-on:click="createProduct" class="col-sm-2 btn btn-primary btn-md pull-right">Create product</button>
          <button type="submit" v-on:click="productEdit = false; response = undefined" class="col-sm-2 btn btn-primary btn-md pull-right" v-if="productEdit"><i class="fa fa-times" aria-hidden="true"></i> Close</button>
        </div>
      </section>
      <br>
      </section>

      <productData></productData>
  </div>
</template>
<script>
import messageService from '../../services/messageService'
import rolesService from '../../services/rolesService'
import productBackend from '../../apis/productBackend'
import productData from '../data/ShowProducts'

export default {
  name: 'Repository',
  components: {
    productData
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
        productBackend.insertProduct(_self.response, (response) => {
          productData.reload()
          messageService.successMessage(_self, 'Product has been inserted')
        }, (error) => {
          if (error.response.data) {
            messageService.errorMessage(_self, error.response.data.message)
          } else {
            messageService.errorMessage(_self, error.message)
          }
        })
      }, error => {
        messageService.errorMessage(_self, error)
      })
    }

  },
  mounted () {
    rolesService.loadUserRoles(this)
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
