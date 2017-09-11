<template>
    <ul>
        <li>
            <div :class="{bold: isFolder}" @click="toggle" @dblclick="changeType">
                {{model.name}}
                <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
            </div>
            <ul v-show="open" v-if="isFolder">
                <app-tree class="item" :key="model.name" v-for="model in model.children" :model="model"></app-tree>
                <li class="add" @click="addChild">+</li>
            </ul>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'app-tree',
    props: {
        model: Object
    },
    data: function() {
        return {
            open: false
        }
    },
    computed: {
        isFolder: function() {
            return this.model.children &&
                this.model.children.length
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
                Vue.set(this.model, 'children', [])
                this.addChild()
                this.open = true
            }
        },
        addChild: function() {
            this.model.children.push({
                name: 'new stuff'
            })
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
