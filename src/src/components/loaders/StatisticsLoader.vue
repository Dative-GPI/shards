<template>
  <v-container fluid class="pa-0 ma-0">
    <v-skeleton-loader type="heading" width="450" class="my-3" />
    <v-skeleton-loader type="text" width="200" class="mb-3" />
    <v-row no-gutters class="mb-12">
      <v-skeleton-loader type="image" width="144" height="96" class="mr-3" v-for="index in 4" :key="index" />
    </v-row>
    <d-list-loader />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class StatisticsLoader extends Vue {}
</script>