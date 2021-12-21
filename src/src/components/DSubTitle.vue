<template>
  <div class="font-weight-thin grey-2--text my-2">
    <slot>{{ label }}</slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DSubTitle extends Vue {
  @Prop({ required: false, default: "" })
  label!: string;
}
</script>