<template>
  <v-text-field
    v-bind="$attrs"
    v-on="$listeners"
    flat
    dense
    class="d-text-field"
    :outlined="outlined"
    :height="outlined ? '40px' : '28px'"
    :readonly="!editable || $attrs.readonly"
    :solo="solo || (!editable && !outlined)"
    :class="{nopadding: !editable && !outlined}"
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