<template>
  <v-btn-toggle
    v-bind="$attrs"
    v-on="$listeners"
    borderless
    tile
    group
    @change="$emit('input', $event)"
    class="d-btn-toggle"
  >
    <slot> </slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-btn-toggle>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false
})
export default class DBtnToggle extends Vue {}
</script>