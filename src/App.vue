<template>
    <div id="app" >
        <div>
           <h2>Default Tree</h2>
            <ZTree
                ref='tree'
                :treeData="treeData"
                :options="options"
                @node-click="itemClick"
                :key="1"

            />
        </div>
        <div>
            <h2> Lazy Load Tree</h2>
            <ZTree
                ref='tree'
                :treeData="treeData1"
                :options="options1"
                @node-click="itemClick"
                :key="2"

            />
        </div>
        <div>
            <h2>Other</h2>

        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import axios from 'axios';
    import {ZTree} from './index'
    //
    //  import {ZTree} from './../dist/vue2-tree.min'
    //  import './../dist/vue2-tree.min.css'
    Vue.use(ZTree)


    export default {
        name: "appp",
        data () {
            return {
                treeData: [
                    {
                        id: 1,
                        label: '一级节点',
                        open: false,
                        checked: false,
                        nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
                        parentId: null,
                        visible: true,
                        searched: false,
                        children: [
                            {
                                id: 1001,
                                label: '一级节点',
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
                        checked: false,
                        nodeSelectNotAll: false,
                        parentId: null,
                        visible: true,
                        searched: false
                    }
                ],
                options: {
                    showCheckbox: false,
                    halfCheckedStatus: false,//控制父框是否需要半钩状态

                    search: {
                        useInitial: true,
                        useEnglish: false,
                        customFilter: null
                    }
                },

                options1: {
                    showCheckbox: false,
                    halfCheckedStatus: false,//控制父框是否需要半钩状态

                    lazy: true,
                    load: this.loadingChild,
                    showSearch: false,

                    search: {
                        useInitial: true,
                        useEnglish: false,
                        customFilter: null
                    }
                },
                treeData1: []
            }
        },
        mounted: function () {
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
            loadTreeData: function () {
                let treeData = [
                    {
                        id: 1,
                        label: '一级节点',
                        open: false,
                        checked: false,
                        nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
                        parentId: null,
                        visible: true,
                        searched: false,
                        children: [
                            {
                                id: 1001,
                                label: '一级节点',
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
                        checked: false,
                        nodeSelectNotAll: false,
                        parentId: null,
                        visible: true,
                        searched: false
                    }
                ]

                this.treeData1 = this.generateKey(treeData, 0);
            },
            async loadingChild (node, index) {
                try {
                    let tem;
                    let postions = node.key.split('-');
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
                    for (let [index, item] of postions.entries()) {
                        switch (index) {
                            case 0:
                                break;
                            case 1:
                                tem = this.treeData1[item];
                                break;
                            default:
                                tem = tem.children[item];
                        }
                    }
                    // set Children
                    Vue.set(tem, 'children', this.generateKey(data, node.key));

                    Promise.resolve(data);
                } catch (e) {
                    Promise.reject(e);
                }
            },
            itemClick (node) {
                console.log(node.key);
            }
        }

    }
</script>
<style>
    #app {
        margin: 40px 40px;
        display: flex;
    }
    #app > div {
        width: 100%;
        flex-shrink: 1;
        margin: 0 auto;
        justify-content: flex-start;
        align-content: flex-start;

    }
</style>
