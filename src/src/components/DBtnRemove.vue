<template>
  <d-btn
    :icon="$attrs.icon || 'mdi-delete'"
    v-bind="$attrs"
    v-on="$listeners"
    class="d-btn-remove red-4 black-1--text"
  >
    <template v-if="!!$scopedSlots.default">
      <span class="black-1--text">
        <slot></slot>
      </span>
    </template>
  </d-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBtnRemove extends Vue {}
</script>