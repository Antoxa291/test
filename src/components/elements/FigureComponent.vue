<template>
  <div :class="['figure', figure.type]" :style="cssVars">
    <p class="text">
      <b>{{ figure.weight }}</b> kg
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { ILeftFigure, IRightFigure } from "@/types";

export default defineComponent({
  name: "FigureComponent",
  props: {
    isOnBoard: {
      type: Boolean,
      default: false,
    },
    isRightSide: {
      type: Boolean,
      default: false,
    },
    figure: {
      type: Object as () => ILeftFigure | IRightFigure,
      required: true,
    },
  },
  computed: {
    cssVars() {
      return {
        "--figure-color": this.figure.color,
        "--figure-scale": this.figure.scale,
      };
    },
  },
  mounted() {
    this.setAppearance();
    if (this.isRightSide) {
      this.$watch("figure.right", this.setRightPosition, { immediate: true });
    } else {
      this.$watch("figure.left", this.setLeftPosition, { immediate: true });
    }
  },
  methods: {
    setAppearance() {
      const { style } = this.$el;
      if (this.isOnBoard) {
        style.transform += " translateY(-100%)";
      }
    },
    setLeftPosition(left: number) {
      this.$el.style.left = `${left}%`;
    },
    setRightPosition(right: number) {
      this.$el.style.right = `${right}%`;
    },
  },
});
</script>

<style lang="scss" scoped>
.figure {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  transform: scale(var(--figure-scale));
  transform-origin: bottom left;

  @media screen and (max-width: 667px) {
    transform: scale(calc(var(--figure-scale) / 2));
  }

  &.square,
  &.circle {
    width: 2rem;
    height: 2rem;
    background-color: var(--figure-color);
  }

  &.circle {
    border-radius: 50%;
  }

  &.triangle {
    width: 0;
    height: 0;
    border-right: 2rem solid transparent;
    border-bottom: 2rem solid var(--figure-color);
    border-left: 2rem solid transparent;
    .text {
      top: -5px;
    }
  }

  .text {
    position: absolute;
    width: 4.5rem;
    text-align: center;
    user-select: none;
  }
}
</style>
