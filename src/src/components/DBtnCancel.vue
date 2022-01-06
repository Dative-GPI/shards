<template>
  <d-btn
    v-bind="$attrs"
    v-on="$listeners"
    :outlined="true"
    class="d-btn-cancel white-1"
  >
    <slot name="body">
      <v-icon small>mdi-cancel</v-icon>
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
export default class DBtnCancel extends Vue {
  @Prop({ required: false, default: true, type: Boolean })
  responsive!: boolean;
}
</script>