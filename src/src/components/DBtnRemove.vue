<template>
  <d-btn v-bind="$attrs" v-on="$listeners" class="d-btn-remove red-4 black-1--text">
    <slot name="body">
      <v-icon small>mdi-delete</v-icon>
      <span v-if="!responsive || !$vuetify.breakpoint.mobile" class="ml-2 black-1--text">
        <slot>Delete</slot>
      </span>
    </slot>
  </d-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBtnRemove extends Vue {
  @Prop({ required: false, default: true, type: Boolean })
  responsive!: boolean;
}
</script>