<template>
  <div class="d-draggable-list">
    <d-draggable 
      :dragging="dragging"
      v-for="(item, index) in items" 
      @dragstart="dragStart($event, index)" 
      @drop="onDrop($event, index)"
      @dragstop="dragStop"
      :key="'draggable-list-item-' + index"
    >
      <template #icon>
        <slot name="icon" />
      </template>
      <slot name="item" :item="item">
        <div>{{ item }}</div>
      </slot>
    </d-draggable>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class DDraggableList extends Vue {
  // Properties

  @Prop({ required: false, default: true })
  draggable!: boolean;

  @Prop({ required: false, default: () => [] })
  items!: any[];

  // Data

  dragging = false;
  dragIndex = -1;

  // Computed Properties
  // Methods

  dragStart(evt: DragEvent, index: number) {
    this.dragIndex = index;
    this.dragging = true;
  }

  onDrop(evt: { evt: DragEvent, isRight: boolean }, index: number) {
    const endIndex = evt.isRight ? index + 1 : index;

    let newItems = [...this.items];

    newItems.splice(endIndex, 0, newItems[this.dragIndex]);
    const startIndex = endIndex <= this.dragIndex ? this.dragIndex + 1 : this.dragIndex;
    newItems.splice(startIndex, 1);

    this.$emit("change", newItems);

    this.dragIndex = -1;
    this.dragging = false;
  }

  dragStop() {
    this.dragIndex = -1;
    this.dragging = false;
  }
}
</script>

<style scoped>
  .d-draggable-list {
    display: flex;
    flex-flow: row wrap;
  }
</style>
