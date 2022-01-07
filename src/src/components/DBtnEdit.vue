<template>
  <d-btn
    v-bind="$attrs"
    class="d-btn-edit blue-4"
    :class="{ active: value }"
    @click="$emit('input', !value)"
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
  @Prop({ required: false, default: false })
  value!: boolean;
}
</script>