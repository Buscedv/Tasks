<template>
    <button @click.prevent="signOut"><em class="fas fa-sign-out-alt"></em></button>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';

    export default {
        name: 'Navbar',
        methods: {
            signOut() {
                firebase.auth().signOut();
                this.$router.replace('/login');
            },
        },
    }
</script>

<style scoped>
    button {
        background: none;
        border: none;
        font-size: 1.5em;
        color: #777;
        position: absolute;
        top: 10px;
        right: 20px;
    }

    button:hover {
        color: #444;
        cursor: pointer;
    }
</style>
