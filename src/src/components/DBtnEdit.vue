<template>
  <d-btn
    v-bind="$attrs"
    v-on="$listeners"
    class="d-btn-edit blue-4"
    :icon="$attrs.icon || 'mdi-pencil'"
  >
    <span class="grey-3--text">
      <slot>Edit</slot>
    </span>
  </d-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBtnEdit extends Vue {
}
</script>