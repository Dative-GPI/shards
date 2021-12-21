<template>
  <v-expansion-panels
    v-bind="$attrs"
    v-on="$listeners"
    class="d-expansion-panels"
  >
    <slot> </slot>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DExpansionPanels extends Vue {}
</script>