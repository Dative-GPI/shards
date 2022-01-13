<template>
  <div :style="{ width: size + 'px', height: size + 'px' }">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 100 100"
      :fill="fill"
      xmlns="http://www.w3.org/2000/svg"
      class="d-circle"
    >
      <clipPath :id="clipPath">
        <path
          d="M73.8087 93.764L73.8075 93.7647C55.6951 104.413 31.5475 97.4425 17.0882 85.0933L17.0833 85.0892C2.66762 72.936 -1.91114 55.6257 2.75871 38.2545C7.54513 20.6921 21.6793 3.23312 42.035 1.20364C52.2514 0.185066 64.1344 3.03039 74.3984 8.78961C84.6623 14.5487 93.1908 23.1544 96.8381 33.5458C100.488 43.9869 99.3045 56.3703 94.8786 67.5264C90.4522 78.6836 82.8375 88.4727 73.8087 93.764Z"
          :transform="`scale(${scale})`"
        />
      </clipPath>
      <path
        d="M73.8087 93.764L73.8075 93.7647C55.6951 104.413 31.5475 97.4425 17.0882 85.0933L17.0833 85.0892C2.66762 72.936 -1.91114 55.6257 2.75871 38.2545C7.54513 20.6921 21.6793 3.23312 42.035 1.20364C52.2514 0.185066 64.1344 3.03039 74.3984 8.78961C84.6623 14.5487 93.1908 23.1544 96.8381 33.5458C100.488 43.9869 99.3045 56.3703 94.8786 67.5264C90.4522 78.6836 82.8375 88.4727 73.8087 93.764Z"
        :stroke="color"
        :stroke-width="borderWidth"
      />
    </svg>
    <div
      :style="{
        'clip-path': `url(#${clipPath})`,
        width: size + 'px',
        height: size + 'px',
        top: borderWidth + 'px',
        left: borderWidth + 'px',
        position: 'absolute',
      }"
    >
      <slot v-bind="{ clipPath }"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DCircle extends Vue {
  @Prop({required: false, default: 2, type: Number})
  borderWidth!: number

  @Prop({ required: false, default: 400, type: Number })
  size!: number;

  @Prop({ required: false, default: "blue-2" })
  color!: string;

  @Prop({ required: false, default: "white" })
  fill!: string;

  clipPath = "svgPath";

  get scale() {
    return (this.size - (this.borderWidth * 2)) / 100;
  }
}
</script>