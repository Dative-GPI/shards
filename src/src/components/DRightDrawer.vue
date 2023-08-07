<template>
  <v-navigation-drawer
    v-bind="$attrs"
    app
    right
    temporary
    class="pa-2"
    v-on="$listeners"
  >
    <div
      class="d-drawer-header mb-5"
      :style="`background-color: var(--v-${color}-base);`"
    >
      <d-btn icon @click="$emit('input', false)">
        <d-icon large>
          mdi-chevron-right
        </d-icon>
      </d-btn>
      <d-title class="ml-2">
        {{ title }}
      </d-title>
    </div>

    <d-fading-container
      :height="height"
      :color="color"
    >
      <slot></slot>
    </d-fading-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class DRightDrawer extends Vue {
  @Prop({ required: false, default: "" })
  title!: string;

  @Prop({ required: false, default: "calc(100% - 56px)" })
  height!: string;

  @Prop({ required: false, default: "white-1" })
  color!: string;
}
</script>

<style scoped>
.d-drawer-header {
  position: sticky;
  display: flex;
  align-items: center;
  top: 0;
}
</style>