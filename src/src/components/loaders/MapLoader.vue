<template>
  <v-container fluid class="pa-0 ma-0">
    <v-skeleton-loader type="image"  style="height: calc(100vh - 140px)" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class MapLoader extends Vue {}
</script>