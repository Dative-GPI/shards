<template>
  <v-container
    v-bind="$attrs"
    fluid
    class="pa-0 ma-0 pr-1 d-fading-container"
    :style="`height: ${height}; background-color: var(--v-${color}-base)`"
  >
    <v-container fluid class="pa-0 ma-0 d-fading-content">
      <slot></slot>
      <div
        class="d-fading-fade"
        :style="`background-image: linear-gradient(to bottom, transparent, var(--v-${color}-base) 90%);`"
      />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class DFadingContainer extends Vue {
  @Prop({ required: false, default: "100%" })
  height!: string;

  @Prop({ required: false, default: "white-1" })
  color!: string;
}
</script>

<style scoped>
.d-fading-container {
  position: relative;
  overflow-y: scroll;
}

.d-fading-container::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.d-fading-container::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #00000000;
}

.d-fading-container:hover::-webkit-scrollbar-thumb {
    background-color: #00000022;
}

.d-fading-container::-webkit-scrollbar-track {
    background-color: #00000000;
}

.d-fading-content {
  overflow-y: show;
}

.d-fading-fade {
  position: sticky;
  z-index: 1;
  bottom: 0;
  left: 0;
  pointer-events: none;
  width: 100%;
  height: 50px;
}
</style>