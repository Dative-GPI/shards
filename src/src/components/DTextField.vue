<template>
  <v-text-field
    class="d-text-field"
    :class="{nopadding: !editable && !outlined}"
    v-bind="$attrs"
    v-on="$listeners"
    :outlined="outlined"
    dense
    flat
    height="28px"
    :solo="solo || (!editable && !outlined)"
    :readonly="!editable"
  >
    <slot></slot>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DTextField extends Vue {
  @Prop({required: false, default: false, type: Boolean})
  solo!: boolean

  @Prop({ required: false, default: true })
  editable!: boolean;

  @Prop({required: false, default: false, type: Boolean})
  outlined!: boolean;
}
</script>