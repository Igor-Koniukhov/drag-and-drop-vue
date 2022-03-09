<template>
  <div class="task">
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" :class="{invalid: titleValidity === 'invalid'}" id="title"
               v-model.trim="task.title" @blur="validateInput">
        <small v-if="titleValidity==='invalid' ">Please enter valid data</small>
      </div>
      <div class="mb-3">
        <label for="people" class="form-label">People</label>
        <input type="number" class="form-control" :class="{invalid:peopleValidity ==='invalid'}" id="people"
               v-model.trim="task.people" @blur="validatePeople">
        <small v-if="peopleValidity==='invalid'">Please enter valid data</small>
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Date</label>
        <input type="date" class="form-control" :class="{invalid:dateValidity ==='invalid'}" id="date"
               v-model.trim="task.date" @blur="validateDate">
        <small v-if="dateValidity==='invalid'">Please enter valid data</small>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" :class="{invalid: descriptionValidity==='invalid'}" id="description"
                  v-model.trim="task.description" @blur="validateDescription" rows="3"></textarea>
        <small v-if="descriptionValidity==='invalid'">Please enter description of the task</small>
      </div>
      <button class="btn-success btn-sm mb-2 btn-custom" type="submit">Create task</button>
    </form>

  </div>
</template>

<script>

import { reactive, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "Row",
  setup() {
    let task = reactive({
      id:   parseInt(localStorage.getItem('lastId')) +1 ||  0,
      title: '',
      list: 1,
      people: null,
      date:'',
      description: ''
    })
    const store = useStore()
    let titleValidity = ref('pending')
    let taskValidity = ref('pending')
    let peopleValidity = ref('pending')
    let descriptionValidity = ref('pending')
    let dateValidity = ref('pending')
    let submitForm = () => {

      store.commit('taskCreated', {
        id: task.id,
        title: task.title,
        list: task.list,
        people: task.people,
        date: task.date,
        description: task.description,

      })
      store.commit('historyTasks')
      task.id++
      task.title = ''
      task.people = null
      task.date = ''
      task.description = ''


    }




    let validateInput = () => {
      if (task.title === '' || task.title.length < 4) {
        titleValidity.value = 'invalid'
      } else {
        titleValidity.value = 'valid'
      }
    }
    let validateTask = () => {
      if (task.description === '') {
        taskValidity.value = 'invalid'
      } else {
        taskValidity.value = 'valid'
      }
    }
    let validatePeople = () => {
      if (task.people === 0 || task.people === null || task.people.toString().length > 2) {
        peopleValidity.value = 'invalid'
      } else {
        peopleValidity.value = 'valid'
      }
    }
    let validateDate = ()=>{
      if (task.date===""){
        dateValidity.value='invalid'
      }else{
        dateValidity.value='valid'
      }
    }
    let validateDescription = () => {
      if (task.description === '') {
        descriptionValidity.value = 'invalid'
      } else {
        descriptionValidity.value = 'valid'
      }

    }
    return {
      submitForm,
      validateTask,
      validateInput,
      validatePeople,
      validateDescription,
      validateDate,
      titleValidity,
      taskValidity,
      peopleValidity,
      descriptionValidity,
      dateValidity,
      task,

    }

  }
}
</script>

<style>
.form-control.invalid {
  border: 1px solid red;
}

.btn-custom {
  border: unset;
  box-shadow: 2px 3px 3px 3px rgba(0, 0, 0, .2);
}
</style>