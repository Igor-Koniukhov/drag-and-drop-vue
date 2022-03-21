<template>
  <div draggable="true"
       @dragstart="startDrag($event, item)" >
    <p>{{ item.title }}</p>
    <p>{{ item.people }}</p>
    <p>{{ item.date }}</p>
    <p>{{ item.description }}</p>
    <span>
            <a href="#!">
              <i class="bi bi-trash"></i>
            </a>
          </span>
  </div>
</template>

<script>
export default {
  name: "Task",
  props:["item"],
  setup(){
    let startDrag = (evt, item) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    }
    return{
        startDrag
    }
  }
}
</script>

<style scoped>

</style>