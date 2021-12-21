<template>
  <a text class="text-h6 blue-3--text f-cursor-pointer" :href="href">
    {{ label }}
  </a>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DLink extends Vue {
  @Prop({ required: true })
  href!: string;

  @Prop({ required: true })
  label!: string;
}
</script>