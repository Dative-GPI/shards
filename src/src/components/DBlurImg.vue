<template>
  <div class="d-blur-img" :style="{
    height: height + 'px',
    width: width + 'px',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: round ? '50%' : '',
  }">
    <v-fade-transition>
      <d-blur-hash v-if="error" v-bind="$attrs" :value="imageBlurHash" :width="canvasWidth" :height="canvasHeight"
        v-show="!$attrs.value" />
    </v-fade-transition>
    <v-fade-transition>
      <v-skeleton-loader v-if="!loaded && !error" class="d-blur-hash" type="image" :width="canvasWidth"
        :height="canvasHeight" v-show="!$attrs.value" />
    </v-fade-transition>
    <v-fade-transition>
      <d-img class="d-blur-img-centered" :class="{ hidden: !loaded && !error }" @load="loaded = true"
        @error="error = true" v-bind="$attrs" v-on="$listeners" :width="!$attrs.value ? canvasWidth : width"
        :height="!$attrs.value ? canvasHeight : height">
        <slot> </slot>
        <template v-for="(index, name) in $slots" v-slot:[name]>
          <slot :name="name" />
        </template>
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </d-img>
    </v-fade-transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class BlurImage extends Vue {
  // Properties

  @Prop({ required: false, default: "" })
  imageBlurHash!: string | null;

  @Prop({ required: false, default: 0 })
  imageHeight!: number | null;

  @Prop({ required: false, default: 0 })
  imageWidth!: number | null;

  @Prop({ required: false, default: 200 })
  height!: number;

  @Prop({ required: true, default: 200 })
  width!: number;

  @Prop({ required: false, default: false, type: Boolean })
  fullfill!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  round!: boolean;

  // Data

  loaded = false;
  error = false;

  // Computed Properties

  get minRatio() {
    if (!this.imageHeight || !this.imageWidth) return 1;
    return Math.min(
      this.height / this.imageHeight,
      this.width / this.imageWidth
    );
  }

  get maxRatio() {
    if (!this.imageHeight || !this.imageWidth) return 1;
    return Math.max(
      this.height / this.imageHeight,
      this.width / this.imageWidth
    );
  }

  get ratio() {
    return this.fullfill ? this.maxRatio : this.minRatio;
  }

  get canvasWidth() {
    if (!this.imageWidth) return this.width;
    return Math.floor(this.imageWidth * this.ratio);
  }

  get canvasHeight() {
    if (!this.imageHeight) return this.height;
    return Math.floor(this.imageHeight * this.ratio);
  }

  // Methods
}
</script>
