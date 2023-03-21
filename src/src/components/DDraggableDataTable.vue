<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    class="d-data-table"
    fixed-header
    :hide-default-header="!showDefaultHeader"
    :headers="headers"
    :items="filteredItems"
    :show-select="showSelect"
    :single-select="singleSelect"
    :value="value"
    @input="(value) => $emit('input', value)"
  >
    <template v-slot:header="{ props, on }" v-if="showCustomHeader">
      <thead>
        <tr>
          <th
            v-for="header in props.headers"
            class="d-data-table-header"
            :key="header.value"
            :style="{ width: (header.width && header.width + 'px') || undefined }"
          >
            <v-row
              v-if="header.value == 'data-table-select' && !singleSelect"
              no-gutters
              class="justify-center"
            >
              <d-simple-checkbox
                class="d-toggle-select-all"
                :value="props.everyItem"
                :indeterminate="props.someItems && !props.everyItem"
                @click="on['toggle-select-all'](!(props.everyItem || props.someItems))"
              />
            </v-row>

            <v-row
              v-else
              no-gutters
              class="align-center text-body-1 h-100"
              :class="{
                'flex-row-reverse': header.align === 'end',
                'justify-center': header.align === 'center',
              }"
            >
              <slot :name="`header.${header.value}-left-prepend`" />

              <slot :name="`header.${header.value}`">
                <span class="d-data-table-header-text grey-3--text text-body-1">
                  {{ header.text }}
                </span>
              </slot>

              <d-btn
                v-if="header.configurable"
                icon
                @click="configured === header.value ? (configured = null) : (configured = header.value)"
              >
                <d-icon
                  small
                  :color="configured === header.value ? 'alert-orange' : 'grey-1'"
                >
                  {{ configurationIcon }}
                </d-icon>
              </d-btn>

              <slot :name="`header.${header.value}-left-append`" />

              <template v-if="header.sortable || header.canBeFiltered">
                <v-spacer />

                <slot :name="`header.${header.value}-right-prepend`" />

                <d-btn
                  v-if="header.sortable"
                  icon
                  @click="on.sort(header.value)"
                >
                  <template v-if="props.options.sortBy.includes(header.value)">
                    <d-icon color="blue-1" small>
                      {{
                        props.options.sortDesc[props.options.sortBy.indexOf(header.value)] ?
                          "mdi-sort-ascending" : "mdi-sort-descending"
                      }}
                    </d-icon>
                  </template>

                  <template v-else>
                    <d-icon color="grey-1" small>mdi-sort-ascending</d-icon>
                  </template>
                </d-btn>

                <d-menu-btn
                  v-if="header.canBeFiltered && filters[header.value]"
                  :value="filters[header.value]"
                  :sortable="false"
                  @input="(value) => toggleFilters(header.value, value)"
                >
                  <template #activator="{ on }">
                    <d-btn icon v-on="on">
                      <d-icon
                        small
                        :color="filters[header.value].every((c) => !c.hidden) ? 'grey-1' : 'blue-1'"
                      >
                        mdi-filter
                      </d-icon>
                    </d-btn>
                  </template>

                  <template #item="{ defaultValue, item, on }">
                    <slot
                      :name="`header.${header.value}.filter.item`"
                      v-bind="{ item, on }"
                    >
                      {{ defaultValue }}
                    </slot>
                  </template>
                </d-menu-btn>

                <slot :name="`header.${header.value}-right-append`" />
              </template>
            </v-row>
          </th>
        </tr>
      </thead>
    </template>

    <template #[`item.data-table-select`]="{ isSelected, select }">
      <v-row no-gutters class="align-bottom justify-center">
        <d-simple-checkbox :value="isSelected" @click="select(!isSelected)" />
      </v-row>
    </template>

    <template #item="props">
      <d-draggable-data-row
        :item="props.item"
        :headers="headers"
        :can-drop="canDrop"
        :item-class="itemClass"
        :drag-over-class="dragOverClass"
        :show-select="showSelect"
        :selected="isSelected(props.item)"
        @select="onSelectItem(props.item)"
        @click:row="(item) => $emit('click:row', item)"
        @drag="(item) => $emit('drag', item)"
        @drop="(item, target) => $emit('drop', item, target)"
      >
        <slot></slot>
        <template v-for="(index, name) in $slots" v-slot:[name]>
          <slot :name="name" />
        </template>
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>

        <template #[`item.data-table-select`]="{ isSelected, select }">
          <v-row no-gutters class="align-bottom justify-center">
            <d-simple-checkbox :value="isSelected" @click="select(!isSelected)" />
          </v-row>
        </template>
      </d-draggable-data-row>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import _ from "lodash";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { Column, FilterValue } from "../models";

