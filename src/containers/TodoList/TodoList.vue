<template>
  <div>
    <Header @add="addUndoItem" />
    <UndoList :list="undolist" @delete="handleItemDelete" @status="changeStatus" @reset="resetStatus"
      @change="changeItemValue"/>
  </div>
</template>

<script>
import axios from 'axios'
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
  mounted () {
    setTimeout(() => {
      axios.get('/getUndoList.json').then((res) => {
        this.undolist = res.data
      }).catch(e => {
        console.log(e)
      })
    })
  },
  methods: {
    addUndoItem (value) {
      this.undolist.push({
        status: 'div',
        value
      })
    },
    handleItemDelete (index) {
      this.undolist.splice(index, 1)
    },
    changeStatus (index) {
      this.undolist = this.undolist.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            status: 'input'
          }
        } else {
          return item
        }
      })
    },
    resetStatus () {
      this.undolist = this.undolist.map((item, idx) => {
        return {
          ...item,
          status: 'div'
        }
      })
    },
    changeItemValue (obj) {
      this.undolist = this.undolist.map((item, index) => {
        if (index === obj.index) {
          return {
            ...item,
            value: obj.value
          }
        }
        return item
      })
    }
  }
}
</script>
