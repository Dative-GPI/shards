<template>
  <div>
    <slot name="header">
      <v-row no-gutters class="align-center mb-1">
        <d-search-input
          v-if="searchable"
          class="mr-2"
          :value="searching"
          @input="onSearchingChange"
        />
        <d-menu-btn
          v-if="mode == 'table' && !$vuetify.breakpoint.xs"
          :btn-class="'mr-2'"
          :sortable="columnSortable"
          :value="columns"
          @input="$emit('update:columns', $event)"
        />
        <slot name="header-action" />
        <template v-if="!disableTable && !disableTiles">
          <v-spacer />
          <d-btn-toggle mandatory v-model="mode">
            <d-btn
              width="40"
              value="table"
              class="ma-0 pa-0 transparent--background"
              :ripple="false"
            >
              <d-icon>list_alt</d-icon>
            </d-btn>
            <d-btn
              width="40"
              value="tile"
              class="ma-0 pa-0 transparent--background"
              :ripple="false"
            >
              <d-icon>$tile</d-icon>
            </d-btn>
          </d-btn-toggle>
        </template>
      </v-row>
    </slot>

    <div>
      <slot name="table" v-bind="{ items }">
        <d-draggable-data-table
          v-if="mode == 'table'"
          :columns="columns"
          :search="searching"
          :items="items"
          :item-key="itemKey"
          :no-data-text="noDataText"
          :no-results-text="noResultsText"
          :selected-items="innerValue"
          :footer-props="footerProps"
          @update:selection="onSelectionChange"
          v-bind="$attrs"
          v-on="$listeners"
        >
          <template v-for="(index, name) in scopedSlots" v-slot:[name]="data">
            <slot :name="'table-' + name" v-bind="data">{{ name }}</slot>
          </template>
        </d-draggable-data-table>
      </slot>

      <slot name="tile" v-bind="{ items }">
        <v-data-iterator
          :items="items"
          :search="searching"
          :no-data-text="noDataText"
          :no-results-text="noResultsText"
          disable-pagination
          hide-default-footer
          style="width: 100%"
          v-if="mode == 'tile'"
        >
          <template v-slot:default="props">
            <v-row no-gutters align="center">
              <div
                v-for="(item, index) in props.items"
                :key="item[itemKey]"
                :class="tileClass"
              >
                <slot name="tile-item" v-bind="{ index, item }" />
              </div>
            </v-row>
          </template>
        </v-data-iterator>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { Column } from "../models";
import { NormalizedScopedSlot } from "vue/types/vnode";

@Component({
  inheritAttrs: false,
})
export default class DDraggableDataList extends Vue {
  // Properties
  @Prop({ required: true })
  items!: any[];

  @Prop({ required: true })
  columns!: Column[];

  @Prop({ required: false, default: "id" })
  itemKey!: string;

  @Prop({ required: false, default: false, type: Boolean })
  disableTiles!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  disableTable!: boolean;

  @Prop({ required: false, default: "table" })
  initialMode!: "table" | "tile";

  @Prop({ required: false, default: "" })
  noResultsText!: string;

  @Prop({ required: false, default: "" })
  noDataText!: string;

  @Prop({ required: false, default: "Show all" })
  showAllText!: string;

  @Prop({ required: false, default: true, type: Boolean })
  searchable!: boolean;

  @Prop({ required: false, default: "" })
  search!: string;

  @Prop({ required: false, default: true, type: Boolean })
  columnSortable!: boolean;

  @Prop({ required: false, default: "mr-2" })
  tileClass!: string;

  @Prop({ required: false, default: () => ({ itemsPerPageOptions: [ 10, 30, -1 ] })})
  footerProps!: { itemsPerPageOptions: number[] };

  @Prop({ required: false, default: () => [] })
  value!: any[];

  // Data
  innerValue: any[] = [];

  mode: "table" | "tile" = "tile";

  searching: string = "";

  // Computed
  get scopedSlots() {
    const scopedSlots = _.pickBy(
      this.$scopedSlots,
      (value: NormalizedScopedSlot, key: string) => _.startsWith(key, "table-")
    );
    return _.mapKeys(scopedSlots, (value: NormalizedScopedSlot, key: string) =>
      key.replace("table-", "")
    );
  }

  // Methods
  mounted(): void {
    this.innerValue = _.cloneDeep(this.value);

    if (this.disableTable) {
      this.mode = "tile";
    } else if (this.disableTiles) {
      this.mode = "table";
    } else {
      this.mode = this.initialMode;
    }
  }

  onSelectionChange(value: any): void {
    this.innerValue = value;
    this.$emit('input', this.innerValue);
  }

  onSearchingChange(newVal: string) {
    this.searching = newVal;
    this.$emit("update:search", newVal);
  }

  @Watch("search")
  onSearchChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.onSearchingChange(this.search);
    }
  }

  @Watch("value")
  onValueChange(): void {
    this.innerValue = _.cloneDeep(this.value);
  }
}
</script>
