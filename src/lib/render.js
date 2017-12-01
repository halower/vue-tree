export default {
  name: 'render',
  functional: true,
  props: {
    node: Object,
    tpl: Function
  },
  render (h, ctx) {
    let titleClass = ctx.props.node.selected ? 'node-title node-selected' : 'node-title'
    if (ctx.props.node.searched) titleClass += ' node-searched'
    return ctx.props.tpl ? ctx.props.tpl(ctx.props.node, ctx) : <span domPropsInnerHTML={ctx.props.node.title} class={titleClass} onClick={() => ctx.parent.nodeSelected(ctx.props.node)}></span>
  }
}
