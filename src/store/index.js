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
        tasks: JSON.parse(localStorage.getItem('tasksList')) || [],
        board:{
            id: parseInt(localStorage.getItem('lastBoardId')) + 1 || 4,
            name:''
        },
        boards: JSON.parse(localStorage.getItem('boardsList')) || [
            {id:1,
                name: "created"},
            {id:2,
                name: "in progress"},
            {id:3,
                name: "accepted"}]
    },
    mutations: {
        taskCreated: (state, task) => {
            state.task = task
            localStorage.setItem('lastId', task.id)
        },
        historyTasks: (state) => {
            state.tasks.push(state.task)
            localStorage.setItem('tasksList', JSON.stringify(state.tasks))
        },
        updateListOfTasks: (state, tasks)=>{
            state.tasks=tasks
        },
        boardCreated:(state, board)=>{
            state.board=board
            localStorage.setItem('lastBoardId', board.id)
        },
        historyBoard:(state)=>{
            state.boards.push(state.board)
            localStorage.setItem('boardsList', JSON.stringify(state.boards))
        },
        updateListOfBoards: (state, boards)=>{
            state.boards = boards
        }
    },
    actions: {
        saveTasksOnAction() {
            localStorage.setItem('tasksList', JSON.stringify(this.state.tasks))
        },
        removeTask(context, payload){
            this.state.tasks=this.state.tasks.filter((item)=>{
                return item.id != payload.id
            });
            localStorage.setItem('tasksList', JSON.stringify(this.state.tasks))
            context.commit('updateListOfTasks',this.state.tasks)
        },
        saveBoardsOnAction(){
            localStorage.setItem('boardsList', JSON.stringify(this.state.boards))
        },
        removeBoard(context, payload){
            console.log(payload.id)
            this.state.boards = context.state.boards.filter((item)=>{
                console.log(item.id, payload.id)
                return item.id != payload.id
            });

        }
    },
    modules: {},
    getters: {
        tasksHistory: state => state.tasks,
        createdTask: state => state.task,
        boardHistory: state => state.boards,
    }
})
