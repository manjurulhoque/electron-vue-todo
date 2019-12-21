<template>
    <h1>Hello World</h1>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";

export default {
    name: "landing-page",
    components: { SystemInformation },
    methods: {
        open(link) {
            this.$electron.shell.openExternal(link);
        }
    }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
</style>
