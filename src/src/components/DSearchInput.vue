<template>
  <d-text-field
    v-bind="$attrs"
    v-on="$listeners"
    :class="'d-search-input text-body-1'"
    outlined
    solo
    :clearable="true"
  >
    <template slot="prepend-inner">
      <v-icon :size="20" class="mx-2 my-1">mdi-magnify</v-icon>
    </template>
  </d-text-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DSearchInput extends Vue {
}
</script>