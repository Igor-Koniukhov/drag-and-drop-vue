<template>
  <div class="container">
    <div class="row">
      <TaskForm class="task-form col-lg-2"/>
      <div
          class='drop-zone col-3'
          @drop="onDrop($event, 1)"
          @dragover.prevent
          @dragenter.prevent
      >
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
        </div>
      </div>
      <div
          class='drop-zone col-lg-3'
          @drop="onDrop($event, 2)"
          @dragover.prevent
          @dragenter.prevent
      >
        <div
            class="drag-el"
            v-for="item in listTwo"
            :key="item.title"
            draggable="true"
            @dragstart="startDrag($event, item)"

        >
          <p>{{ item.title }}</p>
          <p>{{ item.people }}</p>
          <p>{{ item.date }}</p>
          <p>{{ item.description }}</p>
        </div>
      </div>
      <div
          class='drop-zone col-lg-3'
          @drop="onDrop($event, 3)"
          @dragover.prevent
          @dragenter.prevent
      >
        <div
            class="drag-el"
            v-for="item in listThree"
            :key="item.title"
            draggable="true"
            @dragstart="startDrag($event, item)"
        >
          <p>{{ item.title }}</p>
          <p>{{ item.people }}</p>
          <p>{{ item.date }}</p>
          <p>{{ item.description }}</p>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import {computed, reactive} from "vue";
import TaskForm from "@/components/TaskForm";
import {useStore} from "vuex";


export default {
  components: {
    TaskForm
  },
  setup() {
    const store = useStore()
    let items = reactive(store.getters.tasksHistory)



    let startDrag = (evt, item) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    }
    let onDrop = (evt, list) => {
      const itemID = evt.dataTransfer.getData('itemID')
      const item = items.find(item => item.id == itemID)
      item.list = list
      store.dispatch('saveTasksOnDrop')
    }
    const listOne = computed(() => {
      return items.filter(item => item.list === 1)
    });
    const listTwo = computed(() => {
      return items.filter(item => item.list === 2)
    });
    const listThree = computed(() => {
      return items.filter(item => item.list === 3)
    });

    return {
      items,
      startDrag,
      onDrop,
      listOne,
      listTwo,
      listThree
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