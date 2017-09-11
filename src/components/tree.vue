<template>
    <ul>
        <li>
            <div :class="{bold: isFolder}" @click="toggle" @dblclick="changeType">
                {{inputData.name}}
                <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
            </div>
            <ul v-show="open" v-if="isFolder">
                <app-tree class="item" :key="data.id" v-for="data in inputData.children" :treeData.sync="data"></app-tree>
                <li class="add" @click="addChild">+</li>
            </ul>
        </li>
    </ul>
</template>
<script>
import { convertArrayToTree } from './dataConverter'
export default {
    name: 'app-tree',
    props: {
        /**
         * @Input treeData - the treeData passed to us 
         **/
        treeData: [Array, Object]
    },
    data: function() {
        return {
            open: false
        }
    },
    computed: {
        isFolder: function() {
            return this.inputData.children && this.inputData.children.length
        },
        inputData: {
            get: function() {
                if (Array.isArray(this.treeData)) {
                    return convertArrayToTree(this.treeData, {})[0];
                } else {
                    return this.treeData;
                }
            },
            set: function(data) {
                this.treeData = data
                console.log('new data' + JSON.stringify(data))
            }
        }
    },
    methods: {
        toggle: function() {
            if (this.isFolder) {
                this.open = !this.open
            }
        },
        changeType: function() {
            if (!this.isFolder) {
                Vue.set(this.inputData, 'children', [])
                this.addChild()
                this.open = true
            }
        },
        addChild: function() {
            this.inputData.children.push({ name: 'new stuff', parentId: this.inputData.id })
            this.inputData = Object.assign({}, this.inputData)
        }
    }
}
</script>
<style>
.item {
    cursor: pointer;
}

.bold {
    font-weight: bold;
}

ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
}
</style>
