<template>
  <div>
    <Header @add="addUndoItem"/>
    <ul>
      <li v-for="(item, index) in undolist" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'TodoList',
  components: { Header },
  data () {
    return {
      undolist: []
    }
  },
  methods: {
    addUndoItem (value) {
      this.undolist.push(value)
    }
  }
}
</script>
