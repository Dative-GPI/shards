<template>
  <d-card
    :width="width"
    :height="height"
    :ripple="false"
    elevation="0"
    class="d-tile"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="d-tile-image">
      <slot name="image">
        <d-outlined-img
          fill="white"
          color="blue"
          circle
          :size="160"
          :img-src="imgSrc"
        />
      </slot>
    </div>

    <div class="d-tile-status">
      <slot name="status" />
    </div>

    <div v-if="selectable" class="d-tile-checkbox">
      <d-simple-checkbox
        :ripple="false"
        :value="value"
        @input="$emit('input', !value)"
      />
    </div>

    <div class="d-tile-footer">
      <slot name="footer" />
    </div>
  </d-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  inheritAttrs: false
})
export default class DTile extends Vue {
  @Prop({required: false, default: 300, type: Number})
  width!: number

  @Prop({required: false, default: 230, type: Number})
  height!: number

  @Prop({ required: false, default: false })
  selectable!: boolean;

  @Prop({ required: false, default: false })
  value!: boolean;

  @Prop({required: true})
  imgSrc!: string;
}
</script>