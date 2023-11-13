<template>
  <div class="d-light-tabs">
    <div class="d-light-tabs-bar">
      <d-tabs
        :key="tabNumber"
        :style="tabsMaxWidth"
        :value="value"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <d-tab
          v-for="(item, index) in tabs"
          :error="item.error"
          :key="'tab-' + index"
        >
          {{ item.label }}
        </d-tab>
      </d-tabs>

        <d-icon-btn
          v-if="showMinusBtn"
          class="action-icon"
          icon="mdi-minus-circle-outline"
          @click="$emit('remove:item', value)"
        />

        <d-icon-btn
          v-if="showPlusBtn"
          class="action-icon"
          icon="mdi-plus-circle-outline"
          @click="$emit('add:item', value)"
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
export default class DLightTabs extends Vue {
  @Prop({ required: true })
  value!: number;

  @Prop({ required: false, default: 0 })
  minItems!: number;

  @Prop({ required: false, default: -1 })
  maxItems!: number;

  @Prop({ required: true })
  tabs!: TabItem[];

  @Prop({ required: false, default: true })
  editable!: boolean;

  get tabNumber(): number {
    return this.tabs.length;
  }

  get showMinusBtn(): boolean {
    return this.editable && (this.tabs.length > this.minItems) && (this.tabs.length > 0);
  }

  get showPlusBtn(): boolean {
    return this.editable && (this.tabs.length < this.maxItems || this.maxItems == -1)
  }

  get tabsMaxWidth() {
    if (!this.editable) {
      return { maxWidth: "100% !important" };
    }
    let numberOfBtns = 0;
    if (this.showMinusBtn) {
      numberOfBtns++;
    }
    if (this.showPlusBtn) {
      numberOfBtns++;
    }
    return { maxWidth: `calc(100% - ${numberOfBtns * 36}px) !important` };
  }
}

interface TabItem {
  label: string;
  error: boolean;
}
</script>

<style scoped>
.d-light-tabs .d-light-tabs-bar {
  display: flex;
  min-height: 36px;
}
</style>
