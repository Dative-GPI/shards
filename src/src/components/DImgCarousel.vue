<template>
  <v-carousel :height="height" class="d-img-carousel" :style="'width: ' + width + 'px'">
    <v-carousel-item v-for="(imgsrc, i) in imageSrcs" :key="i">
      <v-img
        :src="imgsrc"
        :contain="contain"
        :height="height"
        :width="width"
        class="d-carousel-image"
      />
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class StepImageCarousel extends Vue {
  // Properties

  @Prop({ required: true })
  imageSrcs!: string[];

  @Prop({ required: false, default: () => undefined, type: Number })
  height!: number | undefined;

  @Prop({ required: false, default: () => undefined, type: Number })
  width!: number | undefined;

  @Prop({ required: false, default: false, type: Boolean })
  contain!: boolean;

  // Data
  // Computed Properties
  // Methods
  // Lifecycle
}
</script>

<style scoped>
.d-carousel-image {
  width: 100%;
  height: 100%;
}
</style>
