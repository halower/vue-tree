webpackJsonp([0],{"72xj":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.searchword,expression:"searchword"}],attrs:{type:"text",placeholder:"searchword"},domProps:{value:e.searchword},on:{input:function(t){t.target.composing||(e.searchword=t.target.value)}}}),e._v(" "),n("button",{attrs:{type:"button"},on:{click:e.search}},[e._v("手动搜索")]),e._v(" "),n("v-tree",{ref:"tree",attrs:{data:e.treeData,draggable:!0,multiple:!0,tpl:e.tpl,halfcheck:!0},on:{"node-click":e.nodeClick}})],1)},o=[],a={render:r,staticRenderFns:o};t.a=a},FtnS:function(e,t,n){"use strict";var r=n("Hmpo"),o=n.n(r),a=n("vYJH"),c=n.n(a);t.a={name:"HelloWorld",data:function(){return{searchword:"",treeData:[{title:"node1",expanded:!0,children:[{title:"node 1-1",expanded:!0,children:[{title:"node 1-1-1"},{title:"node 1-1-2"},{title:"node 1-1-3"}]},{title:"node 1-2",children:[{title:"<span style='color: red'>node 1-2-1</span>"},{title:"<span style='color: red'>node 1-2-2</span>"}]}]}]}},methods:{tpl:function(e,t){var n=this,r=this.$createElement,o=e.selected?"node-title node-selected":"node-title";return e.searched&&(o+=" node-searched"),r("span",null,[r("button",{style:"color:blue; background-color:pink",on:{click:function(){return n.$refs.tree.addNode(e,{title:"sync loading"})}}},["+"]),r("span",{class:o,domProps:{innerHTML:e.title},on:{click:function(){t.parent.nodeSelected(t.props.node),console.log(t.parent.getSelectedNodes())}}}),r("button",{style:"color:green; background-color:pink",on:{click:function(){return n.asyncLoad(e)}}},["async loading"]),r("button",{style:"color:red; background-color:pink",on:{click:function(){return n.$refs.tree.delNode(e.parent,e)}}},["delete"])])},asyncLoad:function(e){var t=this;return c()(o.a.mark(function n(){return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.t0=t.$refs.tree,n.t1=e,n.next=4,t.$api.demo.getChild();case 4:n.t2=n.sent,n.t0.addNodes.call(n.t0,n.t1,n.t2);case 6:case"end":return n.stop()}},n,t)}))()},search:function(){this.$refs.tree.searchNodes(this.searchword)}}}},P1yf:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("FtnS"),o=n("72xj"),a=n("ngHh"),c=a(r.a,o.a,!1,null,null,null);t.default=c.exports}});
//# sourceMappingURL=0.bd232855e1aea9a25f4e.js.map