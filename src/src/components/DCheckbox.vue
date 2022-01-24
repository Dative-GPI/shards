<template>
  <v-row no-gutters>
    <d-simple-checkbox
      v-bind="$attrs"
      v-on="$listeners"
      class="d-checkbox"
      color="black-1"
    />
    <div class="ml-3">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DCheckbox extends Vue {
  @Prop({ required: false, default: "" })
  label!: string;
}
</script>
