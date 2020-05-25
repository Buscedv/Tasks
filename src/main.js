import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

// Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyBgFllx96Iow8yVdkt2mEBiRmSuWwxtGvU",
    authDomain: "tasks-edvard-dev.firebaseapp.com",
    databaseURL: "https://tasks-edvard-dev.firebaseio.com",
    projectId: "tasks-edvard-dev",
    storageBucket: "tasks-edvard-dev.appspot.com",
    messagingSenderId: "882616965823",
    appId: "1:882616965823:web:9c54411cc27da435a2c40a",
    measurementId: "G-56F37KRP4V"
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
    if (user) {
        store.currentUser = user;
        router.replace('/');
        setTasksCollection();
    } else {
        router.replace('/login');
    }
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
