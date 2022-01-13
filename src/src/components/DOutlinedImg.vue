<template>
  <div class="d-outlined-img">
    <d-circle :size="size" :fill="fill" :color="color">
      <div class="img-center">
        <slot
          v-bind="{
            width: size,
            height: size,
            size: size,
          }"
        >
          <d-img
            :height="size"
            :width="size"
            v-bind="$attrs"
            v-on="$listeners"
          />
        </slot>
      </div>
    </d-circle>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class DOutlinedImg extends Vue {
  @Prop({ required: false, default: 160, type: Number })
  size!: number;

  @Prop({ required: false, default: "white" })
  fill!: boolean;

  @Prop({ required: false, default: "blue" })
  color!: string;

  @Prop({ required: false, default: false, type: Boolean })
  fullfill!: boolean;

  get sizeFactor() {
    return this.fullfill ? 0.93 : 0.65;
  }
}
</script>