<template>
  <div :style="{ height: size + 'px', width: size + 'px' }" class="d-outlined-img">
    <d-circle :height="size" :width="size" :fill="fill" :color="color" />
    <div class="img-center">
      <d-img
        v-if="!editable"
        :src="imgSrc"
        :height="size * sizeFactor"
        :width="size * sizeFactor"
        v-bind="$attrs"
        :class="classCircle"
      />
      <v-btn icon v-else>
        <v-icon>add</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class DOutlinedImg extends Vue {
  @Prop({ required: false, default: 160, type: Number })
  size!: number;

  @Prop({ required: true })
  fill!: boolean;

  @Prop({ required: true })
  color!: string;

  @Prop({ required: false, default: "" })
  imgSrc!: string;

  @Prop({ required: false, default: false, type: Boolean })
  editable!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  circle!: boolean;

  get sizeFactor() {
    return this.circle ? 0.93 : 0.65;
  }

  get classCircle() {
    return this.circle ? "rounded-circle" : "";
  }
}
</script>