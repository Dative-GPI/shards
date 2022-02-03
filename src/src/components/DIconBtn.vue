<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    icon
    elevation="0"
    class="d-btn d-icon-btn"
    :class="{ hidden }"
    active-class="d-btn-active"
  >
    <slot>
        <v-icon v-text="icon" v-if="isIconString" />
    </slot>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBtn extends Vue {
  // Properties

  @Prop({ required: false, default: () => null })
  icon!: string | null;

  @Prop({ required: false, default: false })
  hidden!: boolean;

  // Data

  // Computed Properties

  get isIconString() {
    return typeof this.icon === "string" && this.icon !== "";
  }

  // Methods
}
</script>