<template>
  <v-row no-gutters align="center">
    <d-chip-group :column="column" :style="{ 'max-width': maxWidth }">
      <d-chip
        v-for="(item, index) in value"
        class="black-1--text"
        :key="
          complex
            ? itemValue instanceof Function
              ? itemValue(item)
              : item[itemValue] || index
            : item
        "
        :close="editable"
        @click:close="() => remove(item)"
      >
        <slot name="item" v-bind="{ item, index }">{{
          itemText instanceof Function ? itemText(item) : item[itemText] || item
        }}</slot>
      </d-chip>
    </d-chip-group>
    <div v-if="editable">
      <slot name="input">
        <d-text-field
          v-if="!complex"
          class="nopadding"
          solo
          :placeholder="inputLabel"
          @keypress.enter="add"
          @blur="add"
          v-model="text"
          :style="`width: ${inputSize}ch;`"
          prefix="|"
          :rules="[required ? !!value.length || requiredMessage : true]"
        />
      </slot>
    </div>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  data: () => ({
    Function,
  }),
})
export default class DChipSet extends Vue {
  @Prop({ required: true })
  value!: string[] | any[];

  @Prop({ required: false, default: true })
  editable!: boolean;

  @Prop({ required: false, default: "Add new" })
  inputLabel!: string;

  @Prop({ required: false, default: "100%" })
  maxWidth!: string;

  @Prop({ required: false, default: "text" })
  itemText!: string | Function;

  @Prop({ required: false, default: "value" })
  itemValue!: string | Function;

  @Prop({ required: false, default: false, type: Boolean })
  column!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  required!: boolean;

  @Prop({ required: false, default: "Required" })
  requiredMessage!: string;

  get complex() {
    return (
      this.value &&
      this.value.length > 0 &&
      this.value[0] !== null &&
      this.value[0] instanceof Object
    );
  }

  text = "";

  remove(group: string): void {
    this.$emit("remove", group);
    this.$emit(
      "input",
      this.value.filter((g) => g !== group)
    );
  }

  add(): void {
    if (this.text && this.text.length > 0) {
      if (!this.value) {
        this.$emit("input", [this.text]);
        this.text = "";
      } else if (!this.value.some((t) => t == this.text)) {
        this.$emit("input", [...this.value, this.text]);
        this.text = "";
      }
    }
  }

  get inputSize() {
    return (
      Math.max(this.inputLabel.length, (this.text && this.text.length) || 0) + 2 // Hack: inputLabel might be wider than {inputLabel.length} ch
    );
  }
}
</script>