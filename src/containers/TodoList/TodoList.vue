<template>
  <div>
    <Header @add="addUndoItem" />
    <UndoList :list="undolist" @delete="handleItemDelete"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import UndoList from './components/UndoList.vue'

export default {
  name: 'TodoList',
  components: { Header, UndoList },
  data () {
    return {
      undolist: []
    }
  },
  methods: {
    addUndoItem (value) {
      this.undolist.push(value)
    },
    handleItemDelete (index) {
      this.undolist.splice(index, 1)
    }
  }
}
</script>
