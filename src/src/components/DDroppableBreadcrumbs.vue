<template>
  <v-breadcrumbs :items="items" v-bind="$attrs" v-on="$listeners" class="pa-0 ma-0">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item v-bind="item" class="blue-2--text">
        <template v-if="item.disabled">
          {{ item.text }}
        </template>
        <template v-else>
          <div
            :class="divClasses(item)"
            @drop.prevent="(event) => onDrop(event, item)"
            @dragover.prevent
            @dragenter.prevent="(event) => onDragEnter(event, item)"
            @dragleave.prevent="(event) => onDragLeave(event, item)"
          >
            {{ item.text }}
          </div>
        </template>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { Breadcrumb } from "../models";

@Component({
  inheritAttrs: false,
})
export default class DDroppableBreadcrumbs extends Vue {  
  @Prop({ required: true })
  items!: Breadcrumb[];

  @Prop({ required: false, default: () => () => ("") })
  dragOverClass!: (item: Breadcrumb) => string;

  mounted(): void {
    this.dragOver = this.items
      .filter(i => !i.disabled)
      .reduce((o: { [text: string]: number }, i: Breadcrumb) => ({ ...o, [i.text]: 0 }), {});
  }

  dragOver: { [text: string]: number } = {};

  divClasses(item: Breadcrumb): string {
    if (this.dragOver[item.text] > 0) {
      return this.dragOverClass(item);
    }
    return "";
  }

  onDragEnter(event: DragEvent, item: Breadcrumb) {
    if (event.target) {
      this.dragOver[item.text]++;
    }
  }

  onDragLeave(event: DragEvent, item: Breadcrumb) {
    if (event.target) {
      this.dragOver[item.text]--;
    }
  }

  onDrop(event: DragEvent, item: Breadcrumb) {
    if (!event.dataTransfer) {
      return;
    }
    if (event.target) {
      this.dragOver[item.text] = 0;
    }
    this.$emit("drop", JSON.parse(event.dataTransfer.getData("text/plain")), item);
  }
}
</script>