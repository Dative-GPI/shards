<template>
  <v-badge
    :value="value"
    :offset-x="offsetX"
    :offset-y="offsetY"
    :bordered="bordered"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-badge>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBadge extends Vue {
  @Prop({ required: false, default: true })
  value!: boolean;

  @Prop({ required: false, default: true })
  bordered!: boolean;

  @Prop({ required: false, default: 8 })
  offsetX!: number;

  @Prop({ required: false, default: 8 })
  offsetY!: number;
}
</script>