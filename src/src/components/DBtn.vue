<template>
  <v-btn v-bind="$attrs" v-on="$listeners" elevation="0" small class="d-btn" active-class="d-btn-active"> 
    <slot> </slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false
})
export default class DBtn extends Vue {}
</script>