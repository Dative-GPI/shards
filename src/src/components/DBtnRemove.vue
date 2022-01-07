<template>
  <d-btn
    :icon="$attrs.icon || 'mdi-delete'"
    v-on="$listeners"
    class="d-btn-remove red-4 black-1--text"
  >
    <span class="black-1--text">
      <slot>Delete</slot>
    </span>
  </d-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBtnRemove extends Vue {
}
</script>