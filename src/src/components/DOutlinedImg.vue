<template>
  <div
    class="d-outlined-img"
    :style="{ height: size + 'px', width: size + 'px' }"
  >
    <d-circle :size="size" :fill="$color(fill)" :color="$color(color)">
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
    <d-btn-file
      v-if="editable"
      class="d-btn-edit-outlined-img"
      icon="mdi-pencil"
      @input="$emit('input', $event)"
      accept="image/*"
    />
    <d-btn-remove
      v-if="editable"
      class="d-btn-remove-outlined-img"
      @click="$emit('remove')"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class DOutlinedImg extends Vue {
  @Prop({ required: false, default: false })
  editable!: boolean;

  @Prop({ required: false, default: 160, type: Number })
  size!: number;

  @Prop({ required: false, default: "white" })
  fill!: string;

  @Prop({ required: false, default: "blue-2" })
  color!: string;
}
</script>