import $ from 'jquery'
import 'jstree'
var options = null

function loadTree (opts) {
  options = opts
  $('#js-tree').on('move_node.jstree', function (node, data){

    if(data.parent !== '#')
      data.parent = $('#js-tree').jstree(true).get_node(data.parent)

    if(data.old_parent !== '#')
      data.old_parent = $('#js-tree').jstree(true).get_node(data.old_parent)

      options.nodeChanged(data)
    }).on('select_node.jstree', function (node, data){
      var data = $('#js-tree').jstree(true).get_node(data.selected[0])
      if(data.parent !== '#')
        data.parent = $('#js-tree').jstree(true).get_node(data.parent)

      options.onSelect(data)
    }).jstree({
    "core" : {
      "animation" : 1,
        "check_callback" : function (operation, node, parent, position, more) {
        if(operation === "copy_node" || operation === "move_node") {
          if(parent.id === "#") {
            return false; // prevent moving a child above or below the root
          }
        }
        return true; // allow everything else
      },
      "data": opts.data,
      'themes': {
        'responsive': true
       }
    },
    "contextmenu":{
      "items": function($node) {
          var tree = $("#js-tree").jstree(true);

          if($node.parent === '#') {
            return {}
          }
          else {
            return {
                "Edit": {
                    "separator_before": false,
                    "separator_after": false,
                    "label": "Edit",
                    "action": function (obj) {
                        options.onEdit(true);
                    }
                },
                "Remove": {
                    "separator_before": false,
                    "separator_after": false,
                    "label": "Remove",
                    "action": function (obj) {
                      options.onDelete();
                    }
                }
            };
          }
      }
  },
    "plugins" : [
      "dnd", "search",
      "state", "types",
      'html_data', "wholerow",
      'themes', 'ui', 'contextmenu'
    ],
    "search" : {
        "show_only_matches": true
     }
  })
  $('#js-tree').jstree(true).settings.core.data = options.data;
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
