<template>
  <div draggable="true"
       :index="index"
       @dragstart="startDragTask($event, task)">
    <p>{{ task.title }}</p>
    <p>{{ task.people }}</p>
    <p>{{ task.date }}</p>
    <p>{{ task.description }}</p>
    <span>
            <a href="#!" @click="removeTask">
              <i class="bi bi-trash"></i>
            </a>
          </span>
  </div>
</template>

<script>
import {useStore} from "vuex";


export default {
  name: "Task",
  props: ["task", "index"],
  setup(props) {
    let store = useStore()
    let startDragTask = (e, task) => {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemID', task.id)
      e.dataTransfer.setData('taskIndex', props.index)
    }

     let removeTask =  () =>{
      console.log("removed", props.task.id)
      store.dispatch('removeTask', {
        id: props.task.id
      })
       window.location.reload()
    }
    return {
      startDragTask,
      removeTask,
    }
  }
}
</script>

<style scoped>

</style>