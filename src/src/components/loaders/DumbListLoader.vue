<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row no-gutters class="mb-2 mt-10">
      <v-skeleton-loader type="heading" width="60%" />
    </v-row>
    <v-row no-gutters class="mb-1">
      <v-skeleton-loader type="button" class="mr-2" />
      <v-skeleton-loader type="button" class="mr-2" />
      <v-skeleton-loader type="button" />
      <v-spacer />
      <v-skeleton-loader type="button" class="mr-2" />
      <v-skeleton-loader type="button" />
    </v-row>
    <v-skeleton-loader type="table-row-divider@3" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class DumbListLoader extends Vue {}
</script>