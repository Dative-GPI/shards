<template>
  <div :id="id" class="d-draggable" :draggable="draggable">
    <!-- Icon to announce that the tile is draggable -->
    <slot name="icon">
      <d-icon class="grey-2--text drag-icon" v-if="draggable">
        mdi-drag
      </d-icon>
    </slot>

    <slot></slot>

    <div class="d-draggable-preview" style="display: none" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import interact from "interactjs";
import { uniqueId } from "lodash";

@Component({})
export default class DDraggable extends Vue {
  // Properties

  @Prop({ required: false, default: true })
  draggable!: boolean;

  @Prop({ required: false, default: () => null })
  index!: number | null;

  // Data
  // Computed Properties

  get id() {
    const suffix =
      this.index == null ? uniqueId("generated-") : this.index.toString();
    return `d-draggable-${suffix}`;
  }

  // Methods

  mounted() {
    interact(`#${this.id}`).dropzone({
      ondragenter: this.onDragEnter,
      ondragleave: this.onDragLeave,
      ondrop: this.onDrop,
    });

    interact(`#${this.id}`).draggable({
      autoScroll: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
      listeners: {
        start: this.onDragStart,
        move: this.onDragMove,
        end: this.onDragEnd,
      },
    });
  }

  onDragEnter(event: any) {
    if (!this.draggable) return;

    const dropzone: HTMLElement = event.target;
    dropzone.classList.add("dragover");
  }

  onDragLeave(event: any) {
    if (!this.draggable) return;

    const dropzone: HTMLElement = event.target;
    dropzone.classList.remove("dragover");
  }

  onDrop(event: any) {
    if (!this.draggable) return;

    const dropzone: HTMLElement = event.target;

    if (dropzone.classList.contains("dragover")) {
      dropzone.classList.remove("dragover");
      this.$emit("drop", { event: event, index: this.index });
    }
  }

  onDragStart(event: any) {
    if (!this.draggable) return;

    const dragged: HTMLElement = event.target;
    const preview: HTMLElement = dragged.getElementsByClassName("d-draggable-preview")[0] as HTMLElement;
    
    dragged.classList.add("d-dragged");
    preview.style.display = "block";

    this.$emit("dragstart", { event: event, index: this.index });
  }

  onDragMove(event: any) {
    if (!this.draggable) return;

    const dragged: HTMLElement = event.target;
    const preview: HTMLElement = dragged.getElementsByClassName("d-draggable-preview")[0] as HTMLElement;

    const transformX =
      event.dx + parseFloat(preview.getAttribute("data-x") || "0");
    const transformY =
      event.dy + parseFloat(preview.getAttribute("data-y") || "0");

    preview.style.transform = `translate(${transformX}px, ${transformY}px)`;
    preview.setAttribute("data-x", transformX);
    preview.setAttribute("data-y", transformY);
  }

  onDragEnd(event: any) {
    if (!this.draggable) return;

    const dragged: HTMLElement = event.target;
    const preview: HTMLElement = dragged.getElementsByClassName("d-draggable-preview")[0] as HTMLElement;

    dragged.classList.remove("d-dragged");
    preview.removeAttribute("data-x");
    preview.removeAttribute("data-y");
    preview.style.transform = "";
    preview.style.display = "none";

    this.$emit("dragstop", { event: event, index: this.index });
  }
}
</script>

<style scoped>
.d-draggable {
  position: relative;
  margin-left: 4px;
  margin-right: 4px;
}

.d-draggable.dragover {
  box-shadow: 1px 1px 2px 0px black;
}

.drag-icon {
  position: absolute;
  top: 5px;
  right: 5px;
}

.d-draggable .d-draggable-preview {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(10, 10, 10);
  opacity: 0.3;
  z-index: 10;
}
</style>
