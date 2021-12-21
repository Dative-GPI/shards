<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters class="mb-1">
      <v-col cols="12" sm="6" md="3" class="pr-2">
        <v-skeleton-loader type="image" width="200" height="200" />
      </v-col>
      <v-col cols="12" md="9">
        <v-row no-gutters class="mb-4" v-for="index in 5" :key="index">
          <v-col cols="2">
            <v-skeleton-loader type="heading" class="pr-2" width="200" />
          </v-col>
          <v-col cols="9">
            <v-skeleton-loader type="text" width="300" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-6">
      <v-skeleton-loader type="button" />
    </v-row>
    <v-row no-gutters class="mb-2">
      <v-skeleton-loader type="heading" class="pr-2" width="400" />
    </v-row>
    <v-row no-gutters class="mb-2">
      <v-skeleton-loader type="button" />
    </v-row>
    <dumb-list-loader />
    <v-row no-gutters class="my-2">
      <v-skeleton-loader type="chip" class="mr-2" v-for="index in 3" :key="index" />
    </v-row>
    <dumb-list-loader />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class OrganisationLoader extends Vue {}
</script>