<template>

  <div id='app' class='container-fluid'>
    <div class='col-md-4'>
      <div class='panel panel-default'>
        <div class='panel-heading'>Properties</div>
        <div class='panel-body'>
            <div class='form-horizontal'>
            <div class='form-group'>
              <label for='layout-type' class='control-label col-sm-3'>layout</label>
                <div  class='col-sm-12'>
                  <select id='layout-type' class='form-control' v-model='layoutType'>
                    <option>euclidean</option>
                    <option>circular</option>
                  </select>
              </div>
            </div>
            <button v-if='zoomable' type='button' class='btn btn-warning' @click='resetZoom' data-toggle='tooltip' data-placement='top' title='Reset Zoom'>
            <i class='fa fa-arrows-alt' aria-hidden='true'></i>
            </button>

        </div>
      </div>
    </div>
  </div>

  <div class='col-md-12 panel panel-default'>
    <d3tree ref='tree' :identifier='getId' :zoomable='zoomable' :data='tree' :node-text='nodeText'  :margin-x='Marginx' :margin-y='Marginy' :type='type' :layout-type='layoutType' :duration='duration' class='tree' @clicked='onClick' @expand='onExpand' @retract='onRetract'></d3tree>
  </div>

  </div>
</template>

<script>
import {D3tree} from 'vued3tree'
export default {
  name: 'app',
  props: ['treeData'],
  data () {
    return {
      tree: this.treeData,
      type: 'tree',
      layoutType: 'euclidean',
      duration: 750,
      Marginx: 30,
      Marginy: 30,
      nodeText: 'text',
      currentNode: null,
      zoomable: true,
      isLoading: false,
      events: []
    }
  },
  components: {
    D3tree
  },
  watch: {
    treeData: function (val) {
      this.treeData = val
      this.tree = val
    }
  },
  methods: {
    do (action) {
      if (this.currentNode) {
        this.isLoading = true
        this.$refs['tree'][action](this.currentNode).then(() => { this.isLoading = false })
      }
    },
    getId (node) {
      return node.id
    },
    expandAll () {
      this.do('expandAll')
    },
    collapseAll () {
      this.do('collapseAll')
    },
    showOnly () {
      this.do('showOnly')
    },
    show () {
      this.do('show')
    },
    onClick (evt) {
      this.currentNode = evt.element
      this.onEvent('onClick', evt)
    },
    onExpand (evt) {
      this.onEvent('onExpand', evt)
    },
    onRetract (evt) {
      this.onEvent('onRetract', evt)
    },
    onEvent (eventName, data) {
      this.events.push({eventName, data: data.data})
      console.log({eventName, data: data})
    },
    resetZoom () {
      this.isLoading = true
      this.$refs['tree'].resetZoom().then(() => { this.isLoading = false })
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.tree {
  height: 600px;
  width: 100%;
}
.graph-root {
  height: 800px;
  width: 100%;
}
.log  {
  height: 500px;
  overflow-x: auto;
  overflow-y: auto;
  overflow: auto;
  text-align: left;
}
</style>
