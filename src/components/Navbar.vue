<template>
    <nav>
        <button @click.prevent="signOut"><em class="fas fa-sign-out-alt"></em></button>
    </nav>
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
    nav {
        padding: 10px;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
    }

    nav button {
        margin-left: auto;
        margin-right: 20px;
        padding: 5px;
        background: none;
        border: none;
        font-size: 1.5em;
        color: #777;
    }

    nav button:hover {
        color: #444;
        cursor: pointer;
    }
</style>
