<template>
  <d-btn
    :icon="$attrs.icon || 'mdi-content-save-outline'"
    v-bind="$attrs"
    v-on="$listeners"
    class="d-btn-save green-1 black-1--text"
  >
    <slot>Save</slot>
  </d-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: true,
})
export default class DBtnSave extends Vue {}
</script>