<template>
  <v-row no-gutters>
    <d-btn
      icon 
      class="d-carousel-chevron"
      :ripple="false"
      :color="prevHovered ? 'grey-3' : 'grey-1'"
      @mouseenter="prevHovered = true"
      @mouseleave="prevHovered = false"
      @click="slide > minSize ? slide-- : slide = maxSize"
    >
      <d-icon> mdi-chevron-left </d-icon>
    </d-btn>
    <v-carousel
      v-model="slide"
      v-bind="$attrs"
      v-on="$listeners"
      :hide-delimiters="hideDelimiters"
      :height="height"
      :prev-icon="''"
      :next-icon="''"
      class="d-carousel"
    >
      <slot> </slot>
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </v-carousel>
    <d-btn
      icon
      class="d-carousel-chevron pa-0 ma-0"
      :ripple="false"
      :color="nextHovered ? 'grey-3' : 'grey-1'"
      @mouseenter="nextHovered = true"
      @mouseleave="nextHovered = false"
      @click="slide++"
    >
      <d-icon> mdi-chevron-right </d-icon>
    </d-btn>
  </v-row>
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

  @Prop({ required: false, default: 0 })
  minKey!: number;

  @Prop({ required: false })
  maxKey?: number;

  slide: number = 0;
  prevHovered: boolean = false;
  nextHovered: boolean = true;

  get minSize(): number {
    return this.minKey;
  }

  get maxSize(): number {
    return this.maxKey != null ? this.maxKey : this.$children[1].$children.length;
  }
}
</script>

<style>
.d-carousel {
  max-width: calc(100% - 56px) !important;
}
</style>