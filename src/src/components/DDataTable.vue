<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    class="d-data-table"
    fixed-header
    disable-pagination
    hide-default-footer
    :hide-default-header="!$vuetify.breakpoint.xs"
    :headers="headers"
    :items="filtredItems"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
  >
    <template v-slot:header="{ props, on }" v-if="!$vuetify.breakpoint.xs">
      <th v-for="header in props.headers" :key="header.value" class="d-data-table-header">
        <v-row
          no-gutters
          class="align-center px-5 text-body-1bold"
          :class="{ 'flex-row-reverse': header.align === 'end' }"
        >
          <slot :name="`header.${header.value}-left-prepend`" />
          <span class="d-data-table-header-text">{{ header.text }}</span>
          <d-btn
            icon
            v-if="header.configurable"
            @click="configured === header.value ? configured = null : configured = header.value"
          >
            <d-icon
              :color="configured === header.value ? 'alert-orange' : 'grey-1'"
              small
            >{{ configurationIcon }}</d-icon>
          </d-btn>

          <slot :name="`header.${header.value}-left-append`" />

          <v-spacer />

          <slot :name="`header.${header.value}-right-prepend`" />

          <d-btn icon v-if="header.sortable" @click="on.sort(header.value)">
            <template v-if="props.options.sortBy.includes(header.value)">
              <d-icon
                color="blue-1"
                small
              >{{ props.options.sortDesc[props.options.sortBy.indexOf(header.value)] ? 'mdi-sort-ascending' : 'mdi-sort-descending' }}</d-icon>
            </template>
            <template v-else>
              <d-icon color="grey-1" small>mdi-sort-ascending</d-icon>
            </template>
          </d-btn>

          <d-menu-btn
            v-if="header.filterable && filters[header.value]"
            v-model="filters[header.value]"
            :sortable="false"
          >
            <template #activator="{ on }">
              <d-btn icon v-on="on">
                <d-icon
                  :color="filters[header.value].every(c => !c.hidden) ? 'grey-1' : 'blue-1'"
                  small
                >mdi-filter</d-icon>
              </d-btn>
            </template>
          </d-menu-btn>

          <slot :name="`header.${header.value}-right-append`" />
        </v-row>
      </th>
    </template>

    <slot></slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>

    <template v-for="header in itemsSlots" v-slot:[header.slotName]="data">
      <slot :name="header.slotName" v-bind="{ configure: header.value == configured, ...data }"></slot>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { Column } from "../models";

@Component({
  inheritAttrs: false
})
export default class DDataTable extends Vue {
  @Prop({ required: true })
  columns!: Column[]

  @Prop({ required: false, default: "text" })
  columnText!: string;

  @Prop({ required: false, default: "value" })
  columnValue!: string;

  @Prop({ required: false, default: "index" })
  columnPosition!: string;

  @Prop({ required: false, default: "$cog" })
  configurationIcon!: string;

  @Prop({ required: true })
  items!: any[];

  sortBy = [];
  sortDesc = [];
  filters: { [key: string]: Column[] } = {}

  configured = null;

  get headers() {
    return this.columns
      .filter(c => !c.hidden)
      .sort((c1, c2) => c1[this.columnPosition] - c2[this.columnPosition])
      .map(c => {
        const { text, value, ...others } = c;
        return {
          text: c[this.columnText] || text,
          value: c[this.columnValue] || value,
          slotName: `item.${c[this.columnValue] || value}`,
          ...others
        }
      });
  }

  get itemsSlots() {
    return this.headers.filter(h => this.$scopedSlots[h.slotName])
  }

  get filtredItems() {
    return this.items.filter(i => {
      let include = true;
      for (let key in this.filters) {
        var filter = this.filters[key];

        include = include && !!filter
          .filter(m => !m.hidden)
          .map(m => m.value).includes(i[key].toString())
      }
      return include;
    });
  }

  mounted() {
    this.computeFilters();
  }

  computeFilters() {
    this.headers.filter(c => c.filterable)
      .forEach(c => {
        Vue.set(this.filters, c.value, [...new Set(this.items.flatMap(i => i[c.value]))]
          .sort((a, b) => a.toString().localeCompare(b, undefined, { numeric: true }))
          .map(v => ({
            hidden: false,
            text: v.toString(),
            value: v.toString()
          })))
      })
  }

  @Watch("items")
  inItemsChanged = this.computeFilters;
}
</script>