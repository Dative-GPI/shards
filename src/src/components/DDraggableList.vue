<template>
  <draggable
    v-bind="$attrs"
    :value="items"
    @input="$emit('change', $event)"
    :disabled="!draggable"
    @start="drag = true"
    @end="drag = false"
    ghost-class="ghost"
  >
    <div
      v-for="(item, index) in items"
      class="item-container"
      :class="{
        'drag-cursor': draggable
      }"
      :key="'draggable-list-item-' + index"
    >
      <div class="handle" v-if="draggable">
        <slot name="handle">
          <d-icon class="grey-2--text drag-icon"> mdi-drag </d-icon>
        </slot>
      </div>

      <slot name="item" :item="item">
        {{ item }}
      </slot>
    </div>
  </draggable>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Draggable from "vuedraggable";

@Component({
  components: {
    Draggable,
  },
})
export default class DDraggableList extends Vue {
  // Properties

  @Prop({ required: false, default: true })
  draggable!: boolean;

  @Prop({ required: false, default: () => [] })
  items!: any[];

  // Data

  drag = false;

  // Computed Properties
  // Methods
  // Watchers
}
</script>

<style scoped>
.item-container {
  position: relative;
}

.drag-cursor {
  cursor: grab;
}

.drag-icon {
  position: absolute;
  top: 5px;
  right: 5px;
}

.ghost {
  opacity: 0.5;
}
</style>
