<template>
    <div id="app" style="width:300px; margin: auto auto;">
        <tree
                ref='tree'
                :treeData="treeData"
                :options="options"
                @node-click="itemClick"

        />
    </div>
</template>
<script>
    import Vue from 'vue'
    import axios from 'axios'
    import Tree from './components/tree/tree.vue'
    let that = null
    export default {
        name: 'app',
        data () {
            that = this
            return {
                options: {
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
                treeData: []
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
                    item.key = parentKey + '-' + i.toString()
                    return item
                })
                return treeData
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
                        searched: false
                    },
                    {
                        id: 2,
                        label: '一级节点',
                        open: false,
                        checked: false,
                        nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
                        parentId: null,
                        visible: true,
                        searched: false
                    }
                ]

                this.treeData = this.generateKey(treeData, 0)
            },
            async loadingChild (node, index) {
                try {
                    let tem
                    let postions = node.key.split('-')
                    let data = await axios.get(' http://172.16.0.104:8082/child.json')

                    for (let [index, item] of postions.entries()) {
                        switch (index) {
                            case 0:
                                break;
                            case 1:
                                tem = this.treeData[item]
                                break;
                            default:
                                tem = tem.children[item]
                        }
                    }
                    // set Children
                    Vue.set(tem, 'children', this.generateKey(data.data, node.key) )

                    Promise.resolve(data)
                } catch (e) {
                    Promise.reject(e)
                }
            },
            itemClick (node) {
                console.log(node.key)
            }
        },
        components: {
            Tree
        }
    }
</script>
