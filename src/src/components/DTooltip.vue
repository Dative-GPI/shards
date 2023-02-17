<template>
  <v-tooltip top>
    <template v-for="(index, name) in $scopedSlots" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class DTooltip extends Vue {}
</script>

<style scoped>
.v-tooltip__content::v-deep {
  opacity: 1 !important;
  border: 2px solid var(--v-alert-grey-base);
  background-color: var(--v-alert-grey-background-base) !important;
  color: rgba(0, 0, 0, 0.87);
}
</style>