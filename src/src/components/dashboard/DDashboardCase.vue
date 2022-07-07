<template>
  <v-container fluid :class="classes" :style="style" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DDashboardCase extends Vue {
  @Prop({ required: true })
  x!: number;

  @Prop({ required: true })
  y!: number;

  @Prop({ required: true })
  hovered!: boolean;

  get style(): string {
    return `top: ${this.y * 120}px; left: ${this.x * 120}px;`;
  }

  get classes(): string {
    return `pa-0 ma-0 d-dashboard-case ${this.hovered ? "d-dashboard-case-hovered" : ""}`;
  }
}
</script>

<style scoped>
.d-dashboard-case {
  background-color: var(--v-alert-grey-background-base);
  border-right: 20px solid white;
  border-bottom: 20px solid white;
  position: absolute;
  height: 120px;
  width: 120px;
}

.d-dashboard-case-hovered {
  background-color: var(--v-alert-grey-background-darken2) !important;
}
</style>