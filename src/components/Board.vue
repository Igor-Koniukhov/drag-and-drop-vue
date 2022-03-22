<template>
  <div  class='drop-zone col-3'>
    <p class="board-name">{{ board.name }}</p>
    <task
        class="drag-el"
        v-for="item in list"
        :key="item.title"
        :item="item"

    ></task>
  </div>
</template>

<script>
import {computed, reactive} from "vue";
import {useStore} from "vuex";
import Task from "@/components/Task"

export default {
  name: "Board",
  components: {
    Task
  },
  props: ["board"],

  setup(props) {
    const store = useStore()
    let items = reactive(store.getters.tasksHistory)

    const list = computed(() => {
      return items.filter(item => item.list === props.board.id)
    });

    return {
      list
    }
  }
}
</script>

<style>
.drop-zone {
  background-color: green;
  margin: 3px 3px 3px 3px;
  padding: 10px;
}
.board-name{
  text-transform: uppercase;
}
</style>