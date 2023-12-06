<template>
  <div>
    <slot name="header">
      <v-row no-gutters class="align-center mb-1">
        <d-search-input
          v-if="searchable"
          class="mr-2"
          :value="searching"
          @input="onSearchingChanged"
        />
        <d-menu-btn
          v-if="mode == 'table' && !$vuetify.breakpoint.xs && !hideColumns"
          :btn-class="'mr-2'"
          :sortable="columnSortable"
          :value="columns"
          @input="$emit('update:columns', $event)"
        >
          <template #item="{ defaultValue, item }">
            <slot name="column.item" v-bind="item">
              {{ defaultValue }}
            </slot>
          </template>
        </d-menu-btn>

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
        <d-data-table
          v-if="mode == 'table'"
          :columns="columns"
          :search="searching"
          :items="items"
          :item-key="itemKey"
          :no-data-text="noDataText"
          :no-results-text="noResultsText"
          :footer-props="footerProps"
          v-bind="$attrs"
          v-on="$listeners"
        >
          <template v-for="(index, name) in scopedSlots" v-slot:[name]="data">
            <slot :name="'table-' + name" v-bind="data">{{ name }}</slot>
          </template>
        </d-data-table>
      </slot>

      <slot name="tile" v-bind="{ items }">
        <v-data-iterator
          v-if="mode == 'tile'"
          :items="items.slice(0, size)"
          :search="searching"
          :no-data-text="noDataText"
          :no-results-text="noResultsText"
          disable-pagination
          hide-default-footer
          style="width: 100%"
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
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { Column } from "../models";
import { NormalizedScopedSlot } from "vue/types/vnode";

@Component({
  inheritAttrs: false,
})
export default class DDataList extends Vue {
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

  @Prop({ required: false, default: false, type: Boolean })
  hideColumns!: boolean;

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

  searching: string = "";
  mode: "table" | "tile" = "tile";
  size: number = 20;
  intersectionObserver: IntersectionObserver | null = null;
  resizeObserver: ResizeObserver | null = null;

  get scopedSlots() {
    const scopedSlots = _.pickBy(
      this.$scopedSlots,
      (value: NormalizedScopedSlot, key: string) => _.startsWith(key, "table-")
    );
    return _.mapKeys(scopedSlots, (value: NormalizedScopedSlot, key: string) =>
      key.replace("table-", "")
    );
  }

  mounted(): void {
    if (this.disableTable) {
      this.mode = "tile";
    }
    else if (this.disableTiles) {
      this.mode = "table";
    }
    else {
      this.mode = this.initialMode;
    }

    this.buildIntersection();
    this.buildResize();
  }

  beforeDestroy(): void {
    if (this.intersectionObserver != null) {
      this.intersectionObserver.unobserve(this.$el);
    }
    if (this.resizeObserver != null) {
      this.resizeObserver.unobserve(this.$el);
    }
  }

  buildIntersection(): void {
    if (this.intersectionObserver != null) {
      return;
    }

    const thresholds = [];

    for (let i = 1.0; i <= 20; i++) {
      thresholds.push(i / 20);
    }
    thresholds.push(0);

    this.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        if (entry.boundingClientRect.bottom < window.innerHeight * 1.25) {
          this.size += 20;
        }
      });
    }, {
      root: null,
      rootMargin: "0px",
      threshold: thresholds
    });
    if (this.intersectionObserver != null) {
      this.intersectionObserver.observe(this.$el);
    }
  }

  buildResize(): void {
    if (this.resizeObserver != null) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      if (this.intersectionObserver != null) {
        this.intersectionObserver.unobserve(this.$el);
        this.intersectionObserver.observe(this.$el);
      }
    });
    if (this.resizeObserver != null) {
      this.resizeObserver.observe(this.$el);
    }
  }

  onSearchingChanged(newValue: string) {
    this.searching = newValue;
    this.$emit("update:search", newValue);
  }

  @Watch("search")
  onSearchChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.onSearchingChanged(this.search);
    }
  }

  @Watch("mode")
  onModeChanged(newValue: "table" | "tile", oldValue: "table" | "tile") {
    if (newValue !== oldValue) {
      this.$emit("update:mode", newValue);
    }
  }
}
</script>
