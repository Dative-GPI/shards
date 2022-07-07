<template>
  <div
    class="d-draggable"
    :draggable="draggable"
    @dragstart="startDrag($event)"
  >
    <!-- Icon to announce that the tile is draggable -->
    <slot name="icon">
      <d-icon class="grey-2--text drag-icon" v-if="draggable">
        mdi-drag
      </d-icon>
    </slot>

    <slot></slot>

    <template v-if="draggable && dragging">
      <!-- Divs to detect if we drag over the left or the right side of the tile -->
      <div
        class="drag-left"
        @drop="onDrop($event, false)"
        @dragover.prevent
        @dragenter.prevent="dragEnter($event, false)"
        @dragleave.prevent="dragLeave($event, false)"
        @click.prevent
      ></div>
      <div
        class="drag-right"
        @drop="onDrop($event, true)"
        @dragover.prevent
        @dragenter.prevent="dragEnter($event, true)"
        @dragleave.prevent="dragLeave($event, true)"
        @click.prevent
      ></div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class DDraggable extends Vue {
  // Properties

  @Prop({ required: false, default: true })
  draggable!: boolean;

  //    This is used to allow clicks on the slot. Is shared between the DDraggables of a same set
  @Prop({ required: false, default: true })
  dragging!: boolean;

  // Data
  // Computed Properties
  // Methods

  startDrag(evt: DragEvent) {
    if (!this.draggable) return;
    if (!evt.dataTransfer) return;

    evt.dataTransfer.dropEffect = "move";
    evt.dataTransfer.effectAllowed = "move";

    this.$emit("dragstart", evt);
  }

  dragEnter(evt: DragEvent, isRight: boolean) {
    if (evt.target) (evt.target as HTMLElement).classList.add("dragover");
  }

  dragLeave(evt: DragEvent, isRight: boolean) {
    if (evt.target) (evt.target as HTMLElement).classList.remove("dragover");
  }

  onDrop(evt: DragEvent, isRight: boolean) {
    if (!this.draggable) return;
    if (!evt.dataTransfer) return;

    if (evt.target) (evt.target as HTMLElement).classList.remove("dragover");

    this.$emit("drop", {
      evt: evt,
      isRight: isRight,
    });
  }

  mounted() {
    document.addEventListener("mouseup", this.dragStop.bind(this));
  }

  dragStop() {
    this.$emit("dragstop");
  }
}
</script>

<style scoped>
.d-draggable {
  position: relative;
  margin-left: 4px;
  margin-right: 4px;
}

.d-draggable .drag-left,
.d-draggable .drag-right {
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
}

.d-draggable .drag-left.dragover::before,
.d-draggable .drag-right.dragover::before {
  content: "";
  position: absolute;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: var(--v-blue-1-base);
}

.d-draggable .drag-left {
  left: 0;
}

.d-draggable .drag-right {
  right: 0;
}

.d-draggable .drag-left.dragover::before {
  left: -5px;
}

.d-draggable .drag-right.dragover::before {
  right: -5px;
}

.drag-icon {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
