<template>
  <div draggable="true"
       @dragstart="startDrag($event, item)">
    <p>{{ item.title }}</p>
    <p>{{ item.people }}</p>
    <p>{{ item.date }}</p>
    <p>{{ item.description }}</p>
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
  props: ["item"],
  setup(props) {
    let store = useStore()
    let startDrag = (evt, item) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    }

     let removeTask =  () =>{
      console.log("removed", props.item.id)
      store.dispatch('removeTask', {
        id: props.item.id
      })
       window.location.reload()
    }

    return {
      startDrag,
      removeTask,
    }
  }
}
</script>

<style scoped>

</style>