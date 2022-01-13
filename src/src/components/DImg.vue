<template>
  <div :style="{ width: 'inherit', height: 'inherit' }">
    <v-img v-bind="$attrs" v-on="$listeners" :src="realSource" :key="index" class="d-img">
      <slot> </slot>
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </v-img>
    <slot name="actions">
      <d-btn-file
        v-if="editable"
        class="d-btn-edit-img"
        icon="mdi-pencil"
        @input="$emit('input', $event)"
        accept="image/*"
      />
      <d-btn-remove v-if="editable" class="d-btn-remove-img" @click="$emit('remove')" />
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  inheritAttrs: false,
})
export default class DImg extends Vue {
  @Prop({ required: false, default: "" })
  value!: string;

  @Prop({ required: false, default: "" })
  src!: string;

  @Prop({ required: false, default: false, type: Boolean })
  editable!: boolean;

  get realSource() {
    return !!this.value ? this.value : this.src;
  }

  index = 0;

  @Watch("index")
  onSourceChanged() {
    this.index++;
  }
}
</script>