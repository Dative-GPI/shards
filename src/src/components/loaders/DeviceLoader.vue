<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters class="mb-1">
      <v-col cols="12" sm="6" md="3" class="pr-2">
        <v-skeleton-loader type="image" width="200" height="200" />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-skeleton-loader type="heading" class="mb-6" v-for="index in 4" :key="index" />
      </v-col>
      <v-col cols="12" md="6">
        <v-skeleton-loader type="article" />
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-1">
      <v-skeleton-loader type="button" class="mr-2" v-for="index in 3" :key="index" />
    </v-row>
    <v-row no-gutters v-for="index in 5" :key="index">
      <v-col cols="12" sm="6" v-for="index in 2" :key="index">
        <v-skeleton-loader type="table-heading" class="pr-2" />
      </v-col>
    </v-row>
    <v-row no-gutter>
      <v-col cols="12">
        <v-skeleton-loader v-for="index in 2" :key="index" type="list-item-avatar" class="mb-2" />
      </v-col>
    </v-row>
    <dumb-list-loader />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class DeviceLoader extends Vue {}
</script>