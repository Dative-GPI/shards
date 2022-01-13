<template>
  <div
    class="d-blur-img"
    :style="{
      height: height + 'px',
      width: width + 'px',
      overflow: 'hidden',
      position: 'relative',
      borderRadius: round ? '50%' : '',
    }"
  >
    <d-blur-hash
      v-bind="$attrs"
      :value="imageBlurHash"
      :width="canvasWidth"
      :height="canvasHeight"
      v-show="!$attrs.value"
    />
    <d-img
      :class="{ hidden: !loaded }"
      @load="loaded = true"
      v-bind="$attrs"
      v-on="$listeners"
      :width="!$attrs.value ? canvasWidth : width"
      :height="!$attrs.value ? canvasHeight : height"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class BlurImage extends Vue {
  @Prop({ required: true, type: String })
  imageBlurHash!: string;

  @Prop({ required: true, type: Number })
  imageHeight!: number;

  @Prop({ required: true, type: Number })
  imageWidth!: number;

  @Prop({ required: true, type: Number })
  height!: number;

  @Prop({ required: true, type: Number })
  width!: number;

  @Prop({ required: false, default: false, type: Boolean })
  fullfill!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  round!: boolean;

  loaded = false;

  get minRatio() {
    return Math.min(
      this.height / this.imageHeight,
      this.width / this.imageWidth
    );
  }

  get maxRatio() {
    return Math.max(
      this.height / this.imageHeight,
      this.width / this.imageWidth
    );
  }

  get ratio() {
    return this.fullfill ? this.maxRatio : this.minRatio;
  }

  get canvasWidth() {
    return Math.floor(this.imageWidth * this.ratio);
  }

  get canvasHeight() {
    return Math.floor(this.imageHeight * this.ratio);
  }
}
</script>