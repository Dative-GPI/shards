<template>
  <v-switch
    v-if="editable"
    v-bind="$attrs"
    class="d-switch d-text-field"
    color="alert-green"
    hide-details
    inset
    dense
    :ripple="false"
    :input-value="$attrs.value"
    @change="$emit('input', !!$event)"
    v-on="$listeners"
  >
    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-switch>
  <div class="d-flex align-center d-switch-uneditable" v-else>
    <d-icon v-if="$attrs.value" :color="activeColor">
      mdi-check-circle
    </d-icon>
    <d-icon v-else :color="inactiveColor">
      mdi-cancel
    </d-icon>
    <span v-if="$attrs.label != null" class="text-body-1 ml-2">
      {{ $attrs.label }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DSwitch extends Vue {
  @Prop({ required: false, default: true })
  editable!: boolean;

  @Prop({ required: false, default: "alert-green" })
  activeColor!: string;

  @Prop({ required: false, default: "alert-red" })
  inactiveColor!: string;
}
</script>

<style scoped>
.d-switch-uneditable {
  height: 28px !important;
}
</style>