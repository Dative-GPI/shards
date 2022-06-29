<template>
  <div class="d-modulable-tabs">
    <div :class="inset ? 'd-tabs-bar d-inset-bar' : 'd-tabs-bar'">
      <d-tabs :value="value" v-bind="$attrs" v-on="$listeners" :key="tabNumber">
        <d-tab
          v-for="(pItem, pIndex) in prependTabs"
          :error="pItem.error"
          :key="'prepend-tab-' + pIndex"
        >
          {{ pItem.label }}
        </d-tab>

        <d-tab
          v-for="(item, index) in tabs"
          :error="item.error"
          :key="'tab-' + index"
        >
          {{ item.label }}
        </d-tab>

        <d-tab
          v-for="(aItem, aIndex) in appendTabs"
          :error="aItem.error"
          :key="'append-tab-' + aIndex"
        >
          {{ aItem.label }}
        </d-tab>

        <v-spacer />

        <template v-for="(item, name) in $slots" v-slot:[name]>
          <slot :name="name"></slot>
        </template>
        <template v-for="(item, name) in $scopedSlots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </d-tabs>

        <d-icon-btn
          v-if="editable && (tabs.length > minItems && value >= itemsStart && value < itemsEnd)"
          class="action-icon"
          icon="mdi-minus-circle-outline"
          @click="$emit('remove:item', value - itemsStart)"
        />

        <d-icon-btn
          v-if="editable && (tabs.length < maxItems || maxItems == -1)"
          class="action-icon"
          icon="mdi-plus-circle-outline"
          @click="$emit('add:item', value - itemsStart)"
        />
    </div>
    <d-tabs-items :value="value" v-bind="$attrs" :key="tabNumber">
      <slot name="items"></slot>
    </d-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DModulableTabs extends Vue {
  @Prop({ required: true })
  value!: number;

  @Prop({ required: false, default: 0 })
  minItems!: number;

  @Prop({ required: false, default: -1 })
  maxItems!: number;

  @Prop({ required: false, default: () => [] })
  prependTabs!: TabItem[];

  @Prop({ required: true })
  tabs!: TabItem[];

  @Prop({ required: false, default: () => [] })
  appendTabs!: TabItem[];

  @Prop({ required: false, default: true })
  editable!: boolean;

  @Prop({ required: false, default: true })
  inset!: boolean;

  get itemsStart() {
    return this.prependTabs.length;
  }

  get itemsEnd() {
    return this.prependTabs.length + this.tabs.length;
  }

  get tabNumber() {
    // Used for the keys in DTabs and DTabsItems. When this changes, the tabs are reindexed
    // so we don't get weird tab values
    return this.prependTabs.length + this.tabs.length + this.appendTabs.length;
  }
}

interface TabItem {
  label: string;
  error: boolean;
}
</script>

<style>
.d-modulable-tabs .d-tabs-bar {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  min-height: 36px;
}

.d-modulable-tabs .d-inset-bar {
  box-shadow: inset 0px -1px 0px var(--v-grey-2-base);
}

.d-modulable-tabs .d-tabs-bar .d-tabs {
  width: 150px;
  flex: 1 1 auto;
}

.d-modulable-tabs .d-tabs-bar .d-tabs * {
  background-color: transparent;
}

.d-modulable-tabs .d-tabs-bar .action-btn {
  flex: 1 0 auto;
}
</style>
