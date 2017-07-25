<template>
    <div>
        <div>
            <p>The item must have key field and must be unique，because Tree component use this for v-for directive set key property        </p>
            <p>recommended use 0-1-1-3 structure,</p>
            <p>and u'll see the benefits use this structure when u want dynamic modify treeData</p>
        </div>

        <div id="app" >
            <div>
                <div>
                    <h2>Default Tree</h2>
                    <code>
                        showCheckbox: false,
                        halfCheckedStatus: false
                    </code>
                    <Tree0 :key="0"></Tree0>
                </div>
                <div>
                    <h2>Default Tree with checkbox</h2>
                    <code>
                        showCheckbox: true,
                        halfCheckedStatus: true
                    </code>
                    <Tree1 :key="1"></Tree1>
                </div>
            </div>
            <div>
                <div>
                    <h2> Lazy Load Tree</h2>
                    <Tree2 :key="2"></Tree2>

                </div>
                <div>
                    <h2> Lazy Load Tree with checkbox </h2>
                    <Tree3 :key="3"></Tree3>
                </div>
            </div>

        </div>
    </div>

</template>
<script>
    import Tree0 from './Tree0'
    import Tree1 from './Tree1'
    import Tree2 from './Tree2'
    import Tree3 from './Tree3'

    export default {
        name: "app",
        data () {
            return {

            }
        },
        components: {
            Tree0,
            Tree1,
            Tree2,
            Tree3
        }

    }
</script>
<style>
    #app {
        margin: 40px 40px;

    }
    #app > div {
        display: flex;
        width: 100%;
        padding: 20px 20px;
        flex-shrink: 1;
        margin: 0 auto;
        justify-content: flex-start;
        align-content: flex-start;

    }
    #app > div  > div {
        flex: 1;
        padding: 20px 20px;
        margin: 0 auto;

    }
</style>
