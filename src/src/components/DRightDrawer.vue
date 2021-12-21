<template>
  <v-navigation-drawer
    app
    right
    temporary
    v-on="$listeners"
    v-bind="$attrs"
  >
    <template>
      <slot />
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class DRightDrawer extends Vue {}
</script>