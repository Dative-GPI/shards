<template>
  <div class="grey-3--text">
    <slot>{{ label }}</slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DTitle extends Vue {
  @Prop({ required: false, default: "" })
  label!: string;
}
</script>