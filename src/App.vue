<template>
  <div id="app">
    <TodoList />
  </div>
</template>

<script>
import TodoList from './containers/TodoList/TodoList.vue'
// import NotFoundPage from './containers/NotFoundPage/NotFoundPage.vue'

export default {
  name: 'App',
  components: {
    TodoList
    // NotFoundPage
  }
}
</script>

<style lang="stylus">
  * {
    margin: 0;
    padding: 0;
  }
  body {
    background: #CDCDCD;
  }
</style>
