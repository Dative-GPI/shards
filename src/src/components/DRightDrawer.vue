<template>
  <v-navigation-drawer
    v-bind="$attrs"
    app
    right
    temporary
    class="pa-2"
    v-on="$listeners"
  >
    <div class="d-drawer-header d-flex align-start justify-start mb-5">
      <d-btn icon @click="$emit('input', false)">
        <d-icon large>
          mdi-chevron-right
        </d-icon>
      </d-btn>
      <slot name="title">
        <d-title class="ml-2">
          {{ title }}
        </d-title>
      </slot>
    </div>

    <div
      class="d-scrollbar"
      :style="`height: ${height};`"
    >
      <slot></slot>
    </div>
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
}
</script>

<style scoped>
.d-drawer-header {
  background-color: var(--v-white-1-base);
  position: sticky;
  display: flex;
  top: 0;
}
</style>