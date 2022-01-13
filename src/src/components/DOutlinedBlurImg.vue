<template>
  <d-outlined-img v-bind="$attrs" :fullfill="fullfill" :size="size">
    <template #default="{ width, height }">
      <d-blur-img
        :width="width"
        :height="height"
        :image-width="imageWidth"
        :image-height="imageHeight"
        :image-blur-hash="imageBlurHash"
        :src="src"
        :editable="editable"
        :fullfill="fullfill"
        v-bind="$attrs"
        v-on="$listeners"
      />
    </template>
  </d-outlined-img>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DOutlinedBlurImg extends Vue {
  @Prop({ required: false, default: true, type: Boolean })
  fullfill!: boolean;

  @Prop({ required: true, type: String })
  imageBlurHash!: string;

  @Prop({ required: true, type: Number })
  imageHeight!: number;

  @Prop({ required: true, type: Number })
  imageWidth!: number;

  @Prop({ required: false, default: 100, type: Number })
  size!: number;

  @Prop({ required: false, default: false, type: Boolean })
  editable!: boolean;

  @Prop({ required: true, type: String })
  src!: string;
}
</script>