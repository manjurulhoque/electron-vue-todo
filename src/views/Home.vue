<template>
  <div>
    <vx-list :list="list"></vx-list>
  </div>
</template>

<script>
import VxList from "../components/vx-list/VxList";

export default {
  components: {
    VxList
  },
  data() {
    return {
      list: ["One", "Two"]
    };
  }
};
</script>
