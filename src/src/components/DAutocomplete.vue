<template>
  <v-autocomplete
    class="d-autocomplete"
    v-bind="$attrs"
    v-on="$listeners"
    dense
    :class="{nopadding: !editable && !outlined}"
    :menu-props="{ offsetY: true }"
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
  </v-autocomplete>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DAutocomplete extends Vue {
  @Prop({required: false, default: false, type: Boolean})
  outlined!: boolean;

  @Prop({ required: false, default: true })
  editable!: boolean;
}
</script>