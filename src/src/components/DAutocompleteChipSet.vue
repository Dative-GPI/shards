<template>
  <div :style="{ display: 'inline-flex', alignItems: 'center', height: height }">
    <d-chip-group>
      <d-chip
        v-for="(item, index) in value"
        :key="index"
        :close="editable"
        @click:close="() => remove(item)"
      >
        <slot name="item" v-bind="{ item, index }">
          <v-row no-gutters align="center">
            <span class="text-body-1"> {{ item[itemLabel] }} </span>
            <d-icon class="ml-2" v-if="!itemsOnly && !item.isCustom" :size="20"> {{ itemsIcon }} </d-icon>
          </v-row>
        </slot>
      </d-chip>
    </d-chip-group>
    <div v-if="editable">
      <slot name="input">
        <v-combobox
          v-if="!itemsOnly"
          v-model="text"
          :items="items"
          :itemValue="itemKey"
          :itemText="itemLabel"
          :outlined="outlined"
          :rules="[required ? !!value.length : true]"
          :style="{ maxWidth: maxWidth, height: height, alignItems: 'center', paddingTop: '4px !important' }"
          :placeholder="inputLabel"
          @keydown.enter="(event) => !!event.target.value.length ? null : add(event.target.value)"
          @change="(value) => add(value)"
        />
        <d-autocomplete
          v-else
          v-model="text"
          :items="items"
          :itemValue="itemKey"
          :itemText="itemLabel"
          :outlined="outlined"
          :returnObject="true"
          :rules="[required ? !!value.length : true]"
          :style="{ maxWidth: maxWidth, height: height, alignItems: 'center', paddingTop: '4px !important' }"
          :placeholder="inputLabel"
          @change="(value) => add(value)"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DAutocompleteChipSet extends Vue {
  @Prop({ required: true })
  value!: any[];

  @Prop({ required: true })
  items!: any[];

  @Prop({ required: false, default: "id" })
  itemKey!: string;

  @Prop({ required: false, default: "label" })
  itemLabel!: string;

  @Prop({ required: false, default: true })
  editable!: boolean;

  @Prop({ required: false, default: false })
  outlined!: boolean;

  @Prop({ required: false, default: false })
  itemsOnly!: boolean;

  @Prop({ required: false, default: false })
  required!: boolean;

  @Prop({ required: false, default: "mdi-link" })
  itemsIcon!: string;

  @Prop({ required: false, default: "Add new" })
  inputLabel!: string;

  @Prop({ required: false, default: "100%" })
  maxWidth!: string;

  @Prop({ required: false, default: "40px" })
  height!: string;

  @Prop({ required: false, default: 0 })
  minLength!: number;

  text: string = "";

  remove(group: any): void {
    this.$emit("remove", group);
    this.$emit("input", this.value.filter((g) => g !== group));
  }

  add(value: any): void {
    console.log(value);
    if (typeof(value) !== "string") {
      if (value != null) {
        if (!this.value.some((t: any) => t[this.itemKey] == value[this.itemKey])) {
          this.$emit("input", [...this.value, {
            isCustom: false,
            [this.itemKey]: value[this.itemKey],
            [this.itemLabel]: value[this.itemLabel]
          }]);
          this.$nextTick(() => {
            this.text = "";
          });
        }
      }
    }
    else if (this.text.length >= this.minLength) {
      if (!this.value.some((t: any) => t.isCustom && t[this.itemLabel] == this.text))
      this.$emit("input", [...this.value, {
        isCustom: true,
        [this.itemLabel]: this.text
      }]);
      this.$nextTick(() => {
        this.text = "";
      });
    }
  }
}
</script>