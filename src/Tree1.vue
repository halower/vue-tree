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

    const Tree1 = {
        name: 'Tree1',
        data: function () {
            return {
                treeData: [
                    {
                        id: 1,
                        label: '一级节点',
                        key: '0-0',
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
                                key: '0-0-0',
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
                        key: '0-1',

                        open: false,
                        checked: false,
                        nodeSelectNotAll: false,
                        parentId: null,
                        visible: true,
                        searched: false
                    },
                    {
                        id: 3,
                        key: '0-2',

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
            }
        },
        methods: {
            itemClick (node) {
                console.log(node.id);
            }
        }
    }

    export default Tree1
</script>

<style lang="scss" scoped>

</style>
