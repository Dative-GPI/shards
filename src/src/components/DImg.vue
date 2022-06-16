<template>
  <div
    :style="{
      width: width + 'px',
      height: height + 'px',
      position: 'relative',
    }"
  >
    <v-img
      v-bind="$attrs"
      v-on="$listeners"
      :width="width"
      :height="height"
      :src="realSource"
      :key="index"
      class="d-img"
      :contain="(!value && !src) || contain"
    >
      <slot> </slot>
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </v-img>
    <slot name="actions">
      <d-btn-file
        :class="{ hidden: !editable }"
        class="d-btn-edit-img"
        icon="mdi-pencil"
        @input="update"
        accept="image/*"
      />
      <d-btn-remove
        :class="{ hidden: !editable }"
        class="d-btn-remove-img"
        @click="$emit('remove')"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DImg extends Vue {
  // Properties

  @Prop({ required: false, default: "" })
  value!: string;

  @Prop({ required: false, default: "" })
  type!: string;

  @Prop({ required: false, default: "" })
  src!: string;

  @Prop({ required: false, default: false, type: Boolean })
  editable!: boolean;

  @Prop({ required: false, default: 200 })
  width!: number;

  @Prop({ required: false, default: 200 })
  height!: number;

  @Prop({ required: false, default: false })
  contain!: boolean;

  // Data

  index = 0;
  valueData = "";
  valueType = "";

  // Computed Properties

  get realSource() {
    if (!!this.valueData && !!this.valueType)
      return [this.valueType, this.valueData].join(",");
    return this.src || require("../assets/img-placeholder.svg");
  }

  // Methods

  update(event: string) {
    if (event) {
      this.syncValue(event);
      this.$emit("input", this.valueData);
      this.$emit("update:type", this.valueType);
    }
  }

  syncValue(value: string) {
    const [type, data] = value.split(",");
    this.valueType = type;
    this.valueData = data;
  }

  @Watch("index")
  onSourceChanged() {
    this.index++;
  }

  @Watch("value")
  onValueChanged() {
    if (this.value && this.value.includes(",")) this.syncValue(this.value);
    else this.valueData = this.value ?? "";
  }

  @Watch("type")
  onTypeChanged() {
    this.valueType = this.type ?? "";
  }
}
</script>
