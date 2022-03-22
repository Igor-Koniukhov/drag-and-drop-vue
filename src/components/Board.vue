<template>
  <div class='drop-zone col'>
    <p class="board-name">{{ board.name }}</p>
    <task
        class="drag-el"
        v-for="item in list"
        :key="item.title"
        :item="item"

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
  props: ["board"],

  setup(props) {
    const store = useStore()
    let items = store.getters.tasksHistory
    let width=25
    let height=25

    let list = computed(() => {
      return items.filter(item => item.list === props.board.id)
    });
    let removeBoard = () => {
      console.log(props.board.id)
      store.dispatch('removeBoard', {
        id: props.board.id
      })
      store.dispatch('saveBoardsOnAction')
      window.location.reload()
    }
    return {
      list,
      removeBoard,
      width,
      height,
    }
  }
}
</script>

<style lang="scss">
.drop-zone {
  position: relative;
  background-color: green;
  margin: 3px 3px 3px 3px;
  padding: 10px;
  min-height: 435px;
}

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