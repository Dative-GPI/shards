<template>
  <v-tabs class="d-tabs" v-bind="$attrs" v-on="$listeners" active-class="d-tab--active"
    :show-arrows="$attrs.showArrows !== undefined ? $attrs.showArrows : true" hide-slider
    @change="$emit('input', $event)">
    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DTabs extends Vue {
  // Properties
  // Data
  // Computed Properties
  // Methods
}
</script>
