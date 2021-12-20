<template>
  <div class="main-wrapper">
    <AppHeader />
    <AppMain />
    <AppMobileControls />
    <AppFinish v-if="isFinish" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

import AppHeader from "@/components/AppHeader.vue";
import AppMain from "@/components/AppMain.vue";
import AppFinish from "@/components/AppFinish.vue";
import AppMobileControls from "@/components/AppMobileControls.vue";

export default defineComponent({
  name: "App",
  data() {
    return {};
  },
  components: {
    AppFinish,
    AppHeader,
    AppMain,
    AppMobileControls,
  },
  computed: {
    ...mapGetters(["isFinish", "isMobile"]),
  },
  created() {
    this.resetGame();
  },
  methods: {
    ...mapActions(["resetGame"]),
  },
});
</script>

<style lang="scss">
.main-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 30px;
  text-align: center;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: 1px dashed #2c3e50;

  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;

  overflow: hidden;

  @media screen and (max-width: 667px) {
    min-height: calc(100vh - 60px);
    padding: 6px;
  }
}
</style>
