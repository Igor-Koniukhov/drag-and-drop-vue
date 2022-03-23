<template>
  <div class="container">
    <board-form/>
    <div class="row"

    >
      <TaskForm class="task-form col-lg-2"/>
      <board
          class='drop-zone col'
          v-for="(board, index) in boards"
          :indexOfBoard="index"
          :key="board.id"
          :board="board"
          draggable="true"
          @drop="onDropTask($event, board.id)"
          @dragover.prevent
          @dragenter.prevent
      >
      </board>
    </div>
  </div>
</template>
<script>
import {reactive} from "vue";
import TaskForm from "@/components/TaskForm";
import Board from "@/components/Board"
import BoardForm from "@/components/BoardForm";
import {useStore} from "vuex";


export default {
  components: {
    TaskForm,
    Board,
    BoardForm,

  },
  setup() {
    const store = useStore()
    const boards = reactive(store.getters.boardHistory)
    let items = reactive(store.getters.tasksHistory)
    let index = ''
    function array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr; // for testing
    }

    let onDropBoard = (e, i) => {
      const boardIndex = e.dataTransfer.getData('boardIndex')
      const target = e.target.getAttribute('index')
      console.log("target :", target, " boardIndex :", boardIndex, i)
      console.log(boards[target], boards[boardIndex])
      boards.splice(target, 0,boards.splice(boardIndex,1)[0])

      //store.dispatch('saveTasksOnAction')
    }

    let onDropTask = (e, boardId) => {
      const itemID = e.dataTransfer.getData('itemID')
      const item = items.find(item => item.id == itemID)
      item.list = boardId
      store.dispatch('saveTasksOnAction')

      const target = e.target.getAttribute('index')
      const taskIndex = e.dataTransfer.getData('taskIndex')
      console.log(target, taskIndex)
      array_move(items, target, taskIndex)
    }

    return {
      items,
      onDropTask,
      boards,
      onDropBoard,
      index
    }
  }
}
</script>

<style lang="scss">

.drop-zone {
  position: relative;
  border: 1px solid red;
  background-color: green;
  margin: 3px 3px 3px 3px;
  min-height: 435px;
  z-index: 10;
 }
.task-form {
  backgrond-color: #f3f3f3;
  box-shadow: 2px 3px 3px 3px rgba(0, 0, 0, .2);
  margin: 3px 3px 3px 3px;
}
.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
}

</style>