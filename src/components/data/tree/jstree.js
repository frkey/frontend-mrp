import $ from 'jquery'
import 'jstree'
var options = null

function loadTree (opts) {
  options = opts
  $('#js-tree').on('move_node.jstree', function (node, parent){
      options.nodeChanged(parent)
    }).jstree({
    "core" : {
      "animation" : 1,
      "check_callback" : true,
      "data": opts.data,
      'themes': {
        'responsive': true
       }
    },
    "plugins" : [
      "dnd", "search",
      "state", "types",
      'html_data', "wholerow",
      'themes', 'ui'
    ],
    "search" : {
        "show_only_matches": true
     }
  })
  $('#js-tree').jstree(true).refresh()
}

function rollback (data) {
  options.data = data
  loadTree(options)
}

module.exports = {
  loadTree,
  rollback
}
