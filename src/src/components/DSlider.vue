<template>
  <v-slider
    v-bind="$attrs"
    v-on="$listeners"
    class="d-slider"
    color="blue-1"
    track-color="grey-2"
  >
    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>

    <template #append v-if="showValue">
      <slot name="append">
        <span>{{ $attrs.value }}</span>
      </slot>
    </template>
  </v-slider>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DSlider extends Vue {
  @Prop({ required: false, default: false })
  showValue!: boolean;
}
</script>