<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    class="d-data-table"
    fixed-header
    :hide-default-header="!showDefaultHeader"
    :headers="headers"
    :items="filteredItems"
    :single-select="singleSelect"
  >
    <template v-slot:header="{ props, on }" v-if="showCustomHeader">
      <thead>
        <tr>
          <d-draggable-data-header-variant
            v-for="(header, i) in props.headers"
            :key="i"
            :header="header"
            :every-item="props.everyItem"
            :some-items="props.someItems"
            :single-select="singleSelect"
            :options="props.options"
            :filter="filters[header.value]"
            :sort="on['sort']"
            :toggle-select-all="on['toggle-select-all']"
          >
            <template
              v-for="(index, name) in $scopedSlots"
              v-slot:[name]="data"
            >
              <slot :name="name" v-bind="data"></slot>
            </template>
          </d-draggable-data-header-variant>
        </tr>
      </thead>
    </template>

    <template #body="props">
      <draggable
        :value="props.items"
        @input="$emit('update:items', $event)"
        :disabled="disableDrag"
        ghost-class="ghost"
        tag="tbody"
      >
        <d-draggable-data-row-variant
          v-for="(item, i) in props.items"
          :key="i"
          :item="item"
          :headers="props.headers"
          :item-class="itemClass"
          @click:row="(item) => $emit('click:row', item)"
        >
          <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>

          <template #[`item.data-table-select`]="selectProps">
            <v-row no-gutters class="align-bottom justify-center">
              <d-simple-checkbox
                :value="props.isSelected(selectProps.item)"
                @click="
                  props.select(
                    selectProps.item,
                    !props.isSelected(selectProps.item)
                  )
                "
              />
            </v-row>
          </template>

          <template #[`item.drag-icon`]>
            <v-row no-gutters class="align-bottom justify-center">
              <v-icon class="drag-cursor">mdi-drag</v-icon>
            </v-row>
          </template>
        </d-draggable-data-row-variant>
      </draggable>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import _ from "lodash";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Draggable from "vuedraggable";

import { Column, FilterValue } from "../models";

@Component({
  inheritAttrs: false,
  components: {
    Draggable,
  },
})
export default class DDraggableDataTableVariant extends Vue {
  // Properties

  @Prop({ required: true })
  columns!: Column[];

  @Prop({ required: false, default: "text" })
  columnText!: string;

  @Prop({ required: false, default: "value" })
  columnValue!: string;

  @Prop({ required: false, default: "index" })
  columnPosition!: string;

  @Prop({ required: false, default: false, type: Boolean })
  singleSelect!: boolean;

  @Prop({ required: true })
  items!: any[];

  @Prop({ required: false, default: false })
  hideHeader!: boolean;

  @Prop({ required: false, default: () => () => "" })
  itemClass!: (item: any) => string;

  @Prop({ required: false, default: false, type: Boolean })
  disableDrag!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  hideHandle!: boolean;

  // Data

  filters: { [key: string]: FilterValue[] } = {};

  // Computed Properties

  get showDefaultHeader() {
    return !this.hideHeader && this.$vuetify.breakpoint.xs;
  }

  get showCustomHeader() {
    return !this.hideHeader && !this.$vuetify.breakpoint.xs;
  }

  get headers() {
    const visibleColumns = this.columns.filter((c) => !c.hidden);

    const sortedVisibleColumns = visibleColumns.sort(
      (c1, c2) => c1[this.columnPosition] - c2[this.columnPosition]
    );

    if (!this.hideHandle) {
      sortedVisibleColumns.unshift({
        text: "",
        value: "drag-icon",
        canBeFiltered: false,
        hidden: false,
        index: -2,
      });
    }

    return sortedVisibleColumns.map((c): Column => {
      const { text, value, filterable, canBeFiltered, ...others } = c;
      return {
        text: c[this.columnText] || text,
        value: c[this.columnValue] || value,
        slotName: `item.${c[this.columnValue] || value}`,
        canBeFiltered: canBeFiltered || filterable,
        ...others,
      };
    });
  }

  get itemsSlots() {
    return this.headers.filter((h) => this.$scopedSlots[h.slotName!]);
  }

  get filteredItems() {
    return this.items.filter((i) =>
      _(this.filters).reduce<boolean>(
        (include, filterValues, key) =>
          include && this.filterItem(filterValues, i[key]),
        true
      )
    );
  }

  // Methods

  mounted() {
    this.computeFilters();
  }

  computeFilters() {
    const filterableHeaders = this.headers.filter((h) => h.canBeFiltered);
    const filterDict: { [key: string]: FilterValue[] } = {};

    for (const col of filterableHeaders) {
      const key = col.value!;

      if (col.fixedFilters != null) {
        const value = col.fixedFilters.map(
          (ff): FilterValue => ({
            hidden: false,
            text: (ff.text && ff.text.toString()) || "—",
            value: ff.value || null,

            filter:
              col.methodFilter != null
                ? col.methodFilter
                : (value, item) => {
                    item = [item].flat();
                    return Array.isArray(item)
                      ? item.includes(ff.value) ||
                          (!ff.value && item.length == 0)
                      : (!ff.value && !item) || ff.value == item;
                  },
          })
        );

        const sortedValue = value.sort((v1, v2) => {
          return v1.text.localeCompare(v2.text, undefined, { numeric: true });
        });

        filterDict[key] = sortedValue;
      } else {
        const mapToInnerValue = col.innerValue ? col.innerValue : (i: any) => i;
        const itemValues = this.items
          .flatMap((item) =>
            Array.isArray(item[key]) && item[key].length == 0
              ? undefined
              : item[key]
          )
          .map(mapToInnerValue);

        const distinctValues = [...new Set(itemValues)];

        const value = distinctValues.map(
          (v): FilterValue => ({
            hidden: false,
            text: (v && v.toString()) || "—",
            value: v || null,

            filter:
              col.methodFilter != null
                ? col.methodFilter
                : (value, item) => {
                    item = [item].flat().map(mapToInnerValue);
                    return Array.isArray(item)
                      ? item.includes(v) || (!v && item.length == 0)
                      : (!v && !item) || v == item;
                  },
          })
        );

        const sortedValue = value.sort((v1, v2) => {
          return v1.text.localeCompare(v2.text, undefined, { numeric: true });
        });

        filterDict[key] = sortedValue;
      }
    }
    this.filters = filterDict;
  }

  filterItem(values: FilterValue[], item: any): boolean {
    return values
      .filter((v) => !v.hidden)
      .some((v) => !!v.filter && v.filter(v.value, item));
  }

  // Watchers

  @Watch("items")
  onItemsChanged = this.computeFilters;
}
</script>

<style scoped>
.ghost {
  opacity: 0.5;
}

.drag-cursor {
  cursor: grab;
}
</style>
