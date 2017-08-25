<template>
    <ZTree
        ref='tree'
        :treeData="treeData1"
        :options="options1"
        @node-click="itemClick1"
        @add-node="addNode"
        :key="3"

    >
    </ZTree>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import {ZTree} from './index'
    //  import {ZTree} from './../dist/vue2-tree.min'
    //  import './../dist/vue2-tree.min.css'
    Vue.use(ZTree)

    const Tree3 = {
        name: 'Tree3',
        data: function () {
            return {
                options1: {
                    showCheckbox: true,
                    halfCheck: true, //控制父框是否需要半钩状态

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
            /**
             * generate key 0-1-2-3
             * this is very important function for now module
             * @param treeData
             * @param parentKey
             * @returns {Array}
             */
            generateKey (treeData = [], parentKey) {
                treeData = treeData.map((item, i) => {
                    item.key = parentKey + '-' + i.toString();

                    if (item.hasOwnProperty('children') && item.children.length > 0) {
                        this.generateKey(item.children, item.key)
                    }

                    return item;
                })
                return treeData;
            },
            /**
             * get parent node
             * @param node { Object }
             * @param treeData { Array }
             * @returns { Object }
             */
            getParentNode (node, treeData) {
                let tem;
                let postions = node.key.split('-');
                for (let [index, item] of postions.entries()) {
                    switch (index) {
                        case 0:
                            break;
                        case 1:
                            tem = treeData[item];
                            break;
                        default:
                            tem = tem.children[item];
                    }
                }
                return tem
            },
            loadTreeData: function () {
                let treeData = [
                    {
                        id: 1,
                        label: '一级节点',
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
                                label: '2级节点',
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
                        label: '一级节点',
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
                        label: '一级节点',
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
                        label: '一级节点',
                        open: false,
                        type: 4,
                        checked: false,
                        nodeSelectNotAll: false,
                        parentId: null,
                        visible: true,
                        searched: false
                    }
                ]

//                this.treeData1 = this.generateKey(treeData, 0);
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
                    let tem = this.getParentNode(node, this.treeData1)

                    // set Children
//                    Vue.set(tem, 'children', this.generateKey(data, node.key));
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
                let parent = this.getParentNode(item, this.treeData1)
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

//                this.generateKey(parent.children, parent.key) // regenerate key
                return Promise.resolve(parent.children)

            },
            async saveNode (item, e) {
                if (!e.target.value) {
                    return
                }
                try {
                    // todo sent data to sever
                    delete item.dynamicAdd // 删除属性

                    Vue.set(item, 'label', e.target.value)

                    e.target.value = ''

                    return Promise.resolve(item) // server return data with id
                } catch (e) {
                    return Promise.reject(e)
                }



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

    export default Tree3
</script>

<style  scoped>

</style>
