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
import { ImageResizerInstance } from "@/tools";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DImg extends Vue {
  // Properties

  @Prop({ required: false, default: "" })
  value!: string;

  @Prop({ required: false, default: "" })
  src!: string;

  @Prop({ required: false, default: false, type: Boolean })
  editable!: boolean;

  @Prop({ required: false, default: 200 })
  width!: number;

  @Prop({ required: false, default: 200 })
  height!: number;

  @Prop({ required: false, default: false, type: Boolean })
  contain!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  resize!: boolean;

  @Prop({ required: false, default: 0 })
  resizeSize!: number;

  // Data

  index = 0;

  signatures: { [key: string]: string } = {
    JVBERi0: "application/pdf",
    R0lGODdh: "image/gif",
    R0lGODlh: "image/gif",
    iVBORw0KGgo: "image/png",
    "/9j/": "image/jpg",
  };

  // Computed Properties

  get type() {
    if (this.value && this.value.includes(",")) return this.value.split(",")[0];
    if (this.value)
      for (const s in this.signatures)
        if (this.value.startsWith(s))
          return `data:${this.signatures[s]};base64`;
    return "";
  }

  get imageData() {
    if (this.value && this.value.includes(",")) return this.value.split(",")[1];
    return this.value;
  }

  get realSource() {
    if (!!this.imageData && !!this.type)
      return [this.type, this.imageData].join(",");
    return this.src || require("../assets/img-placeholder.svg");
  }

  // Methods

  async update(event: string) {
    if (!event) return;

    const imageData = (
      this.resize ?
      await ImageResizerInstance.resizeImage(event, this.resizeSize) :
      event
    );
    const [type, data] = imageData.split(",");

    this.$emit("input", data);
    this.$emit("update:type", type);
  }

  // Lifecycle

  @Watch("index")
  onSourceChanged() {
    this.index++;
  }
}
</script>
