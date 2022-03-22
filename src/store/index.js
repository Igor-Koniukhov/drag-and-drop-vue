import {createStore} from 'vuex'

export default createStore({
    state: {
        task: {
            id: parseInt(localStorage.getItem('lastId')) + 1 || 0,
            title: '',
            list: 1,
            people: null,
            description: ''
        },
        tasks: JSON.parse(localStorage.getItem('tasksList')) || []
    },
    mutations: {
        taskCreated: (state, task) => {
            state.task = task
            localStorage.setItem('lastId', task.id)
        },
        historyTasks: (state) => {
            state.tasks.push(state.task)
            localStorage.setItem('tasksList', JSON.stringify(state.tasks))
        }
    },
    actions: {
        saveTasksOnAction(context) {
            context.commit('')
            localStorage.setItem('tasksList', JSON.stringify(this.state.tasks))
        },
        removeTask(context, payload){
            let id = payload.id
            this.state.tasks=this.state.tasks.filter((item)=>{
                return item.id != id
            });
            console.log(this.state.tasks, "taskId = ", id, this.state.tasks)
            localStorage.setItem('tasksList', JSON.stringify(this.state.tasks))
        }
    },
    modules: {},
    getters: {
        tasksHistory: state => state.tasks,
        createdTask: state => state.task
    }
})
