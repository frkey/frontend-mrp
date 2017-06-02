<template>
  <div id="js-tree"></div>
</template>

<script>
import jstree from './jstree'

export default {
  name: 'Repository',
  props: ['tree', 'nodeChanged', 'onSelect', 'onEdit', 'onDelete'],
  watch: {
    tree: function (val) {
      this.treeData = val
      this.loadTree(this.treeData)
    }
  },
  data () {
    return {
      treeData: []
    }
  },
  methods: {
    loadTree (treeData) {
      var options = {}
      options.data = treeData
      options.onEdit = this.onEdit
      options.onDelete = this.onDelete
      options.onSelect = this.onSelect
      options.nodeChanged = this.nodeChanged

      jstree.loadTree(options)
    },
    rollback (data) {
      jstree.rollback(data)
    }
  },
  mounted () {
  }
}
</script>
<style style scoped>
@import "/static/jstree/jstree.css";
</style>
