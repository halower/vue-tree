export default {
  name: 'inlineMenu',
  functional: true,
  props: {
    node: Object,
    tpl: Function
  },
  render (h, ctx) {
    debugger
    return ctx.props.tpl ? ctx.props.tpl(ctx.props.node, ctx) : <span domPropsInnerHTML={ctx.props.node.title} onClick={() => ctx.parent.expandNode(ctx.props.node)}></span>
  }
}
