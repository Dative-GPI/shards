<template>
  <d-btn
    v-bind="$attrs"
    class="d-btn-edit blue-4"
    :class="{ active: value }"
    @click="$emit('input', !value)"
  >
    <slot name="body">
      <v-icon small>mdi-pencil</v-icon>
      <span v-if="!responsive || !$vuetify.breakpoint.mobile" class="ml-2 grey-3--text">
        <slot>Edit</slot>
      </span>
    </slot>
  </d-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBtnEdit extends Vue {
  @Prop({ required: false, default: true, type: Boolean })
  responsive!: boolean;

  @Prop({ required: false, default: false })
  value!: boolean;
}
</script>