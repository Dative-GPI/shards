<template>
  <div>
    <slot name="header">
      <v-row no-gutters class="align-center mb-1">
        <d-search-input v-if="searchable" v-model="searching" class="mr-3" />

        <d-menu-btn
          v-if="mode == 'table' && !$vuetify.breakpoint.xs"
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
        <d-draggable-data-table-variant
          v-bind="$attrs"
          v-on="$listeners"
          :columns="columns"
          :search="searching"
          :items="items"
          :item-key="itemKey"
          :no-data-text="noDataText"
          :no-results-text="noResultsText"
          :disable-drag="disableDrag"
          :hide-handle="hideHandle"
          v-if="mode == 'table'"
        >
          <template v-for="(index, name) in scopedSlots" v-slot:[name]="data">
            <slot :name="'table-' + name" v-bind="data">{{ name }}</slot>
          </template>
        </d-draggable-data-table-variant>
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
            <draggable
              :value="items"
              @input="$emit('update:items', $event)"
              :disabled="disableDrag"
              ghost-class="ghost"
              class="row no-gutters align-center"
            >
              <div
                v-for="(item, index) in props.items"
                :key="item[itemKey]"
                :class="tileClass"
                style="position: relative"
              >
                <slot name="tile-item" v-bind="{ index, item }" />

                <div class="handle" v-if="!hideHandle">
                  <slot name="tile-handle">
                    <d-icon class="drag-cursor"> mdi-drag </d-icon>
                  </slot>
                </div>
              </div>
            </draggable>
          </template>
        </v-data-iterator>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { NormalizedScopedSlot } from "vue/types/vnode";
import { Component, Vue, Prop } from "vue-property-decorator";
import Draggable from "vuedraggable";

import { Column } from "../models";

@Component({
  inheritAttrs: false,
  components: {
    Draggable,
  },
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

  @Prop({ required: false, default: true, type: Boolean })
  columnSortable!: boolean;

  @Prop({ required: false, default: "mr-2" })
  tileClass!: string;

  @Prop({ required: false, default: false, type: Boolean })
  disableDrag!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  hideHandle!: boolean;

  // Data

  mode: "table" | "tile" = "tile";

  searching: string = "";

  // Computed Properties

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

  mounted() {
    if (this.disableTable) {
      this.mode = "tile";
    } else if (this.disableTiles) {
      this.mode = "table";
    } else {
      this.mode = this.initialMode;
    }
  }

  // Watchers
}
</script>

<style scoped>
.ghost {
  opacity: 0.5;
}

.handle {
  position: absolute;
  top: 5px;
  right: 5px;
}

.drag-cursor {
  cursor: grab;
}
</style>
