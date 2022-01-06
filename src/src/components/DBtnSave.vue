<template>
  <d-btn v-bind="$attrs" v-on="$listeners" class="d-btn-save green-1 black-1--text">
    <slot name="body">
      <v-icon small>mdi-content-save-outline</v-icon>
      <span v-if="!responsive || !$vuetify.breakpoint.mobile" class="ml-2">
        <slot>Save</slot>
      </span>
    </slot>
  </d-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBtnSave extends Vue {
  @Prop({ required: false, default: true })
  responsive!: boolean;
}
</script>