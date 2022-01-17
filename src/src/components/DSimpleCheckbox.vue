<template>
  <v-simple-checkbox
    v-if="editable"
    v-bind="$attrs"
    v-on="$listeners"
    :ripple="false"
    class="d-simple-checkbox"
    color="black-1"
  >
    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-simple-checkbox>
  <div v-else>
    <d-icon v-if="$attrs.value" color="grey-3">mdi-check-circle</d-icon>
    <d-icon v-else color="grey-3">mdi-cancel</d-icon>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DSimpleCheckbox extends Vue {
  @Prop({ required: false, default: true })
  editable!: boolean;
}
</script>