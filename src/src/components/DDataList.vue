<template>
  <div>
    <slot name="header">
      <v-row no-gutters class="align-center mb-1">
        <d-search-input
          v-if="searchable"
          class="mr-2"
          v-model="searching"
        />
        <d-menu-btn
          v-if="mode == 'table' && !$vuetify.breakpoint.xs && !hideColumns"
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
        <d-data-table
          v-if="mode == 'table'"
          :columns="columns"
          :items="searchItems(items, searching)"
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
          :items="searchItems(items, searching).slice(0, size)"
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
    <div
      :style="lastChildStyle"
    />
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { NormalizedScopedSlot } from "vue/types/vnode";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { searchItems } from "../tools";
import { Column } from "../models";

@Component({
  data: () => ({ searchItems }),
  inheritAttrs: false
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

  @Prop({ required: false, default: true, type: Boolean })
  columnSortable!: boolean;

  @Prop({ required: false, default: "mr-2" })
  tileClass!: string;

  @Prop({ required: false, default: () => ({ itemsPerPageOptions: [ 10, 30, -1 ] })})
  footerProps!: { itemsPerPageOptions: number[] };

  searching: string = "";
  mode: "table" | "tile" = "table";
  size: number = 20;
  intersectionObserver: IntersectionObserver | null = null;

  get scopedSlots() {
    const scopedSlots = _.pickBy(
      this.$scopedSlots,
      (value: NormalizedScopedSlot, key: string) => _.startsWith(key, "table-")
    );
    return _.mapKeys(scopedSlots, (value: NormalizedScopedSlot, key: string) =>
      key.replace("table-", "")
    );
  }

  get lastChildStyle(): { [key: string]: any } {
    return {
      height: this.mode === "tile" ? "10px" : "0px",
      width: "100%"
    };
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
  }

  beforeDestroy(): void {
    if (this.intersectionObserver && this.$el.lastChild) {
      this.intersectionObserver.unobserve((this.$el.lastChild as any));
    }
  }

  buildIntersection(): void {
    if (this.intersectionObserver) {
      return;
    }
    let formerRatio = 0;
    this.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        if (formerRatio < entry.intersectionRatio) {
          if (this.mode === "tile" && entry.boundingClientRect.bottom < window.innerHeight * 1.25) {
            if (searchItems(this.items, this.searching).length > this.size) {
              this.size = Math.min(this.size + 20, this.items.length);
            }
          }
        }
        formerRatio = entry.intersectionRatio;
      });
    }, {
      threshold: [0.9]
    });
    this.toggleIntersection();
  }

  toggleIntersection(): void {
    if (!this.intersectionObserver || !this.$el.lastChild) {
      return;
    }
    switch (this.mode) {
      case "tile": {
        this.intersectionObserver.observe(this.$el.lastChild as any);
        break;
      }
      default: {
        this.intersectionObserver.unobserve(this.$el.lastChild as any);
        break;
      }
    }
  }

  @Watch("mode")
  onModeChanged(newValue: "table" | "tile", oldValue: "table" | "tile") {
    if (newValue !== oldValue) {
      this.toggleIntersection();
    }
  }
}
</script>
