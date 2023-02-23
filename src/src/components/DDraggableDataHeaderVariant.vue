<template>
  <th
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
        :value="everyItem"
        :indeterminate="someItems && !everyItem"
        @click="toggleSelectAll(!(everyItem || someItems))"
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

      <slot :name="`header.${header.value}-left-append`" />

      <template v-if="header.sortable || header.canBeFiltered">
        <v-spacer />

        <slot :name="`header.${header.value}-right-prepend`" />

        <d-btn v-if="header.sortable" icon @click="sort(headerValue)">
          <template v-if="options.sortBy.includes(header.value)">
            <d-icon color="blue-1" small>
              {{
                options.sortDesc[
                  options.sortBy.indexOf(header.value)
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
          v-if="header.canBeFiltered && filter"
          v-model="filter"
          :sortable="false"
        >
          <template #activator="{ on }">
            <d-btn icon v-on="on">
              <d-icon
                small
                :color="
                  filter.every((c) => !c.hidden)
                    ? 'grey-1'
                    : 'blue-1'
                "
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
</template>

<script lang="ts">
import _ from "lodash";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { Column, FilterValue } from "../models";

@Component({
  inheritAttrs: false,
})
export default class DDraggableDataHeaderVariant extends Vue {
  // Properties

  @Prop({ required: true })
  header!: Column;

  @Prop({ required: true })
  everyItem!: boolean;

  @Prop({ required: true })
  someItems!: boolean;

  @Prop({ required: true })
  singleSelect!: boolean;

  @Prop({ required: true })
  options!: any;

  @Prop({ required: true })
  filter!: FilterValue[];

  @Prop({ required: true })
  sort!: (value: string) => void;

  @Prop({ required: true })
  toggleSelectAll!: (value: boolean) => void;

  // Data
  // Computed Properties

  get headerValue() {
    return !!this.header.value ? this.header.value : "";
  }

  // Methods
  // Watchers
}
</script>
