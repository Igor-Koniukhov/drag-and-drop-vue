<template>
  <div
      class='drop-zone col-3'
      @drop="onDrop($event, 1)"
      @dragover.prevent
      @dragenter.prevent
  >

  </div>
</template>

<script>
export default {
  name: "Task"
}
</script>

<style scoped>

</style>