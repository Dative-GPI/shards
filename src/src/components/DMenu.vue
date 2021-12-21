<template>
  <v-menu v-bind="$attrs" v-on="$listeners" class="d-menu"> 
    <slot> </slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false
})
export default class DMenu extends Vue {}
</script>