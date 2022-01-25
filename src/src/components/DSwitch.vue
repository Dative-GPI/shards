<template>
  <v-switch
    v-bind="$attrs"
    v-on="$listeners"
    :input-value="$attrs.value"
    @change="$emit('input', !!$event)"
    class="d-switch"
    inset
    dense
    v-if="editable"
    color="alert-green"
  >
    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-switch>
  <div v-else>
    <d-icon v-if="$attrs.value" :color="activeColor">mdi-check-circle</d-icon>
    <d-icon v-else :color="inactiveColor">mdi-cancel</d-icon>
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