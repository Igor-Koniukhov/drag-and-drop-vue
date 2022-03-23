<template>
  <div
      @dragstart="startDragBoard($event, indexOfBoard)"
  >
    <p class="board-name">{{ board.name }}</p>
    <task
        class="drag-el"
        v-for="(task, index) in listOfTasks"
        :index="index"
        :key="task.title"
        :task="task"
        :style="{background:board.color}"
    ></task>
    <div class="trash">
      <span v-if="board.name !=='created'">
            <a href="#!" @click="removeBoard">
             <trash-button
             :width="width"
             :height="height"
             />
            </a>
          </span>
    </div>

  </div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";
import Task from "@/components/Task"
import TrashButton from "@/components/TrashButton"

export default {
  name: "Board",
  components: {
    Task,
    TrashButton,
  },
  props: ["board", "indexOfBoard"],

  setup(props) {
    const store = useStore()
    let tasks = store.getters.tasksHistory
    let width=25
    let height=25

    let listOfTasks = computed(() => {
      return tasks.filter(task => task.list === props.board.id)
    });
    let startDragBoard = (e, index) => {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('boardIndex', index)
      console.log(index)
    }
    let removeBoard = () => {
      store.dispatch('removeBoard', {
        id: props.board.id
      })
      store.dispatch('saveBoardsOnAction')
      window.location.reload()
    }
    return {
      listOfTasks,
      removeBoard,
      width,
      height,
      startDragBoard
    }
  }
}
</script>

<style lang="scss">


.board-name {
  text-transform: uppercase;
}

.trash {
  position: absolute;
  bottom: 0;
  z-index: 10;

  &:hover {
    cursor: pointer;
  }
  a {
    color: white;
    width: 130px;
  }
}
</style>