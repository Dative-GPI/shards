<template>
  <d-btn
    v-bind="$attrs"
    v-on="$listeners"
    class="d-btn-drawer grey-3 white-2--text"
  >
    <slot> </slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </d-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBtnDrawer extends Vue {}
</script>