<template>
  <v-container
    v-bind="$attrs"
    fluid
    class="ma-0 px-0 pt-0 d-scrollbar"
    :style="`height: ${height};`"
  >
    <slot></slot>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class DScrollContainer extends Vue {
  @Prop({ required: false, default: "100%" })
  height!: string;
}
</script>