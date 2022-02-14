<template>
  <v-select
    v-bind="$attrs"
    v-on="$listeners"
    :items="items.filter(filter)"
    class="d-select"
    :class="{nopadding: !editable && !outlined}"
    :menu-props="{ offsetY: true }"
    dense
    :outlined="outlined"
    :solo="!editable && !outlined"
    :flat="!editable && !outlined"
    :readonly="!editable"
    :append-icon="editable ? 'mdi-menu-down' : ''"
    height="28px"
  >
    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DSelect extends Vue { 
  @Prop({ required: false, default: () => [], type: Array })
  items!: any[];

  @Prop({required: false, default: false, type: Boolean})
  outlined!: boolean;

  @Prop({required: false, default: true, type: Boolean})
  editable!: boolean;

  @Prop({ required: false, default: () => true, type: Function })
  filter!: (item: any) => boolean;
}
</script>