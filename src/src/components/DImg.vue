<template>
  <div :style="{ width: 'inherit', height: 'inherit' }">
    <v-img
      v-bind="$attrs"
      v-on="$listeners"
      :src="realSource"
      :key="index"
      class="d-img"
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
  @Prop({ required: false, default: "" })
  value!: string;

  @Prop({ required: false, default: "" })
  src!: string;

  @Prop({ required: false, default: false, type: Boolean })
  editable!: boolean;

  get realSource() {
    return !!this.value
      ? [this.valueType, this.value].join(",")
      : this.src || require("../assets/img-placeholder.svg");
  }

  update(event: string) {
    if (event) {
      const parts = event.split(",");
      this.valueType = parts[0];
      this.$emit("input", parts[1]);
    }
  }

  index = 0;
  valueType = "";

  @Watch("index")
  onSourceChanged() {
    this.index++;
  }

  @Watch("value")
  onValueChanged() {
    if (!this.value || this.value.includes(",")) {
      this.valueType = "";
    }
  }
}
</script>