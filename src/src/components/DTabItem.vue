<template>
  <v-tab-item
    class="d-tab-item"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-tab-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DTabItem extends Vue {
  // Properties

  // Data

  // Computed Properties

  // Methods
}
</script>
