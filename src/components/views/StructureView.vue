<template>
  <section class='content'>
    <sweet-modal ref="productManagement" icon="error" hide-close-button blocking overlay-theme="dark" modal-theme="dark">
    	Selecione a quantidade do produto A em B

      <button class="col-sm-2 btn btn-success btn-md pull-right" v-on:click="saveProductManagement">Salvar</button>
    	<button class="col-sm-2 btn btn-danger btn-md pull-right" v-on:click="closeProductManagement">Fechar</button>
    </sweet-modal>

    <div class='row'>
      <div class='col-sm-12'>
        <div class='panel panel-info'>
          <div class='panel-heading'>Product Structure</div>
          <div class='panel-body'>
              <div v-show="!progress.finished">
                <radial-progress-bar :diameter="200"
                         :completed-steps="progress.completedSteps"
                         :total-steps="progress.totalSteps">
                   <p>Loading</p>
                </radial-progress-bar>
              </div>
              <div v-show="progress.finished">
                <tree ref="tree" :treeData='treeData' :nodeChanged='nodeChanged'></tree>
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
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import RadialProgressBar from 'vue-radial-progress'

export default {
  name: 'Repository',
  components: {
    tree,
    RadialProgressBar,
    SweetModal,
    SweetModalTab
  },
  data () {
    return {
      progress: {
        completedSteps: 0,
        totalSteps: 2,
        finished: true
      },
      managementCallback: null,
      response: [],
      treeData: [{
        'id': 1,
        'text': 'Root node',
        'children': [{
          'id': 2,
          'text': 'Child node 1'
        },
        {
          'id': 3,
          'text': 'Child node 2'
        }]
      }]
    }
  },
  methods: {
    nodeChanged (node) {
      var _self = this
      _self.progress.completedSteps = 0
      if (node) {
        if (node.parent !== '#') {
          _self.$refs.productManagement.open()
          this.managementCallback = function (_self) {
            var __self = _self
            productBackend.removeChildreen(node.old_parent, node.node.id, (response) => {
              __self.progress.completedSteps++
              productBackend.insertChildreen(node.parent, node.node.id, (response) => {
                __self.progress.completedSteps++
                __self.progress.finished = true
                messageService.successMessage(__self, 'Product has been associated')
              }, __self.errorMessage)
            }, __self.errorMessage)
          }
        } else {
          productBackend.insertChildreen(node.parent, node.node.id, (response) => {
            _self.progress.completedSteps = _self.progress.totalSteps
            _self.progress.finished = true
            messageService.successMessage(_self, 'Product has been associated')
          }, this.errorMessage)
        }
      } else {
        this.errorMessage()
      }
    },
    onSearch () {
      this.$refs.tree.rollback(this.treeData)
    },
    saveProductManagement () {
      this.managementCallback(this)
      this.$refs.productManagement.close()
    },
    closeProductManagement () {
      this.errorMessage()
      this.$refs.productManagement.close()
    },
    errorMessage () {
      this.progress.completedSteps = 0
      this.progress.finished = true
      this.$refs.tree.rollback(this.treeData)
      messageService.errorMessage(this, 'Error has ocurred')
    }
  },
  mounted () {
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
