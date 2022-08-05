<template>
  <d-tile v-if="canDrop(item)"
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
  <d-tile v-else
    :draggable="true"
    @dragstart="(value) => onStartDrag(value)"
    @dragover.stop
    @dragenter.stop="(value) => onDragEnter(value)"
    @dragleave.stop="(value) => onDragLeave(value)"
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
  @Prop({ required: false, default: () => () => true })
  canDrop!: (item: any) => boolean;

  @Prop({ required: true })
  item!: any;

  dragCounter: number = 0;

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