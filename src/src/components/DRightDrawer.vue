<template>
  <v-navigation-drawer app right temporary v-on="$listeners" v-bind="$attrs" class="pa-2">
    <slot name="header">
      <div class="d-drawer-header align-start justify-start mb-5">
        <d-btn icon @click="$emit('input', false)">
          <v-icon large>
            mdi-chevron-right
          </v-icon>
        </d-btn>
        <slot name="title-outer">
          <d-title class="ml-2">
            <slot name="title">
              {{ title }}
            </slot>
          </d-title>
        </slot>
      </div>
    </slot>

    <div class="d-scrollbarmock" style="max-height: calc(100% - 50px) !important;">
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
}
</script>

<style scoped>
::v-deep .d-drawer-header {
  position: sticky;
  display: flex;
  height: 30px;
  top: 0;
  background-color: var(--v-white-1-base);
}
</style>