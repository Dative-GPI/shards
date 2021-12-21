<template>
  <v-textarea
    class="d-textarea"
    v-bind="$attrs"
    v-on="$listeners"
    :class="{nopadding: !editable && !outlined}"
    :menu-props="{ offsetY: true }"
    dense
    :outlined="outlined"
    :solo="!editable && !outlined"
    :flat="!editable && !outlined"
    :readonly="!editable"
  >
    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-textarea>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DTextarea extends Vue {
  @Prop({required: false, default: false, type: Boolean})
  outlined!: boolean;

  @Prop({ required: false, default: true })
  editable!: boolean;
}
</script>