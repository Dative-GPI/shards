<template>
  <div class="d-grid" :class="{ edit: editMode }">
    <template v-for="item in items">
      <div
        :key="'key.' + item.code"
        class="d-grid-key"
        :class="{
          required: item.required,
          'editable blue-3--text': item.editable,
          'grey-2--text': !item.editable,
        }"
      >
        <slot :name="'item-key.' + item.code" v-bind="{ item }">
          {{ item.key }}
        </slot>
      </div>
      <div
        :key="'value.' + item.code"
        class="d-grid-value grey-3--text"
        :class="{ required: item.required, editable: item.editable }"
      >
        <slot :name="'item-value.' + item.code" v-bind="{ item, editMode }">
          {{ item.value }}
        </slot>
      </div>
      <span :key="item.code" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class DGrid extends Vue {
  @Prop({ required: false, default: false })
  editMode!: boolean;

  @Prop({ required: false, default: () => [] })
  items!: Item[];
}

interface Item {
  code: string;
  key: string;
  value: string;
  required?: boolean;
  editable?: boolean;
}
</script>