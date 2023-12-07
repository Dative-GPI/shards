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

    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>

    <template v-for="header in itemsSlots" v-slot:[header.slotName]="data">
      <slot
        :name="header.slotName"
        v-bind="{ configure: header.value == configured, ...data }"
      ></slot>
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
export default class DDataTable extends Vue {
  // Properties
  @Prop({ required: true })
  columns!: Column[];

  @Prop({ required: false, default: "text" })
  columnText!: string;

  @Prop({ required: false, default: "value" })
  columnValue!: string;

  @Prop({ required: false, default: "index" })
  columnPosition!: string;

  @Prop({ required: false, default: "$cog" })
  configurationIcon!: string;

  @Prop({ required: false, default: false, type: Boolean })
  singleSelect!: boolean;

  @Prop({ required: false, default: true, type: Boolean })
  handleFilters!: boolean;

  @Prop({ required: true })
  items!: Array<any>;

  @Prop({ required: false, default: false })
  hideHeader!: boolean;

  // Data
  filters: { [key: string]: FilterValue[] } = {};

  configured: string | null = null;

  // Computed Properties
  get showDefaultHeader(): boolean {
    return !this.hideHeader && this.$vuetify.breakpoint.xs;
  }

  get showCustomHeader(): boolean {
    return !this.hideHeader && !this.$vuetify.breakpoint.xs;
  }

  get headers(): Column[] {
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

  get itemsSlots(): Column[] {
    return this.headers.filter((h) => this.$scopedSlots[h.slotName!]);
  }

  get filteredItems(): any[] {
    if (this.handleFilters) {
      return this.items.filter((i) => _(this.filters).reduce<boolean>(
        (include, filterValues, key) => include && this.filterItem(filterValues, i[key], i),
        true
      ));
    }
    else {
      return this.items;
    }
  }

  // Methods
  mounted(): void {
    this.computeFilters();
  }
  
  toggleFilters(header: string, value: FilterValue[]): void {
    this.filters[header] = value;
    this.$emit("update:filters", this.filters);
  }

  computeFilters(): void {
    console.log("computeFilters");
    
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

              filter: col.methodFilter != null ? col.methodFilter : (value, property) => {
                property = [property].flat();
                return Array.isArray(property) ?
                  property.includes(value) || (!value && property.length == 0) : (!value && !property) || value == property;
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

              filter: col.methodFilter != null ? col.methodFilter : (value, property) => {
                property = [property].flat().map(mapToInnerValue);
                return Array.isArray(property) ?
                  property.includes(v) || (!v && property.length == 0) : (!v && !property) || v == property;
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

  filterItem(values: FilterValue[], property: any, item: any): boolean {
    return values.filter((v) => !v.hidden).some((v) => !!v.filter && v.filter(v.value, property, item));
  }

  @Watch("items")
  onItemsChanged = this.computeFilters;
}
</script>
