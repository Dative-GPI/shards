<template>
  <v-container
    v-bind="$attrs"
    fluid
    class="pa-0 ma-0 pr-1 d-scroll-container"
    :style="`height: ${height}; background-color: var(--v-${color}-base)`"
  >
      <slot></slot>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class DScrollContainer extends Vue {
  @Prop({ required: false, default: "100%" })
  height!: string;

  @Prop({ required: false, default: "white-1" })
  color!: string;
}
</script>

<style scoped>
.d-scroll-container {
    overflow-y: scroll;
}

.d-scroll-container::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.d-scroll-container::-webkit-scrollbar-track {
    background-color: #00000000;
}

.d-scroll-container::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #00000000;
}

.d-scroll-container:hover::-webkit-scrollbar-thumb {
    background-color: #00000022;
}
</style>