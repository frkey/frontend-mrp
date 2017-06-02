import $ from 'jquery'
import 'jstree'
var options = null
var map = []

function loadTree (opts) {
  options = opts

  try {
    $('#js-tree').on('move_node.jstree', function (node, data){

      if(data.parent !== '#')
        data.parent = $('#js-tree').jstree(true).get_node(data.parent)

      if(data.old_parent !== '#')
        data.old_parent = $('#js-tree').jstree(true).get_node(data.old_parent)

        options.nodeChanged(data)
      }).on('select_node.jstree', function (node, data){
        if (data.selected[0] !== undefined) {
          var data = $('#js-tree').jstree(true).get_node(data.selected[0])
          if(data.parent && data.parent !== '#')
            data.parent = $('#js-tree').jstree(true).get_node(data.parent)

          options.onSelect(data)
        }
      }).on('loaded.jstree', function (e, data){
        saveState()
      }).jstree({
      "core" : {
        "animation" : 1,
        "check_callback": function (operation, node, parent, position, more) {
          if(operation === "move_node") {
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
      "state": { "key" : "state_demo" },
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

    reloadOldState(options.data)

    $('#js-tree').jstree(true).settings.core.data = options.data;
    $('#js-tree').jstree(true).refresh()

  } catch (e) {
    var data = reloadOldState(options.data)
    $('#js-tree').jstree(true).settings.core.data = data;
    $('#js-tree').jstree(true).refresh()
  }
}

function rollback (data) {
  options.data = data
  loadTree(options)
}

function reloadOldState(data) {
  for(var i = 0; i<map.length; i++){
    searchTree(data[0], map[i])
  }
}

function searchTree(element, search) {
     if(element.id == search.id){
          element.state = search.state
          return element;
     }else if (element.children != null){
          var i;
          var result = null;
          for(i=0; result == null && i < element.children.length; i++){
               result = searchTree(element.children[i], search);
          }
          return result;
     }
     return null;
}


function saveState() {
  var v = $('#js-tree').jstree(true).get_json('#', {flat:true})
  if(v.length > 0) {
    v.reduce((previousValue, currentValue, index, array) => {
      var aux = {id: currentValue.id, state: currentValue.state}
      map.push(aux)
      return
    })
  }
}

module.exports = {
  loadTree,
  rollback
}
