<template>
    <ZTree
        ref='tree'
        :treeData="treeData"
        :options="options"
        @node-click="itemClick"
        :key="1"

    />
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import {ZTree} from './index'
    //
    //  import {ZTree} from './../dist/vue2-tree.min'
    //  import './../dist/vue2-tree.min.css'
    Vue.use(ZTree)

    const Tree0 = {
        name: 'Tree0',
        data: function () {
            return {
                treeData: [
                    {
                        id: 1,
                        label: '一级节点1',
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
                                nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
                                parentId: 1,
                                visible: true,
                                searched: false
                            },
                            {
                                id: 1002,
                                label: '二级节点2',
                                open: false,
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
                        checked: false,
                        nodeSelectNotAll: false,
                        parentId: null,
                        visible: true,
                        searched: false
                    }
                ],
                options: {
                    showCheckbox: false,
                    halfCheck: false, //控制父框是否需要半钩状态
                    showSearch: true,
                    search: {
                        useInitial: false,
                        useEnglish: false,
                        customFilter: null
                    }
                },
            }
        },
        methods: {
            itemClick (node) {
                console.log(node.id);
            }
        }
    }

    export default Tree0
</script>

<style scoped>

</style>
