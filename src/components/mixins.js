function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0
    let v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

function setDragNode (guid, node, parent) {
  window['treeDrag'] = {}
  // window['treeDrag'][guid] = node
  window['treeDrag'][guid] = {node, parent}
}

function getDragNode (guid) {
  return window['treeDrag'][guid]
}

function hasInGenerations (root, node) {
  if (root.hasOwnProperty('children') && root.children) {
    for (let rn of root.children) {
      if (rn === node) return true
      if (rn.children) return hasInGenerations(rn, node)
    }
    return false
  }
}

export default {
  methods: {
    guid,
    setDragNode,
    getDragNode,
    hasInGenerations
  }
}
