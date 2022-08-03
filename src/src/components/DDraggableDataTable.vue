<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    class="d-data-table"
    fixed-header
    :hide-default-header="!showDefaultHeader"
    :headers="headers"
    :items="filteredItems"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :single-select="singleSelect"
  >
    <template v-slot:header="{ props, on }" v-if="showCustomHeader">
      <thead>
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.value"
            class="d-data-table-header"
            :style="{ width: (header.width && header.width + 'px') || undefined }"
          >
            <v-row
              no-gutters
              class="justify-center"
              v-if="header.value == 'data-table-select' && !singleSelect"
            >
              <d-simple-checkbox
                :value="props.everyItem"
                :indeterminate="props.someItems && !props.everyItem"
                class="d-toggle-select-all"
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
              <span class="d-data-table-header-text grey-3--text text-body-1">
                {{ header.text }}
              </span>

              <slot :name="`header.${header.value}-left-append`" />

              <template v-if="header.sortable || header.canBeFiltered">
                <v-spacer />

                <slot :name="`header.${header.value}-right-prepend`" />

                <d-btn
                  icon
                  v-if="header.sortable"
                  @click="on.sort(header.value)"
                >
                  <template v-if="props.options.sortBy.includes(header.value)">
                    <d-icon color="blue-1" small>
                      {{
                        props.options.sortDesc[
                          props.options.sortBy.indexOf(header.value)
                        ]
                          ? "mdi-sort-ascending"
                          : "mdi-sort-descending"
                      }}
                    </d-icon>
                  </template>
                  <template v-else>
                    <d-icon color="grey-1" small>mdi-sort-ascending</d-icon>
                  </template>
                </d-btn>

                <d-menu-btn
                  v-if="header.canBeFiltered && filters[header.value]"
                  v-model="filters[header.value]"
                  :sortable="false"
                >
                  <template #activator="{ on }">
                    <d-btn icon v-on="on">
                      <d-icon
                        :color="
                          filters[header.value].every((c) => !c.hidden)
                            ? 'grey-1'
                            : 'blue-1'
                        "
                        small
                        >mdi-filter</d-icon
                      >
                    </d-btn>
                  </template>
                </d-menu-btn>

                <slot :name="`header.${header.value}-right-append`" />
              </template>
            </v-row>
          </th>
        </tr>
      </thead>
    </template>

    <template #item="props">
      <d-draggable-data-row
        :item="props.item"
        :headers="headers"
        :item-class="itemClass"
        :drag-over-class="dragOverClass"
        @drag="(item) => $emit('drag', item)"
        @drop="(item) => $emit('drop', item)"
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

import { Column } from "../models";

@Component({
  inheritAttrs: false
})
export default class DDraggableDataTable extends Vue {
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

  @Prop({ required: false, default: () => () => ("") })
  itemClass!: (item: any) => string;

  @Prop({ required: false, default: () => () => ("") })
  dragOverClass!: (item: any) => string;

  @Prop({ required: false, default: false })
  hideHeader!: boolean;

  sortBy = [];
  sortDesc = [];
  filters: { [key: string]: Column[] } = {};

  get showDefaultHeader() {
    return !this.hideHeader && this.$vuetify.breakpoint.xs
  }

  get showCustomHeader() {
    return !this.hideHeader && !this.$vuetify.breakpoint.xs
  }

  get headers() {
    var columns: Column[] = [];

    columns = columns.concat(
      this.columns
        .filter((c) => !c.hidden)
        .sort((c1, c2) => c1[this.columnPosition] - c2[this.columnPosition])
        .map((c) => {
          const { text, value, filterable, ...others } = c;
          return {
            text: c[this.columnText] || text,
            value: c[this.columnValue] || value,
            slotName: `item.${c[this.columnValue] || value}`,
            canBeFiltered: filterable,
            ...others,
          };
        })
    );

    return columns;
  }

  get itemsSlots() {
    return this.headers.filter((h) => this.$scopedSlots[h.slotName]);
  }

  get filteredItems() {
    return this.items.filter((i) => {
      let include = true;
      for (let key in this.filters) {
        var filter = this.filters[key];

        include =
          include &&
          !!filter
            .filter((m) => !m.hidden)
            .some((m) =>
              Array.isArray(i[key])
                ? i[key].includes(m.value)
                : m.value == i[key]
            );
      }
      return include;
    });
  }

  @Watch("items")
  onItemsChanged = this.computeFilters;

  mounted() {
    this.computeFilters();
  }

  computeFilters() {
    this.headers
      .filter((c) => c.canBeFiltered)
      .forEach((c) => {
        Vue.set(
          this.filters,
          c.value!,
          [...new Set(this.items.flatMap((i: any) => i[c.value!]))]
            .map((v) => ({
              hidden: false,
              text: (v && v.toString()) || "—",
              value: v || null,
            }))
            .sort((a, b) =>
              a.text.localeCompare(b.text, undefined, { numeric: true })
            )
        );
      });
  }
}
</script>
