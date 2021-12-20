<template>
  <button
    :class="[
      'app-btn gb gb-bordered hover-slide',
      color,
      { selected: isSelected },
    ]"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Color } from "@/types";

export default defineComponent({
  name: "AppButton",
  props: {
    color: {
      type: String as () => Color,
      default: Color.Grey,
    },
    label: {
      type: String,
      default: "",
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
$gameButtons: (
  "green": $primary-green,
  "red": $primary-red,
  "blue": $primary-blue,
  "grey": grey,
);

@each $gameButton, $color in $gameButtons {
  .#{$gameButton} {
    background: $color;
  }
}
.gb {
  padding: 8px 20px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 4px;
}

$border-width: 4px;

.gb-bordered {
  padding: 6px 20px;
  position: relative;
  border: $border-width solid transparent;

  background-clip: padding-box;
  transition: 0.5s all;

  &:after {
    transition: 0.5s all;
    position: absolute;
    top: -$border-width;
    left: -$border-width;
    right: -$border-width;
    bottom: -$border-width;
    content: "";
    z-index: -1;
    border-radius: 4px;
  }
}

.gb-rounded {
  border-radius: 50px;
  &.gb-bordered:after {
    border-radius: 50px;
  }
}

.hover-fill {
  transition: 0.6s all;
  &:hover {
    background-color: transparent;
    color: white;
  }
  &.reverse {
    background-color: transparent;
    color: white;
    &:hover {
      background-color: white;
      color: #333;
    }
  }
}

.hover-slide {
  transition: 0.6s all;

  &:after {
    background-size: 200% 100%;
    background-position: 0% 0;
  }
  &:hover {
    &:after {
      background-position: 100% 0;
    }
  }
}
.app-btn {
  background-color: transparent;
  min-width: 100px;
  color: white;
  &:active {
    opacity: 0;
  }

  &.primary {
    &:after {
      background-image: linear-gradient(
        135deg,
        rgb(13, 4, 178) 0%,
        rgb(13, 4, 178) 12.5%,
        rgb(17, 25, 182) 12.5%,
        rgb(17, 25, 182) 25%,
        rgb(20, 46, 185) 25%,
        rgb(20, 46, 185) 37.5%,
        rgb(24, 67, 189) 37.5%,
        rgb(24, 67, 189) 50%,
        rgb(28, 87, 192) 50%,
        rgb(28, 87, 192) 62.5%,
        rgb(32, 108, 196) 62.5%,
        rgb(32, 108, 196) 75%,
        rgb(35, 129, 199) 75%,
        rgb(35, 129, 199) 87.5%,
        rgb(39, 150, 203) 87.5%,
        rgb(39, 150, 203) 100%
      );
    }
  }
  &.secondary {
    &:after {
      background-image: linear-gradient(
        135deg,
        rgb(4, 178, 155) 0%,
        rgb(4, 178, 169) 12.5%,
        rgb(17, 157, 182) 12.5%,
        rgb(17, 163, 182) 25%,
        rgb(20, 133, 185) 25%,
        rgb(20, 133, 185) 37.5%,
        rgb(24, 137, 189) 37.5%,
        rgb(24, 90, 189) 50%,
        rgb(28, 94, 192) 50%,
        rgb(28, 72, 192) 62.5%,
        rgb(32, 108, 196) 62.5%,
        rgb(32, 70, 196) 75%,
        rgb(35, 73, 199) 75%,
        rgb(35, 46, 199) 87.5%,
        rgb(39, 69, 203) 87.5%,
        rgb(39, 50, 203) 100%
      );
    }
  }
  &:hover {
    color: white;
  }
  &.selected {
    color: #ffd900;
    font-weight: 900;
  }
}
</style>
