<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters class="mt-10">
      <v-col cols="12" sm="6" md="4">
        <v-skeleton-loader type="image" width="300" height="220" class="mr-2" />
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <v-row no-gutters>
          <v-skeleton-loader type="image" width="144" height="96" class="mr-3 mb-3" v-for="index in 8" :key="index" />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class StatisticsDeviceLoader extends Vue {}
</script>