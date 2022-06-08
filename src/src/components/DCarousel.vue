<template>
  <v-row no-gutters>
    <d-btn
      v-if="sliders"
      icon 
      class="d-carousel-chevron"
      :ripple="false"
      :color="prevHovered ? 'grey-3' : 'grey-1'"
      @mouseenter="prevHovered = true"
      @mouseleave="prevHovered = false"
      @click.stop.prevent="slide > minKey ? slide-- : slide = maxKey"
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
      :style="{ maxWidth: sliders ? 'calc(100% - 56px) !important' : '100%' }"
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
      v-if="sliders"
      icon
      class="d-carousel-chevron"
      :ripple="false"
      :color="nextHovered ? 'grey-3' : 'grey-1'"
      @mouseenter="nextHovered = true"
      @mouseleave="nextHovered = false"
      @click.stop.prevent="slide++"
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

  @Prop({ required: true })
  maxKey!: number;

  slide: number = 0;
  prevHovered: boolean = false;
  nextHovered: boolean = false;

  get sliders(): boolean {
    return this.maxKey - this.minKey > 0;
  }
}
</script>