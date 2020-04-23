<template>
    <div id="app" class="container">
        <router-view></router-view>
    </div>
</template>

<script>
    import './assets/flexboxgrid/flexboxgrid.css'

    export default {
        name: 'App',
    }
</script>

<style>
    :root {
        --accent: #03a9f4;
    }

    ::-webkit-scrollbar {
        border: none;
    }

    body {
        padding: 0;
        margin: 0;
        width: 100%;
    }

    * {
        font-family: sans-serif;
        box-shadow: none;
        outline: none;
    }
</style>
