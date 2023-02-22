<template>
  <div class="d-draggable-list">
    <d-draggable
      v-for="(item, index) in items"
      :draggable="draggable"
      @dragstart="dragStart($event)"
      @drop="onDrop($event)"
      @dragstop="dragStop"
      :index="index"
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

  dragIndex = -1;

  // Computed Properties
  // Methods

  dragStart(evt: { event: Event; index: number }) {
    this.dragIndex = evt.index;
  }

  onDrop(evt: { event: Event; index: number }) {
    if (this.dragIndex < 0) return;

    let newItems = [...this.items];

    const insertOffset = this.dragIndex > evt.index ? 0 : 1;
    const deleteOffset = this.dragIndex > evt.index ? 1 : 0;
    newItems.splice(evt.index + insertOffset, 0, newItems[this.dragIndex]);
    newItems.splice(this.dragIndex + deleteOffset, 1);

    this.$emit("change", newItems);

    this.dragIndex = -1;
  }

  dragStop() {
    this.dragIndex = -1;
  }
}
</script>

<style scoped>
.d-draggable-list {
  display: flex;
  flex-flow: row wrap;
}
</style>
