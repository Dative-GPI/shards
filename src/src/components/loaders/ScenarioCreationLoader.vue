<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters class="align-center mb-12">
      <v-skeleton-loader type="avatar"/>
      <v-skeleton-loader type="text" width="25%" class="mx-2"/>
      <v-skeleton-loader type="avatar"/>
      <v-skeleton-loader type="text" width="25%" class="mx-2"/>
      <v-skeleton-loader type="avatar"/>
      <v-skeleton-loader type="text" width="25%" class="mx-2"/>
      <v-skeleton-loader type="avatar"/>
    </v-row>
    <v-row no-gutters class="mb-12">
      <v-col cols="12">
        <v-skeleton-loader type="text" width="250" />
        <v-skeleton-loader type="heading" width="100%" />
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-12">
      <v-col cols="12">
        <v-skeleton-loader type="text" width="250" />
        <v-skeleton-loader type="heading" width="100%" />
      </v-col>
    </v-row>
    <dumb-list-loader />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ScenarioCreationLoader extends Vue {}
</script>