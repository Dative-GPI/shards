<template>
  <d-text-field
    :type="type"
    :append-icon="appendIcon"
    @click:append="toggleInputType()"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </d-text-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class DPasswordInput extends Vue {
  // Properties

  @Prop({ required: false, default: "mdi-eye" })
  appendIconShow!: string;

  @Prop({ required: false, default: "mdi-eye-off" })
  appendIconHide!: string;

  @Prop({ required: false, default: false, type: Boolean })
  showPassword!: boolean;

  // Data

  internalAppendIcon = "";
  internalType = "password";

  // Computed Properties

  get type() {
    return this.showPassword ? "text" : this.internalType;
  }

  get appendIcon() {
    return this.showPassword ? "" : this.internalAppendIcon;
  }

  // Methods

  toggleInputType() {
    if (this.internalType == "password") {
      this.internalType = "text";
      this.internalAppendIcon = this.appendIconHide;
    } else {
      this.internalType = "password";
      this.internalAppendIcon = this.appendIconShow;
    }
  }

  // Lifecycle

  mounted() {
    this.internalAppendIcon = this.appendIconShow;
  }
}
</script>

<style scoped></style>
