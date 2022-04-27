<template>
  <v-expansion-panel-header :class="fit ? 'ma-0 pa-0 mb-5' : ''" expand-icon="mdi-menu-down" v-bind="$attrs" v-on="$listeners">
    <slot>
      <span class="text-h5 d-expansion-panel-header">
        {{ header }}
      </span>
    </slot>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
  </v-expansion-panel-header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DExpansionPanelHeader extends Vue {
  @Prop({ required: false, default: "" })
  header!: string;

  @Prop({ required: false, default: true })
  fit!: boolean;
}
</script>