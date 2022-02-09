<template>
  <v-tab
    class="d-tab"
    :class="{ 'd-tab--error': error }"
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
  </v-tab>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DTab extends Vue {
  // Properties

  @Prop({ required: false, default: false, type: Boolean })
  error!: boolean;

  // Data

  // Computed Properties

  // Methods
}
</script>