@Component({
  inheritAttrs: false,
})
export default class DDraggableDataTable extends Vue {
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
  showSelect!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  singleSelect!: boolean;

  @Prop({ required: true })
  itemKey!: string;

  @Prop({ required: true })
  items!: any[];

  @Prop({ required: false, default: () => [] })
  value!: any[];

  @Prop({ required: false, default: false })
  hideHeader!: boolean;

  @Prop({ required: false, default: () => () => true })
  canDrop!: (item: any) => boolean;

  @Prop({ required: false, default: () => () => "" })
  itemClass!: (item: any) => string;

  @Prop({ required: false, default: () => () => "" })
  dragOverClass!: (item: any) => string;

  // Data
  filters: { [key: string]: FilterValue[] } = {};

  // Computed Properties
  get showDefaultHeader() {
    return !this.hideHeader && this.$vuetify.breakpoint.xs
  }

  get showCustomHeader() {
    return !this.hideHeader && !this.$vuetify.breakpoint.xs
  }

  get headers() {
    const visibleColumns = this.columns.filter((c) => !c.hidden);

    const sortedVisibleColumns = visibleColumns.sort(
      (c1, c2) => c1[this.columnPosition] - c2[this.columnPosition]
    );

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
    return this.items.filter((i) => _(this.filters).reduce<boolean>(
      (include, filterValues, key) => include && this.filterItem(filterValues, i[key]),
      true
    ));
  }

  // Methods
  mounted(): void {
    this.computeFilters();
  }

  isSelected(item: any): boolean {
    return (this.value.find(v => v[this.itemKey] === item[this.itemKey]) != null);
  }

  onSelectItem(item: any): void {
    if (this.singleSelect) {
      this.$emit("input", [item]);
    }
    else {
      let valueCopy = _.cloneDeep(this.value);
      if (valueCopy.find(v => v[this.itemKey] === item[this.itemKey])) {
        this.$emit("input", valueCopy.filter(v => v[this.itemKey] !== item[this.itemKey]));
      }
      else {
        valueCopy.push(item);
        this.$emit("input", valueCopy);
      }
    }
  }
  
  toggleFilters(header: string, value: FilterValue[]): void {
    this.filters[header] = value;
    this.$emit("update:filters", this.filters);
  }

  computeFilters(): void {
    const filterableHeaders = this.headers.filter((h) => h.canBeFiltered);
    const filterDict: { [key: string]: FilterValue[] } = {};

    for (const col of filterableHeaders) {
      const key = col.value!;
      const currentFilters = this.filters[key];

      if (col.fixedFilters != null) {
        const value = col.fixedFilters.map(
          (ff): FilterValue => ({
              hidden: currentFilters != null && currentFilters.find(f => f.value == (ff.value || null)) != null ?
                currentFilters.find(f => f.value == (ff.value || null))!.hidden : false,
              text: (ff.text && ff.text.toString()) || "—",
              value: ff.value || null,

              filter: col.methodFilter != null ? col.methodFilter : (value, item) => {
                item = [item].flat();
                return Array.isArray(item) ?
                  item.includes(value) || (!value && item.length == 0) : (!value && !item) || value == item;
              }
          })
        );

        const sortedValue = value.sort((v1, v2) => {
          return v1.text.localeCompare(v2.text, undefined, { numeric: true });
        });

        filterDict[key] = sortedValue;
      }
      else {
        const mapToInnerValue = col.innerValue ? col.innerValue : (i: any) => i;
        const itemValues = this.items
          .flatMap((item) => Array.isArray(item[key]) && item[key].length == 0 ? undefined : item[key])
          .map(mapToInnerValue);

        const distinctValues = [...new Set(itemValues)];

        const value = distinctValues.map(
          (v): FilterValue => ({
              hidden: currentFilters != null && currentFilters.find(f => f.value == (v || null)) != null ?
                currentFilters.find(f => f.value == (v || null))!.hidden : false,
              text: (v && v.toString()) || "—",
              value: v || null,

              filter: col.methodFilter != null ? col.methodFilter : (value, item) => {
                item = [item].flat().map(mapToInnerValue);
                return Array.isArray(item) ?
                  item.includes(v) || (!v && item.length == 0) : (!v && !item) || v == item;
              }
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
    return values.filter((v) => !v.hidden).some((v) => !!v.filter && v.filter(v.value, item));
  }

  @Watch("items")
  onItemsChanged = this.computeFilters;
}
</script>
