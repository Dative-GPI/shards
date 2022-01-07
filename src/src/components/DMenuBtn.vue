<template>
  <d-menu
    offset-y
    bottom
    :close-on-content-click="false"
    v-model="expanded"
    :ripple="false"
    min-width="200px"
  >
    <template #activator="{ on }">
      <slot name="activator" v-bind="{ on }">
        <d-btn-latch
          v-bind="$attrs"
          v-on="on"
          class="d-columns-btn"
          icon="mdi-view-week"
          >{{ label }}
        </d-btn-latch>
      </slot>
    </template>
    <d-list dense class="pb-0">
      <d-list-item v-if="searchable">
        <d-search-input :label="searchLabel" v-model="search" />
      </d-list-item>
      <d-list-item>
        <d-simple-checkbox
          :ripple="false"
          class="ma-0 pa-0"
          :value="allSelected"
          :indeterminate="!noneSelected && !allSelected"
          @input="toggleAllColumns()"
        />
        <span class="ml-3">{{ showAllText }}</span>
      </d-list-item>
    </d-list>
    <d-list dense style="max-height: 250px; overflow-y: auto" class="pt-0">
      <draggable
        :value="sortedColumns"
        @input="dropColumn"
        :disabled="!sortable"
      >
        <d-list-item v-for="column in sortedColumns" :key="column[itemValue]">
          <d-icon v-if="sortable" class="d-cursor-drag pr-1">mdi-drag</d-icon>
          <d-simple-checkbox
            :ripple="false"
            class="ma-0 pa-0"
            :value="!column.hidden"
            @input="toggleColumn(column)"
            @click.ctrl="onlyColumn(column)"
          />
          <span class="ml-3">{{ column[itemText] }}</span>
        </d-list-item>
      </draggable>
    </d-list>
  </d-menu>
</template>

<script lang="ts">
import _ from "lodash";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Draggable from "vuedraggable";

import { Column } from "../models";

@Component({
  inheritAttrs: false,
  components: {
    Draggable,
  },
})
export default class DMenuBtn extends Vue {
  @Prop({ required: false, default: "Columns" })
  label!: string;

  @Prop({ required: false, default: "Show all" })
  showAllText!: string;

  @Prop({ required: true })
  value!: Column[];

  @Prop({ required: false, default: "text" })
  itemText!: string;

  @Prop({ required: false, default: "value" })
  itemValue!: string;

  @Prop({ required: false, default: "Search" })
  searchLabel!: string;

  @Prop({ required: false, default: true })
  responsive!: boolean;

  @Prop({ required: false, default: true })
  searchable!: boolean;

  @Prop({ required: false, default: true })
  sortable!: boolean;

  formerColumns: Column[] = [];

  expanded = false;
  search = "";

  @Watch("expanded")
  close() {
    if (this.expanded) {
      this.$emit("close");
    }
  }

  get allSelected() {
    return !this.value.some((c) => c.hidden);
  }

  get noneSelected() {
    return this.value.every((c) => c.hidden);
  }

  get sortedColumns() {
    return _(this.value)
      .filter(
        (c: Column) =>
          c[this.itemText] &&
          c[this.itemText].toLowerCase().includes(this.search.toLowerCase())
      )
      .sortBy((c: Column) => c.index)
      .value();
  }

  toggleAllColumns() {
    if (this.allSelected) {
      if (this.formerColumns.length) {
        this.$emit("input", this.formerColumns);
      } else {
        this.$emit(
          "input",
          this.value.map((c: Column) => {
            const { hidden, ...old } = c;
            return {
              ...old,
              hidden: true,
            };
          })
        );
      }
    } else {
      this.formerColumns = this.value.map((c: Column) => ({ ...c }));

      this.$emit(
        "input",
        this.value.map((c: Column) => {
          const { hidden, ...old } = c;
          return {
            ...old,
            hidden: false,
          };
        })
      );
    }
  }

  onlyColumn(column: Column): void {
    this.formerColumns = [];
    this.$emit(
      "input",
      this.value.map((c: Column) => {
        const { hidden, ...old } = c;
        return {
          ...old,
          hidden: c[this.itemValue] == column[this.itemValue] ? false : true,
        };
      })
    );
  }

  toggleColumn(column: Column): void {
    this.formerColumns = [];
    this.$emit(
      "input",
      this.value.map((c: Column) => {
        const { hidden, ...old } = c;
        return {
          ...old,
          hidden:
            c[this.itemValue] == column[this.itemValue] ? !c.hidden : c.hidden,
        };
      })
    );
  }

  dropColumn(value: Column[]) {
    this.formerColumns = [];
    this.$emit(
      "input",
      value.map((c: Column, i: number) => {
        const { index, ...old } = c;
        return {
          ...old,
          index: i,
        };
      })
    );
  }
}
</script>