<template>
  <div class="">
    粉丝管理
    <el-tiptap v-model="content"
      :extensions="extensions"></el-tiptap>
  </div>
</template>

<script>
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList
} from 'element-tiptap'
export default {
  name: 'fans',
  components: { 'el-tiptap': ElementTiptap },
  props: {},
  data () {
    return {
      content: '',
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList()
      ]
    }
  },

  computed: {},

  created () {},

  mounted () {},

  methods: {},

  watch: {}

}

</script>
<style scoped lang="less">

</style>
