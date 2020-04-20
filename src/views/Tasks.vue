<template>
    <main class="container">
        <h2>To-Do</h2>
        <div id="add-task">
            <div class="task row">
                <div class="col-md-10 task-text-row editing">
                    <div class="task-row row">
                        <div class="col-md-2">
                            <em class="fas fa-plus task-before"></em>
                        </div>
                        <div class="col-md-10 task-input-col">
                            <input type="text" v-model="taskText" @keyup="checkForEnterAdd" placeholder="Task..." id="new-task-input">
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="row btn-row">
                        <button @click="addTask"><em class="fas fa-plus"></em></button>
                    </div>
                </div>
            </div>
        </div>
        <div id="tasks" v-for="(task, index) in sortedTasks" :key="index">
            <div class="task row">
                <div class="col-md-10 task-text-row">
                    <div class="task-row row">
                        <div class="col-md-2">
                            <em class="far fa-circle task-before"></em>
                        </div>
                        <div class="col-md-10 task-input-col">
                            <input type="text" @keyup="checkForEnterSave" :class="(task.edit) ? 'editing' : ''" :disabled="!task.edit" :value="task.task" placeholder="Task..." :id="'task' + index">
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="row btn-row">
                        <button @click="editTask(task, index)" v-show="!task.edit"><em class="fas fa-edit"></em></button>
                        <button @click="storeEditTask" v-show="task.edit"><em class="fas fa-save"></em></button>
                        <button @click="deleteTask" v-show="task.edit"><em class="fas fa-trash"></em></button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import { store } from '../main'

    export default {
        name: 'Home',
        data() {
            return {
                taskText: '',
                store: store,
                currentEdit: {},
            }
        },
        methods: {
            addTask() {
                store.writeTask(this.taskText);
                this.taskText = '';
            },
            editTask(task, index) {
                this.currentEdit.task = task;
                this.currentEdit.index = index;
                task.edit = true;
                document.querySelector('#task' + index).focus();
            },
            deleteTask() {
                store.deleteTask(this.currentEdit.task);
            },
            storeEditTask() {
                const value = document.querySelector('#task' + this.currentEdit.index).value;
                store.editTask(this.currentEdit.task, value);
                this.currentEdit.task.edit = false;
            },
            checkForEnter(e) {
                return e.keyCode === 13;
            },
            checkForEnterAdd(e) {
                if (this.checkForEnter(e)) {
                    this.addTask();
                }
            },
            checkForEnterSave(e) {
                if (this.checkForEnter(e)) {
                    this.storeEditTask();
                }
            }
        },
        computed: {
            sortedTasks() {
                return store.tasks.slice().sort((a, b) => b.created - a.created)
            },
        },
        mounted() {
            if (store.currentUser === null) {
                this.$router.replace('/login');
            }

            document.querySelector('#new-task-input').focus();
        }
    }
</script>

<style scoped>
    main {
        height: 100vh;
        padding: 50px;
    }

    h2 {
        font-size: 2.5rem;
        color: #555;
        font-weight: 400;
        padding: 5px;
    }

    #tasks, #add-task {
        width: 100%;
    }

    #add-task {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 99;
        background-color: #fff;
        width: 100%;
    }

    .task {
        border-bottom: 1px solid #eee;
        padding: 10px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
    }

    .task-row {
        display: flex;
        align-items: center;
    }

    .task-text-row {
        width: 90%;
    }

    .task-before {
        color: var(--accent);
        padding-right: 10px;
        padding-left: 5px;
    }

    .task-input-col {
        width: 90%;
    }

    .task input {
        border: none;
        font-size: 1.5em;
        font-weight: 200;
        margin-right: 10px;
        padding: 4px;
        width: 100%;
    }

    .task button {
        border: none;
        font-size: 1.5em;
        display: flex;
        align-items: center;
        color: #555;
    }

    .task button:hover {
        cursor: pointer;
        color: #555;
    }

    .task:hover, .task .editing {
        -webkit-box-shadow: 0 3px 2px -2px #ccc;
        -moz-box-shadow: 0 3px 2px -2px #ccc;
        box-shadow: 0 3px 2px -2px #ccc;
    }

    .btn-row {
        padding-left: 10px;
    }


</style>
