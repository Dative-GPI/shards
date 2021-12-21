<template>
  <v-container fluid class="pa-0 ma-0 dashboard-loader-wrapper">
    <v-row no-gutters class="justify-center">
      <v-skeleton-loader v-for="index in 5" :key="index" type="avatar" height="64px" class="mr-5" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class DashboardLoader extends Vue {
  get columns(): number {
    if (this.$vuetify.breakpoint.sm) {
      return 5;
    }
    return 8;
  }
}
</script>

<style scoped>
.dashboard-loader-wrapper {
  height: calc(100vh - 192px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>