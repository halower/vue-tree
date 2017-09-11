<template>
    <div>
        <h1>
            coming soon, new tree
        </h1>
        <app-tree :treeData.sync="treeData"></app-tree>
    </div>
</template>
<script>
import { convertTreeToArray } from '@/components/dataConverter'
var data = {
        name: 'My Tree',
        id: 0,
        parentId: null,
        children: [{
            name: 'hello',
            parentId: 0,
            id: 1
        },
        {
            name: 'wat',
            parentId: 0,
            id: 2
        },
        {
            name: 'child folder',
            parentId: 0,
            id: 3,
            children: [{
                name: 'child folder',
                parentId: 3,
                id: 4,
                children: [{
                    name: 'hello',
                    parentId: 4,
                    id: 5
                },
                {
                    name: 'wat',
                    parentId: 4,
                    id: 6
                }]
            },
            {
                name: 'hello',
                parentId: 3,
                id: 7
            },
            {
                name: 'wat',
                parentId: 3,
                id: 8
            },
            {
                name: 'child folder',
                parentId: 3,
                id: 9,
                children: [{
                    name: 'hello',
                    parentId: 9,
                    id: 10
                },
                {
                    name: 'wat',
                    parentId: 9,
                    id: 11
                }]
            }]
        }]
    }

var data2 = [
    {
        name: "My Tree",
        id: 0,
        parentId: null
    },
    {
        name: "hello",
        parentId: 0,
        id: 1
    },
    {
        name: "wat",
        parentId: 0,
        id: 2
    },
    {
        name: "child folder",
        parentId: 0,
        id: 3
    },
    {
        name: "child folder",
        parentId: 3,
        id: 4
    },
    {
        name: "hello",
        parentId: 4,
        id: 5
    },
    {
        name: "wat",
        parentId: 4,
        id: 6
    },
    {
        name: "hello",
        parentId: 3,
        id: 7
    },
    {
        name: "wat",
        parentId: 3,
        id: 8
    },
    {
        name: "child folder",
        parentId: 3,
        id: 9
    },
    {
        name: "hello",
        parentId: 9,
        id: 10
    },
    {
        name: "wat",
        parentId: 9,
        id: 11
    }]

// console.log(JSON.stringify(convertTreeToArray(data[0], { needDelete: true })))
import AppTree from '@/components/tree'
export default {
    name: "app",
    components: { AppTree },
    data() {
        return {
          treeData: data2,
          //treeData: data
        }
    }
}
</script>

