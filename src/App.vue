<template>
    <div>
        <div>
            <p>The item must have key field and must be unique，because Tree component use this for v-for directive set key property        </p>
            <p>recommended use 0-1-1-3 structure,</p>
            <p>and u'll see the benefits use this structure when u want dynamic modify treeData</p>
        </div>

        <div id="app" >
            <div>
                <h2>Default Tree</h2>
                <Tree1></Tree1>
            </div>
            <div>
                <h2> Lazy Load Tree</h2>
                <Tree2></Tree2>

            </div>
            <div>
                <h2>Other</h2>

            </div>
        </div>
    </div>

</template>
<script>
    import Tree1 from './Tree1'
    import Tree2 from './Tree2'

    export default {
        name: "app",
        data () {
            return {

            }
        },
        components: {
            Tree1,
            Tree2
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
        padding: 20px 20px;
        flex-shrink: 1;
        margin: 0 auto;
        justify-content: flex-start;
        align-content: flex-start;

    }
</style>
