<template>
  <canvas class="d-blur-hash" :width="width + 'px'" :height="height + 'px'" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { decode, isBlurhashValid } from "blurhash";

@Component({
  inheritAttrs: false,
})
export default class DBlurHash extends Vue {
  @Prop({ required: false, default: "" })
  value!: string | null;

  @Prop({ required: false, default: 128 })
  width!: number;

  @Prop({ required: false, default: 128 })
  height!: number;

  @Prop({ required: false, default: 1 })
  punch!: number;

  get pixels() {
    if (this.value && this.isValid)
      return decode(this.value, this.width, this.height, this.punch);
    return [];
  }

  get isValid() {
    return this.value && isBlurhashValid(this.value).result;
  }

  mounted() {
    this.reset();
  }

  reset() {
    const ctx = (this.$el as HTMLCanvasElement).getContext("2d");
    this.$nextTick(() => {
      if (this.pixels.length) {
        const imageData = ctx!.createImageData(this.width, this.height);
        imageData.data.set(this.pixels);
        ctx!.putImageData(imageData, 0, 0);
      }
    });
  }

  @Watch("pixels")
  onPixelsChanged = this.reset;
}
</script>