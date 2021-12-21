<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters class="my-3">
      <v-col cols="12" md="4">
        <v-skeleton-loader type="table-heading" />
      </v-col>
    </v-row>
    <v-skeleton-loader type="button"  class="mb-10" />
    <v-skeleton-loader type="heading" class="mb-5" width="800" />
    <v-row no-gutters class="mb-1" v-for="i in 2" :key="`${i}1`">
      <v-col cols="12" md="4" v-for="j in 3" :key="`${j}2`">
        <v-row no-gutters class="align-center">
          <v-skeleton-loader type="text" width="100" class="mr-2" />
          <v-skeleton-loader type="heading" width="100" />
        </v-row>
      </v-col>
    </v-row>
    <template v-for="k in 3">
      <v-skeleton-loader type="heading" class="my-5" width="800" :key="`${k}3`" />
      <v-row no-gutters v-for="l in 4" :key="`${k}4${l}`" class="mb-1">
        <v-col cols="12" md="4" v-for="j in 3" :key="j">
          <v-row no-gutters class="align-center">
            <v-skeleton-loader type="text" width="100" class="mr-2" />
            <v-skeleton-loader type="heading" width="100" />
          </v-row>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class UserRoleLoader extends Vue {}
</script>