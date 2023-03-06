<template>
  <v-navigation-drawer app right temporary v-on="$listeners" v-bind="$attrs" class="pa-2">
    <slot name="header">
      <div class="d-drawer-header align-start justify-start">
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

    <div class="d-flex mt-10">
      <slot></slot>
    </div>

    <v-footer absolute v-if="$scopedSlots['actions']" color="white-1">
      <slot name="actions"></slot>
    </v-footer>
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
::v-deep .v-navigation-drawer__content {
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

::v-deep .v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}

::v-deep .d-drawer-header {
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  background-color: var(--v-white-1-base);
}
</style>