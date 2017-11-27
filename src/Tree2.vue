<template>
    <ZTree
        ref='tree'
        :treeData="treeData1"
        :options="options1"
        @node-click="itemClick1"
        @add-node="addNode"
        :key="2"

    >
    </ZTree>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import {ZTree, generateKey, getParentNode } from './index'
    //  import {ZTree} from './../dist/vue2-tree.min'
    //  import './../dist/vue2-tree.min.css'
    Vue.use(ZTree)

    const Tree2 = {
        name: 'Tree2',
        data: function () {
            return {
                options1: {
                    showCheckbox: false,
                    halfCheck: false,//控制父框是否需要半钩状态

                    lazy: true,
                    load: this.loadingChild,

                    showSearch: false,

                    rootName: '我的组织',

                    iconClass: {
                        close: 'icon-youjiantou',
                        open: 'icon-xiajiantou',
                        add: 'icon-add'
                    },
                    iconStyle: {
                        color: '#108ee9'
                    },

                    dynamicAdd: true,
                    // function  handle display add button
                    // return true or false
                    dynamicAddFilter: (node) => {
                        if (node.type === 1 || node.type === 2) {
                            return true
                        }
                        return false
                    },
                    // function handle add node; the new node must have `dynamicAdd` property
                    // the tree component rely on this show editor
                    // return Promise
                    dynamicAddNode: this.addNode,
                    // function handle save node; the new node must have `dynamicSaveNode` property
                    // the tree component rely on this save node
                    // return Promise
                    dynamicSaveNode: this.saveNode,
                    // function handle
                    // return String
                    leafIcon: this.leafIcon,

                    search: {
                        useInitial: true,
                        useEnglish: false,
                        customFilter: null
                    }
                },
                treeData1: []
            }
        },
        mounted () {
            this.loadTreeData();
        },
        methods: {
            loadTreeData: function () {
                let treeData = [
                    {
                        id: 1,
                        label: '一级节点1',
                        type: 1,
                        open: false,
                        checked: false,
                        nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
                        parentId: null,
                        visible: true,
                        searched: false,
                        children: [
                            {
                                id: 1001,
                                label: '二级节点1',
                                open: false,
                                checked: false,
                                nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
                                parentId: 1,
                                visible: true,
                                searched: false
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: '一级节点2',
                        open: false,
                        type: 2,
                        checked: false,
                        nodeSelectNotAll: false,
                        parentId: null,
                        visible: true,
                        searched: false
                    },
                    {
                        id: 3,
                        label: '一级节点3',
                        open: false,
                        type: 3,
                        checked: false,
                        nodeSelectNotAll: false,
                        parentId: null,
                        visible: true,
                        searched: false,
                        leaf: true
                    },
                    {
                        id: 4,
                        label: '一级节点4',
                        open: false,
                        type: 4,
                        checked: false,
                        nodeSelectNotAll: false,
                        parentId: null,
                        visible: true,
                        searched: false
                    }
                ]
//                this.treeData1 = generateKey(treeData, 0);
                this.treeData1 = treeData

            },
            async loadingChild (node, index) {
                try {
//          let data = await axios.get('http://localhost:8082/child.json', {responseType: 'json'});
                    let data = await new Promise((resolve, reject) => {
                        setTimeout(() => {
                            let d = [
                                {
                                    "id": 1,
                                    "label": "节点 1",
                                    "open": false,
                                    "checked": false,
                                    "nodeSelectNotAll": false,
                                    "parentId": null,
                                    "visible": true,
                                    "searched": false
                                },
                                {
                                    "id": 2,
                                    "label": "节点 2",
                                    "open": false,
                                    "checked": false,
                                    "nodeSelectNotAll": false,
                                    "parentId": null,
                                    "visible": true,
                                    "searched": false
                                }
                            ]
                            resolve(d)
                        }, 1000)
                    })
                    let tem = getParentNode(node, this.treeData1)

                    // set Children
//                    Vue.set(tem, 'children', generateKey(data, node.key));
                    Vue.set(tem, 'children', data);

                    Promise.resolve(data);
                } catch (e) {
                    Promise.reject(e);
                }
            },


            itemClick1 (node) {
                console.log(node.key);
            },
            async addNode (item) {
                let parent = getParentNode(item, this.treeData1)
                let node = {
                    id: 2,
                    label: '一级节点',
                    open: false,
                    checked: false,
                    nodeSelectNotAll: false,
                    parentId: null,
                    visible: true,
                    searched: false
                }
                if (!item.hasOwnProperty('children') || item.children.length === 0) {
                    await this.loadingChild(parent)
                }
                parent.open = true

                parent.children.splice(0, 0, Object.assign({}, { dynamicAdd: true, loaded: true }, node))

//                generateKey(parent.children, parent.key) // regenerate key

                return Promise.resolve(true)

            },
            async saveNode (item, e) {
                if (!e.target.value) {
                    return
                }

                return new Promise((resolve, reject) => {
                    // todo sent data to sever
                    delete item.dynamicAdd // 删除属性
                    Vue.set(item, 'label', e.target.value)
                    e.target.value = ''
                    setTimeout(() => {
                        resolve(item)
                    }, 1000)
                })


            },
            /**
             * 叶子结点 的 icon class
             * @param node
             * @returns {*}
             */
            leafIcon (node) {
                // filter type and return icon class

                if (node.type === 1 || node.type === 2) {
                    return ''
                }
                return 'icon-square'
            }

        }
    }

    export default Tree2
</script>

<style scoped>

</style>
