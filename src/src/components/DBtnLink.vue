<template>
  <d-btn v-bind="$attrs" v-on="$listeners" class="d-btn-link blue-1 white-1--text">
    <slot> </slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </d-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DBtnLink extends Vue {
  @Prop({ required: false, default: false })
  external!: boolean;
}
</script>