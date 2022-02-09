<template>
  <v-tabs-items
    class="d-tabs-items"
    v-bind="$attrs"
    v-on="$listeners"
    @change="$emit('input', $event)"
  >
    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-tabs-items>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DTabsItems extends Vue {
  // Properties

  // Data

  // Computed Properties

  // Methods
}
</script>
