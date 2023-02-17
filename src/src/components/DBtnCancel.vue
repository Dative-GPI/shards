<template>
  <d-btn
    v-bind="$attrs"
    v-on="$listeners"
    :outlined="true"
    class="d-btn-cancel white-1"
    :icon="$attrs.icon || 'mdi-cancel'"
  >
    <span class="grey-3--text">
      <slot></slot>
    </span>
  </d-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBtnCancel extends Vue {}
</script>