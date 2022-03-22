<template>
  <form @submit.prevent="addBoard" class="d-flex flex-column board-form" >
    <div class="row">
      <div class="col-12">
        <div class="col-7">
          <input type="text" v-model="board.name">
        </div>
        <div class="col-3">
          <input type="color" v-model="board.color">
        </div>
      </div>
    </div>

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
      color:'',
      name:''
    })
    let store = useStore()
    let addBoard=()=>{
      store.commit('boardCreated', {
        id:board.id,
        color:board.color,
        name: board.name
      })
      store.commit('historyBoard')
      board.id++
      board.name=''
      board.color='black'
      console.log(board.name, board.id)
    }
    return{
      board,
      addBoard
    }

  }
}

</script>

<style>
.board-form{
  max-width: 200px;
  width: 100%;
}
</style>