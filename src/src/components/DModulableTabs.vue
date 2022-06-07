<template>
  <div>
    <div style="display: flex; flex-flow: row">
      <d-tabs
        style="width: 1px"
        v-bind="$attrs"
        v-on="$listeners"
        active-class="d-tab--active"
        hide-slider
        show-arrows
        :key="itemsLength"
        @change="$emit('input', $event)"
      >
        <slot name="prepend"></slot>
        <d-tab v-for="item in itemsLength" :key="item">
          <span v-if="itemsLabel != null" class="mr-2">{{ itemsLabel }}</span>
          {{ item }}
        </d-tab>
        <slot name="append"></slot>
        <v-spacer />
        <template v-for="(index, name) in $slots" v-slot:[name]>
          <slot :name="name" />
        </template>
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </d-tabs>
      <d-icon-btn
        v-if="
          itemsLength > minItems &&
          value >= prependItems &&
          value < prependItems + itemsLength
        "
        class="action-icon"
        icon="mdi-minus-circle-outline"
        @click="$emit('remove:item')"
      />
      <d-icon-btn
        v-if="itemsLength < maxItems || maxItems == -1"
        class="action-icon"
        icon="mdi-plus-circle-outline"
        @click="$emit('add:item')"
      />
    </div>
    <d-tabs-items v-bind="$attrs" :key="itemsLength">
      <slot name="items"> </slot>
    </d-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DModulableTabs extends Vue {
  @Prop({ required: true })
  value!: number;

  @Prop({ required: false, default: null })
  itemsLabel!: string;

  @Prop({ required: false, default: -1 })
  maxItems!: number;

  @Prop({ required: false, default: 0 })
  minItems!: number;

  @Prop({ required: false, default: 0 })
  prependItems!: number;

  @Prop({ required: false, default: 0 })
  itemsLength!: number;
}
</script>