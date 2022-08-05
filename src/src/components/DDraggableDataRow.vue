<template>
  <tr
    :class="trClasses"
    :draggable="true"
    @dragstart="(value) => onStartDrag(value)"
    @drop.prevent="(value) => onDrop(value)"
    @dragover.prevent
    @dragenter.prevent="(value) => onDragEnter(value)"
    @dragleave.prevent="(value) => onDragLeave(value)"
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
export default class DDraggableDataRow extends Vue {
  @Prop({ required: false, default: () => () => ("") })
  itemClass!: (item: any) => string;

  @Prop({ required: false, default: () => () => ("") })
  dragOverClass!: (item: any) => string;
  
  @Prop({ required: false, default: () => ({}) })
  item!: any;

  @Prop({ required: true })
  headers!: Column[];

  dragCounter: number = 0;

  get trClasses(): string {
    let classes = `${this.itemClass(this.item)} `;
    if (this.dragCounter > 0) {
      classes += this.dragOverClass(this.item);
    }
    return classes;
  }

  slotName(header: Column): string {
    return `item.${header.value}`;
  }

  defaultValue(item: any, header: Column): any {
    return item[header.value!] != null ? item[header.value!] : "";
  }

  alignment(header: Column): string {
    return header.align != null ? header.align : "start";
  }

  isEmptyOrSpaces(str: string | null | undefined): boolean {
    return (str == null || str.match(/^ *$/) != null);
  }

  onStartDrag(event: DragEvent) {
    if (!event.dataTransfer) {
      return;
    }
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", JSON.stringify(this.item));

    this.$emit("drag", this.item);
  }

  onDragEnter(event: DragEvent) {
    if (event.target) {
      this.dragCounter++;
    }
  }

  onDragLeave(event: DragEvent) {
    if (event.target) {
      this.dragCounter--;
    }
  }

  onDrop(event: DragEvent) {
    if (!event.dataTransfer) {
      return;
    }
    if (event.target) {
      this.dragCounter = 0;
    }

    this.$emit("drop", JSON.parse(event.dataTransfer.getData("text/plain")), this.item);
  }
}
</script>