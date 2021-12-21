<template>
  <v-container fluid class="pa-0 ma-0">
    <v-skeleton-loader type="heading" class="mb-6" width="190%" />
    <v-skeleton-loader type="card-avatar" class="mb-6" width="90%" />
    <v-skeleton-loader type="article" class="mb-6" width="90%" />
    <v-skeleton-loader type="date-picker-options" class="mb-6" width="90%" />
    <v-skeleton-loader type="image" class="mb-6" width="90%" height="100" />
    <v-skeleton-loader type="heading" class="mb-6" width="190%" />
    <v-skeleton-loader type="image" class="mb-6" width="90%" height="100" />
    <v-skeleton-loader type="image" class="mb-6" width="90%" height="100" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class DrawerLoader extends Vue {}
</script>