<template>
  <d-outlined-img v-bind="$attrs">
    <template #default="{ width, height }">
      <d-blur-img
        :width="width"
        :height="height"
        :image-width="imageWidth"
        :image-height="imageHeight"
        :image-blur-hash="imageBlurHash"
        :fullfill="fullfill"
        v-on="$listeners"
        v-bind="$attrs"
      >

      <slot> </slot>
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
      </d-blur-img>
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
}
</script>
