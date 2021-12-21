<template>
  <v-icon v-bind="$attrs" v-on="$listeners" :dense="dense">
    <slot> </slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-icon>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DIcon extends Vue {
  @Prop({ required: false, default: true})
  dense!: boolean;
}
</script>