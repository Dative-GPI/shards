<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters class="mb-2">
      <v-skeleton-loader type="button" class="mr-2" />
      <v-skeleton-loader type="button" class="mr-2" />
      <v-skeleton-loader type="button" />
      <v-spacer />
      <v-skeleton-loader type="button" class="mr-2" />
      <v-skeleton-loader type="button" />
    </v-row>
    <v-skeleton-loader type="table-tbody" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ListLoader extends Vue {}
</script>