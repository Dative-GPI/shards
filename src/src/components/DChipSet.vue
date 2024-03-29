<template>
  <v-row no-gutters align="center">
    <d-chip-group :column="column" :style="{ 'max-width': maxWidth }">
      <d-chip
        v-for="(item, index) in value"
        :class="minified ? 'my-0' : ''"
        :key="index"
        :close="editable"
        @click:close="() => remove(item)"
      >
        <slot name="item" v-bind="{ item, index }">
          <span class="text-body-1">
            {{ itemText && itemText instanceof Function ? itemText(item) : item && item[itemText] || item }}
          </span>
        </slot>
      </d-chip>
    </d-chip-group>
    <div v-if="editable">
      <slot name="input">
        <d-text-field
          v-if="!complex"
          solo
          prefix="|"
          class="nopadding"
          :placeholder="inputLabel"
          :rules="[required ? !!value.length || requiredMessage : true]"
          :style="`width: ${inputSize}ch; ${minified ? '' : 'height: 40px'}; alignItems: center;`"
          v-model="text"
          @keypress.enter="add"
          @blur="add"
        />
      </slot>
    </div>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

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

  @Prop({ required: false, default: 1 })
  minLength!: number;

  @Prop({ required: false, default: false, type: Boolean })
  column!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  required!: boolean;

  @Prop({ required: false, default: "Required" })
  requiredMessage!: string;

  @Prop({ required: false, default: false })
  minified!: boolean;

  get complex() {
    return (
      this.value &&
      this.value.length > 0 &&
      this.value[0] !== null &&
      this.value[0] instanceof Object
    );
  }

  text: string = "";

  remove(group: string): void {
    this.$emit("remove", group);
    this.$emit("input", this.value.filter((g) => g !== group));
  }

  add(): void {
    if (this.text.length >= this.minLength) {
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
      // Hack: inputLabel might be wider than {inputLabel.length} ch
      Math.max(this.inputLabel.length, (this.text && this.text.length) || 0) + 2
    );
  }
}
</script>