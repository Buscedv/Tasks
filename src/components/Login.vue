<template>
    <main>
        <button @click.prevent="signInWithGoogle">Log in with Google</button>
    </main>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';

    export default {
        name: 'Login',
        methods: {
            signInWithGoogle() {
                let provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider);
            },
        },
    }
</script>

<style scoped></style>
