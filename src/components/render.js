export default {
  name: 'render',
  functional: true,
  props: {
    node: Object,
    parent: null,
    tpl: Function,
    index: Number,
    nodeMouseOver: Function,
    level: Number,
  },
  render (h, ctx) {
    const {node, parent, tpl, index, nodeMouseOver, level} = ctx.props
    const {selected, selDisabled = false} = node
    let titleClass
    if (selDisabled) {
      titleClass = 'node-title-disabled'
    } else {
      titleClass = selected ? 'node-title node-selected' : 'node-title'
    }
    if (node.searched) titleClass += ' node-searched'
    return tpl ? tpl(node, ctx, parent, index, ctx.props)
     : <span domPropsInnerHTML={node.title} title={node.title} class={titleClass}
        onMouseover={() => nodeMouseOver(node, index, parent)}
        style='user-select: none'
        onClick={() => {
          if (selDisabled) return
          ctx.parent.nodeSelected(node, {level, index})
        }}>
    </span>
  }
}