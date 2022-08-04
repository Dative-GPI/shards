<template>
  <d-tile
    :draggable="true"
    @dragstart="(value) => onStartDrag(value)"
    @drop.prevent="(value) => onDrop(value)"
    @dragover.prevent
    @dragenter.prevent="(value) => onDragEnter(value)"
    @dragleave.prevent="(value) => onDragLeave(value)"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot> </slot>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </d-tile>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DDraggableTile extends Vue {
  @Prop({ required: false, default: () => () => ("") })
  dragOverClass!: (item: any) => string;

  @Prop({ required: true })
  item!: any;

  dragCounter: number = 0;

  get tileClasses(): string {
    let classes = "";
    if (this.dragCounter > 0) {
      classes += this.dragOverClass(this.item);
    }
    return classes;
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