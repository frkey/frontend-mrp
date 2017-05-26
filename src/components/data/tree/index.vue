<template>
  <div id="js-tree"></div>
</template>

<script>
import jstree from './jstree'
import {eventHelper} from '../../../services/eventHelper'

export default {
  name: 'Repository',
  props: ['nodeChanged', 'onSelect'],
  data () {
    return {
      treeData: []
    }
  },
  methods: {
    loadTree (treeData) {
      var options = {}
      options.data = treeData
      options.onSelect = this.onSelect
      options.nodeChanged = this.nodeChanged

      jstree.loadTree(options)
    },
    rollback (data) {
      jstree.rollback(data)
    }
  },
  mounted () {
    var _self = this
    eventHelper.init()
    eventHelper.on('loadTree', (tree) => {
      _self.treeData = tree
      _self.loadTree(tree)
    })
  }
}
</script>
<style style scoped>
@import "/static/jstree/jstree.css";
</style>
