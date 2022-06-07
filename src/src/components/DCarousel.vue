<template>
  <v-carousel
    v-model="slide"
    v-bind="$attrs"
    v-on="$listeners"
    :hide-delimiters="hideDelimiters"
    :height="height"
  >
    <template v-slot:prev="{ on, attrs }">
      <d-icon class="d-carousel" v-bind="attrs" v-on="on"> mdi-chevron-left </d-icon>
    </template>
    <template v-slot:next="{ on, attrs }">
      <d-icon v-bind="attrs" v-on="on"> mdi-chevron-right </d-icon>
    </template>
    <slot> </slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </v-carousel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DCarousel extends Vue {
  @Prop({ required: false, default: true })
  hideDelimiters!: boolean;
  
  @Prop({ required: false, default: 22.5 })
  height!: number;

  slide: number = 0;
}
</script>