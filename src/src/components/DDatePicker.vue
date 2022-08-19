<template>
  <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
    min-width="auto" :disabled="!editable">
    <template v-slot:activator="{ on, attrs }">
      <d-text-field :value="formattedDate" :label="label" :editable="editable" prepend-icon="mdi-calendar"
        :readonly="true" :clearable="clearable" v-bind="attrs" v-on="on" @click:clear="$emit('input', null)">
      </d-text-field>
    </template>
    <v-date-picker v-bind="$attrs" v-on="$listeners" :value="value" @change="menu = false; $emit('input', $event)"
      class="d-date-picker">
      <slot> </slot>
      <template v-for="(index, name) in $slots" v-slot:[name]>
        <slot :name="name" />
      </template>
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { format, parseISO } from 'date-fns'

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false
})
export default class DDatePicker extends Vue {
  @Prop({ required: false, default: "" })
  value!: string | null;

  @Prop({ required: false })
  label!: string;

  @Prop({ required: false, default: "dd/MM/yyyy" })
  format!: string;

  @Prop({ required: false, default: true })
  editable!: boolean;

  @Prop({ required: false, default: false })
  clearable!: boolean;

  menu = false;

  get formattedDate() {
    if (!this.value) return "";

    return format(parseISO(this.value), this.format)
  }
}
</script>