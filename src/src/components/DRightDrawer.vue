<template>
  <v-navigation-drawer
    app
    right
    temporary
    v-on="$listeners"
    v-bind="$attrs"
    class="pa-3"
  >
    <slot name="header">
      <v-row no-gutters align="center" justify="start" class="mb-3">
        <d-btn icon @click="$emit('input', false)">
          <v-icon large class="">mdi-chevron-right</v-icon>
        </d-btn>
        <slot name="title-outer">
          <d-title class="ml-2">
            <slot name="title">{{ title }}</slot>
          </d-title>
        </slot>
      </v-row>
    </slot>

    <slot> </slot>

    <v-footer absolute v-if="$scopedSlots['actions']" color="transparent">
      <slot name="actions"> </slot>
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