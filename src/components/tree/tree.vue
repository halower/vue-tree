<template>
    <div class="halo-tree">
        <div class="input" v-if="options.showSearch">
            <input type="text" v-model="search">
            <span class="icon search"></span>
        </div>
        <div class="root">
            <i
                class="icon-color  icon iconfont"
                :class="[itemsShow ? 'icon-jian-fangkuang': 'icon-jia-fangkuang' ]"
                @click="rootIconClick"
            >

            </i>
            我的组织
        </div>
        <tree-node
                :treeData='store.root'
                :options="options"
                @handlecheckedChange="handlecheckedChange"
                v-show="itemsShow"
        ></tree-node>
    </div>
</template>
<script>
    import TreeNode from './tree-node.vue'
    import TreeStore from './tree-store'

    export default {
        name: 'tree',
        props: {
            treeData: [Array],
            options: [Object]
        },
        data () {
            return {
                itemsShow: true,
                search: null,
                store: {
                    root: [],
                    last: null
                }
            }
        },
        created () {
            this.isTree = true
            this.store = new TreeStore({
                root: (this.treeData || []).slice(0),
                last: null
            })
        },
        watch: {
            search: function (val) {
                this.store.filterNodes(val, this.options.search)
            },
            treeData: function (data) {
                this.store = new TreeStore({
                    root: (this.treeData || []).slice(0),
                    last: null
                })
            }
        },
        methods: {
            rootIconClick () {
                this.itemsShow = !this.itemsShow
            },
            handlecheckedChange (node) {
                if (this.options.halfCheckedStatus) {
                    this.store.changeCheckHalfStatus(node)
                } else {
                    this.store.changeCheckStatus(node)
                }
                this.$emit('handlecheckedChange', node)
            },
            getSelectedNodes () {
                const allnodes = this.store.datas
                let selectedNodes = []
                for (let [, node] of allnodes) {
                    if (node.checked) {
                        selectedNodes.push(node)
                    }
                }
                return selectedNodes
            },
            getSelectedNodeIds () {
                const allnodes = this.store.datas
                let selectedNodeIds = []
                for (let [, node] of allnodes) {
                    if (node.checked) {
                        selectedNodeIds.push(node.id)
                    }
                }
                return selectedNodeIds
            }
        },
        components: {TreeNode}
    }
</script>
<style scoped>

    @font-face {font-family: "iconfont";
        src: url('./../../assets/iconfont/iconfont.eot?t=1499924440773'); /* IE9*/
        src: url('./../../assets/iconfont/iconfont.eot?t=1499924440773#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('./../../assets/iconfont/iconfont.woff?t=1499924440773') format('woff'), /* chrome, firefox */
        url('./../../assets/iconfont/iconfont.ttf?t=1499924440773') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
        url('./../../assets/iconfont/iconfont.svg?t=1499924440773#iconfont') format('svg'); /* iOS 4.1- */
    }

    .iconfont {
        font-family:"iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-jia-fangkuang:before { content: "\e8de"; }

    .icon-jian-fangkuang:before { content: "\e8e0"; }

    .icon-loading:before { content: "\e647"; }

    .icon-color {
        color: #108ee9;
    }

    * {
        font-size: 13px;
        font-family: '\5FAE\8F6F\96C5\9ED1'
    }
    .root {
        position: relative;
        left: -15px;
    }
    .input {
        width: 100%;
        position: relative;
    }

    .input span {
        position: absolute;
        top: 7px;
        right: 5px;
    }

    .input input {
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        border-radius: 5px;
        height: 25px;
        margin-top: 2px;
    }

    .input input:focus {
        border: none;
    }

    .icon {
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
    }

    .search {
        width: 14px;
        height: 14px;
        background-image: url("../../assets/search.png");
    }
</style>

