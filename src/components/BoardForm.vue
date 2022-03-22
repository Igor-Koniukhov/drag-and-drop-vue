<template>
  <form @submit.prevent="addBoard" >
    <input type="text" v-model="board.name">
    <button type="submit" class="btn-success btn-sm">Board+</button>
  </form>
</template>

<script>
import {useStore} from "vuex";
import {reactive} from "vue";

export default {
  name: "BoardForm",
  setup(){
    const board = reactive( {
      id:parseInt(localStorage.getItem('lastBoardId')) + 1 || 4,
      name:''
    })
    let store = useStore()
    let addBoard=()=>{
      store.commit('boardCreated', {
        id:board.id,
        name: board.name
      })
      store.commit('historyBoard')
      board.id++
      board.name=''
      console.log(board.name, board.id)
    }
    return{
      board,
      addBoard
    }

  }
}

</script>

<style scoped>

</style>