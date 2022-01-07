<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    elevation="0"
    small
    class="d-btn"
    active-class="d-btn-active"
  >
    <slot name="body">
      <slot name="icon"><v-icon small v-if="icon" v-text="icon" /></slot>
      <slot name="text">
        <span
          v-if="!responsive || !$vuetify.breakpoint.mobile"
          :class="{ 'ml-2': icon }"
        >
          <slot>Text</slot>
        </span>
      </slot>
    </slot>
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
}
</script>