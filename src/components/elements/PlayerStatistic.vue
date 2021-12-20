<template>
  <ul v-if="statisticItems" class="statistic">
    <li v-if="player" class="statistic__person">Player</li>
    <li v-else class="statistic__person">Computer</li>
    <li
      v-for="(item, key) in statisticItems"
      :key="key"
      class="statistic__content"
    >
      <span class="statistic__text">{{ key }}: </span>
      <span class="statistic__text--bold">{{ item }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { StatisticItems } from "@/types";

export default defineComponent({
  name: "PlayerStatistic",
  props: {
    statisticItems: {
      type: Object as () => StatisticItems,
    },
    player: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.statistic {
  display: inline-block;
  min-width: 140px;
  margin: 0;
  padding: 0;
  text-align: left;
  font-family: fantasy;
  list-style-type: none;
}
.statistic__person {
  color: #41b882;
  font-size: 24px;
  font-weight: 900;
  text-transform: uppercase;
}
.statistic__content {
  display: flex;
  flex-flow: row no-wrap;
  justify-content: space-between;
}
.statistic__text {
  &--bold {
    font-weight: 900;
  }
}
</style>
