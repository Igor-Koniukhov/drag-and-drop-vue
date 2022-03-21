<template>
  <div
      class='drag-el'
      v-for='item in listOne'
      :key='item.title'
      draggable="true"
      @dragstart="startDrag($event, item)"
  >
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
  name: "Board"
}
</script>

<style scoped>

</style>