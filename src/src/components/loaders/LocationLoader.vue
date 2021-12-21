<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters class="mb-1">
      <v-col cols="12" md="3" class="pr-2">
        <v-skeleton-loader type="image" width="98%" height="300" />
      </v-col>
      <v-col cols="12" md="9">
        <v-row no-gutters class="mb-4" v-for="index in 6" :key="index">
          <v-col cols="2">
            <v-skeleton-loader type="heading" class="pr-2" width="200" />
          </v-col>
          <v-col cols="9">
            <v-skeleton-loader type="text" width="300" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-1">
      <v-skeleton-loader type="button" class="mr-2" v-for="index in 2" :key="index" />
    </v-row>
    <dumb-list-loader />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class LocationLoader extends Vue {}
</script>

<style scoped>
.d-map-row {
  position: relative;
  width: 100%;
}

.d-map-row:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.d-map-row > * {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>