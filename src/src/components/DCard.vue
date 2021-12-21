<template>
  <v-card v-bind="$attrs" v-on="$listeners" elevation="0" class="d-card">
    <slot> </slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class DCard extends Vue {}
</script>