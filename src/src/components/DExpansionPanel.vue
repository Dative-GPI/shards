<template>
  <v-expansion-panel class="d-expansion-panel">
    <v-expansion-panel-header class="ma-0 pa-0 grey-3--text text-h5" expand-icon="mdi-menu-down">
      <div class="after-icon ml-5">
        <slot name="panel-header" />
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <slot name="panel-content" />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DExpansionPanel extends Vue {}
</script>

<style scoped>
.after-icon {
	order: 1;
}
</style>