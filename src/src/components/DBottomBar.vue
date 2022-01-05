<template>
  <v-footer app inset fixed class="d-bottom-bar" :color="backgroundColor" elevation="3">
    <slot></slot>
  </v-footer>
</template>
 
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DBottomBar extends Vue {
  @Prop({ required: false, default: "white" })
  backgroundColor!: string;
}
</script>