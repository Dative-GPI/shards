<template>
  <v-expansion-panel-content :class="fit ? 'ma-0 pa-0 mb-5' : ''" v-bind="$attrs" v-on="$listeners">
    <slot> </slot>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
  </v-expansion-panel-content>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DExpansionPanelContent extends Vue {
  @Prop({ required: false, default: true })
  fit!: boolean;
}
</script>