<template>
  <d-btn
    v-bind="$attrs"
    v-on="$listeners"
    class="d-btn-edit blue-4"
    :icon="$attrs.icon || 'mdi-pencil'"
  >
    <template v-if="!!$scopedSlots.default">
      <span class="grey-3--text">
        <slot></slot>
      </span>
    </template>
  </d-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBtnEdit extends Vue {}
</script>