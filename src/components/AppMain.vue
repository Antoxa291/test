<template>
  <main class="app-main">
    <!-- <div class="main__spaces">
      <FallingSpace />
      <FallingSpace />
    </div> -->
    <FallingSpace />
    <TeeterTotter />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TeeterTotter from "@/components/elements/TeeterTotter.vue";
import FallingSpace from "@/components/elements/FallingSpace.vue";

export default defineComponent({
  name: "AppMain",
  components: {
    TeeterTotter,
    FallingSpace,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
});
</script>

<style lang="scss" scoped>
.app-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
}

.main__spaces {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
