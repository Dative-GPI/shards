<template>
  <d-btn
    v-bind="$attrs"
    v-on="$listeners"
    :outlined="true"
    class="d-btn-checkbox white-1"
    :icon="icon"
  >
    <span class="grey-3--text">
      <slot></slot>
    </span>
  </d-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBtnCheckbox extends Vue {
  @Prop({ required: false, default: false })
  checked!: boolean;

  get icon(): string {
    return this.$attrs.icon || this.checked ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline";
  }
}
</script>