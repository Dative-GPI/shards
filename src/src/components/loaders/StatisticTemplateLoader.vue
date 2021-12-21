<template>
  <v-container fluid class="pa-0 ma-0">
    <v-skeleton-loader type="heading" width="500" class="my-2" />
    <v-row no-gutters>
      <v-row  no-gutters v-for="index in 4" :key="`a${index}`" class="my-2">
        <v-skeleton-loader type="image" width="144" height="96" class="mr-3" />
        <v-col :key="`b${index}`" class="py-3 mr-6">
          <v-skeleton-loader type="heading" width="150" class="mb-3" />
          <v-skeleton-loader type="text" width="200" />
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class StatisticsLoader extends Vue {}
</script>