<template>
  <v-chip v-bind="$attrs" v-on="$listeners" class="d-chip" small> 
    <slot> </slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-chip>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false
})
export default class DChip extends Vue {}
</script>