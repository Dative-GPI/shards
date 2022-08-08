<template>
  <v-form class="pa-2" v-model="valid">
    <v-row no-gutters class="mt-5" align="center">
      <v-col cols="6">
        <d-text-field
          class="text-body-1 mr-2"
          type="number"
          :min="minWidth"
          :max="maxWidth"
          :label="widthLabel"
          :rules="[ v =>
            !isNaN(parseInt(v)) &&
            minWidth != null ? parseInt(v) >= minWidth : true &&
            maxWidth != null ? parseInt(v) <= maxWidth : true
          ]"
          :value="parseInt(width)"
          @input="onWidthChange"
        />
      </v-col>
      <v-col cols="6">
        <d-text-field
          class="text-body-1 mr-2"
          type="number"
          :min="minHeight"
          :max="maxHeight"
          :label="heightLabel"
          :rules="[v =>
            !isNaN(parseInt(v)) &&
            minHeight != null ? parseInt(v) >= minHeight : true &&
            maxHeight != null ? parseInt(v) <= maxHeight : true
          ]"
          :value="parseInt(height)"
          @input="onHeightChange"
        />
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-5" align="center">
      <d-simple-checkbox
        class="mr-2"
        :editable="true"
        :ripple="false"
        :value="hideBorders === 'true'"
        @input="onHideBordersChange"
      />
      <span class="text-body-1 mr-2">
        {{ hideBordersLabel }}
      </span>
    </v-row>
    <slot name="configuration"></slot>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class DBaseConfiguration extends Vue {
  @Prop({ required: true })
  widthLabel!: string;

  @Prop({ required: false, default: undefined })
  minWidth!: number | undefined;

  @Prop({ required: false, default: undefined })
  maxWidth!: number | undefined;

  @Prop({ required: true })
  defaultWidth!: number;

  @Prop({ required: true })
  width!: string;

  @Prop({ required: true })
  heightLabel!: string;

  @Prop({ required: false, default: undefined })
  minHeight!: number | undefined;

  @Prop({ required: false, default: undefined })
  maxHeight!: number | undefined;

  @Prop({ required: true })
  defaultHeight!: number;

  @Prop({ required: true })
  height!: string;

  @Prop({ required: true })
  hideBordersLabel!: string;

  @Prop({ required: true })
  hideBorders!: "false" | "true";

  valid: boolean = false;

  @Watch("valid")
  onValidChange() {
    this.$emit("update:valid", this.valid);
  }

  onWidthChange(value: string): void {
    let width: number = isNaN(parseInt(value)) ? this.defaultWidth : parseInt(value);
    if (this.minWidth != null) {
      width = Math.max(this.minWidth, width);
    }
    if (this.maxWidth != null) {
      width = Math.min(this.maxWidth, width);
    }
    this.$emit("update:width", width.toString());
  }

  onHeightChange(value: string): void {
    let height: number = isNaN(parseInt(value)) ? this.defaultHeight : parseInt(value);
    if (this.minHeight != null) {
      height = Math.max(this.minHeight, height);
    }
    if (this.maxHeight != null) {
      height = Math.min(this.maxHeight, height);
    }
    this.$emit("update:height", height.toString());
  }

  onHideBordersChange(value: boolean): void {
    this.$emit("update:hideBorders", value.toString());
  }
}
</script>