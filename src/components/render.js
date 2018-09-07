export default {
  name: 'render',
  functional: true,
  props: {
    node: Object,
    parent: null,
    tpl: Function,
    index: Number,
    nodeMouseOver: Function
  },
  render (h, ctx) {
    const {node, parent, tpl, index, nodeMouseOver} = ctx.props
    let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
    if (node.searched) titleClass += ' node-searched'
    return tpl ? tpl(node, ctx, parent, index, ctx.props)
     : <span domPropsInnerHTML={node.title} title={node.title} class={titleClass}
        onMouseover={() => nodeMouseOver(node, index, parent)}
        style='user-select: none'
        onClick={() => {
          ctx.parent.nodeSelected(node)
        }}>
    </span>
  }
}

// (fn => (f => f(f))(f => fn(n => f(f)(n)))) (g =>
//   n => [1, 2].indexOf(n) > -1 ? 1 : g(n - 1) + g(n - 2)
// )(10)