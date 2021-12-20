<template>
  <div class="teeter-totter">
    <div class="teeter-totter__board" :style="boardStyles">
      <FigureComponent
        v-for="figure in leftSideFigures"
        :key="figure.id"
        :figure="figure"
      ></FigureComponent>
      <FigureComponent
        v-for="figure in rightSideFigures"
        :key="figure.id"
        :figure="figure"
        :is-right-side="true"
      ></FigureComponent>
    </div>
    <div class="teeter-totter__base"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";

import FigureComponent from "@/components/elements/FigureComponent.vue";

export default defineComponent({
  name: "TeeterTotter",
  components: {
    FigureComponent,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["boardBendingAngle", "isBoardAngleWithinLimits"]),
    ...mapState(["leftSideFigures", "rightSideFigures"]),
    boardStyles(): { [key: string]: string } {
      return {
        transform: `rotate(${this.boardBendingAngle / 2}deg)`,
      };
    },
    figuresDiff(): number {
      return this.leftSideFigures.length - this.rightSideFigures.length;
    },
  },
  watch: {
    figuresDiff(current: number) {
      if (current && this.isBoardAngleWithinLimits) {
        this.generateRightFigure();
      }
    },
  },
  methods: {
    ...mapMutations(["generateLeftFigure", "generateRightFigure"]),
  },
});
</script>

<style lang="scss" scoped>
.teeter-totter {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding-bottom: 60px;

  @media screen and (max-width: 667px) {
    padding-bottom: 80px;
  }

  &__board {
    position: relative;
    bottom: -3px;
    z-index: 4;
    width: 100%;
    border-bottom: 5px solid #725853;
    transition: 0.8 ease-in-out;

    .figure {
      bottom: 0;
      z-index: -1;
    }
  }

  &__base {
    width: 120px;
    height: 100px;
    background-image: url(../../assets/base.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: inline-block;
    transform: rotate(180deg);

    @media screen and (max-width: 667px) {
      width: 74px;
      height: 70px;
    }
  }
}
</style>
