<template>
  <div id="js-tree"></div>
</template>

<script>
import jstree from './jstree'

export default {
  name: 'Repository',
  props: ['nodeChanged', 'treeData'],
  methods: {
    loadTree () {
      console.log(this.nodeChanged)
      var options = {
        data: this.treeData,
        nodeChanged: this.nodeChanged
      }
      jstree.loadTree(options)
    },
    rollback (data) {
      jstree.rollback(data)
    }
  },
  mounted () {
    var _self = this
    _self.loadTree()
  }
}
</script>
<style style scoped>
@import "/static/jstree/jstree.css";
</style>
