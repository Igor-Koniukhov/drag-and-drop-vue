<template>
  <div class="container">
    <div class="row">
      <TaskForm class="task-form col-lg-2"/>
      <board
          v-for="board in boards"
          :key="board.id"
          :board="board"
          @drop="onDrop($event, board.id)"
          @dragover.prevent
          @dragenter.prevent
      >
      </board>
    </div>
  </div>
</template>
<script>
import { reactive} from "vue";
import TaskForm from "@/components/TaskForm";
import Board from "@/components/Board"
import {useStore} from "vuex";


export default {
  components: {
    TaskForm,
    Board,

  },
  setup() {
    const store = useStore()
    const boards = reactive([
      {id:1,
      name: "created"},
      {id:2,
      name: "in progress"},
      {id:3,
      name: "accepted"}
    ])
    let items = reactive(store.getters.tasksHistory)

    let onDrop = (evt, list) => {
      const itemID = evt.dataTransfer.getData('itemID')
      const item = items.find(item => item.id == itemID)
      item.list = list
      store.dispatch('saveTasksOnAction')
    }
    return {
      items,
      onDrop,
      boards
    }
  }
}
</script>

<style lang="scss">
.task-form {
  backgrond-color: #f3f3f3;
  box-shadow: 2px 3px 3px 3px rgba(0, 0, 0, .2);
  margin: 3px 3px 3px 3px;

}

.drop-zone {
  background-color: green;
  margin: 3px 3px 3px 3px;
  padding: 10px;

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