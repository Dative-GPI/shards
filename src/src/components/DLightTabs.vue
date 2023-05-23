<template>
  <div class="d-light-tabs">
    <div class="d-light-tabs-bar" :class="tabsBarClasses">
      <d-tabs :value="value" v-bind="$attrs" v-on="$listeners" :key="tabNumber">
        <d-tab
          v-for="(item, index) in tabs"
          :error="item.error"
          :key="'tab-' + index"
        >
          {{ item.label }}
        </d-tab>
      </d-tabs>

        <d-icon-btn
          v-if="editable && (tabs.length > minItems)"
          class="action-icon"
          icon="mdi-minus-circle-outline"
          @click="$emit('remove:item', value)"
        />

        <d-icon-btn
          v-if="editable && (tabs.length < maxItems || maxItems == -1)"
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

  @Prop({ required: false, default: "" })
  tabsBarClasses!: string;

  get tabNumber() {
    return this.tabs.length;
  }
}

interface TabItem {
  label: string;
  error: boolean;
}
</script>

<style scoped>
.d-light-tabs {
  width: 100%;
}

.d-light-tabs .d-light-tabs-bar {
  display: flex;
  min-height: 36px;
}

.v-tabs::v-deep {
  flex: 0 0 auto !important;
  width: auto !important;
}
</style>
