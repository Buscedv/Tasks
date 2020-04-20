import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

// Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyAu3SpMDe2ia0q0AfEHJqsNuYjIKhWNp38",
    authDomain: "tasks-edvard-io.firebaseapp.com",
    databaseURL: "https://tasks-edvard-io.firebaseio.com",
    projectId: "tasks-edvard-io",
    storageBucket: "tasks-edvard-io.appspot.com",
    messagingSenderId: "184511577269",
    appId: "1:184511577269:web:dc2b182fe6699991f4d2fc",
    measurementId: "G-VR4TVH6342"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

let tasksCollection;

export const store = {
    currentUser: null,
    tasks: [],
    writeTask: (task) => tasksCollection.add({
        task: task,
        created: new Date,
        author: store.currentUser.uid,
    }),
    deleteTask: (task) => tasksCollection.doc(task.id).delete(),
    editTask: (task, newTask) => tasksCollection.doc(task.id).update({
        task: newTask,
    })
};

firebase.auth().onAuthStateChanged((user) => {
    store.currentUser = user;
    router.replace('/');
    setTasksCollection();
});

function setTasksCollection() {
     tasksCollection = firebase
        .firestore()
        .collection('users')
        .doc(store.currentUser.uid)
        .collection('tasks')

    tasksCollection
        .onSnapshot((tasksRef) => {
            const tasks = [];
            tasksRef.forEach((doc) => {
                const task = doc.data();
                task.id = doc.id;
                task.edit = false;
                tasks.push(task);
            });
            store.tasks = tasks;
        });
}

// Fontawesome
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
