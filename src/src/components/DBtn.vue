<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :icon="icon && !isIconString"
    elevation="0"
    small
    class="d-btn"
    :class="{ hidden }"
    active-class="d-btn-active"
  >
    <slot name="body" v-if="isIconString">
      <slot name="icon">
        <v-icon small v-if="isIconString" v-text="icon" />
      </slot>
      <slot name="text">
        <template v-if="!!$scopedSlots.default">
          <span
            v-if="!responsive || !$vuetify.breakpoint.mobile || !isIconString"
            :class="{ 'ml-2': isIconString }"
          >
            <slot></slot>
          </span>
        </template>
      </slot>
    </slot>
    <slot v-else></slot>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBtn extends Vue {
  @Prop({ required: false, default: true, type: Boolean })
  responsive!: boolean;

  @Prop({ required: false, default: () => null })
  icon!: string | null;

  @Prop({ required: false, default: false })
  hidden!: boolean;

  get isIconString() {
    return typeof this.icon === "string" && this.icon !== "";
  }
}
</script>