<template>
 <div>
   <h3>{{$t('test.title')}}</h3>
    <h2>{{$t('test.currentcode')}}：{{code}}</h2>
    <h2>{{$t('test.precode')}}: {{precode}}</h2>
    <button @click='changeCode'>{{$t('test.changecode')}}</button>
    <button @click='alert'>{{$t('test.simplealert')}}</button>
    <select v-model='lang' @change='$i18n.locale = lang'>
       <option value='zh'>中文</option>
       <option value='en'>Engilsh</option>
    </select>
    <tree ref='tree' :asyncLoad='asyncLoad' :async='async' :data='treeData' :multiple='true' :tpl='tpl' :halfcheck='true'></tree>
 </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Tree from '@/components/vtree/tree'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('test')

export default {
  name: 'HelloWorld',
  data () {
    return {
      async: 'false',
      lang: 'zh',
      treeData: [{
        title: '一级节点',
        expanded: true,
        selected: true,
        children: [{
          title: '二级节点1',
          expanded: true,
          children: [{
            title: '三级节点1-1'
          }, {
            title: '三级节点1-2'
          }, {
            title: '三级节点1-3'
          }]
        }, {
          title: '二级节点2',
          children: [{
            title: "<span style='color: red'>三级节点2-1</span>"
          }, {
            title: "<span style='color: red'>三级节点2-2</span>"
          }]
        }]
      }]
    }
  },
  computed: {
    ...mapState(['code']),
    ...mapGetters(['precode'])
  },
  methods: {
    ...mapActions(['changeCode']),
    alert () {
      this.$modal.show('dialog', {
        title: this.$t('test.alerttitle'),
        text: `<span style='color:red'>${this.$t('test.code')}</span> = ${this
          .code}`,
        buttons: [
          {
            title: this.$t('test.ok'),
            handler: () => {
              alert(this.$t('test.welcome'))
            }
          },
          { title: this.$t('test.close') }
        ]
      })
    },
    tpl (node) {
      return <span>
      <button style='color:red; background-color:pink' onClick={() => this.$refs.tree.addNode(node, {title: '哈哈'})}>添加</button>
      <button style='color:red; background-color:pink' onClick={() => this.$refs.tree.delNode(node.parent, node)}>删除</button>
      </span>
    },
    async asyncLoad (node) {
      this.$refs.tree.addNodes(node, await this.$api.demo.getChild())
    }
  },
  components: { Tree }
}
</script>
