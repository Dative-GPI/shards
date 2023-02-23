<template>
  <tr
    :class="trClasses"
    @click="$emit('click:row', item)"
  >
    <td v-for="(header, index) in headers" :key="index">
      <slot :item="item" :name="slotName(header)">
        <v-row no-gutters :justify="alignment(header)">
          {{ defaultValue(item, header) }}
        </v-row>
      </slot>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { Column } from "../models";

@Component({})
export default class DDraggableDataRowVariant extends Vue {
  // Props

  @Prop({ required: false, default: () => () => "" })
  itemClass!: (item: any) => string;
  
  @Prop({ required: false, default: () => ({}) })
  item!: any;

  @Prop({ required: true })
  headers!: Column[];

  // Data
  // Computed Properties

  get trClasses(): string {
    let classes = `${this.itemClass(this.item)} `;
    return classes;
  }

  // Methods

  slotName(header: Column): string {
    return `item.${header.value}`;
  }

  defaultValue(item: any, header: Column): any {
    return item[header.value!] != null ? item[header.value!] : "";
  }

  alignment(header: Column): string {
    return header.align != null ? header.align : "start";
  }
}
</script>