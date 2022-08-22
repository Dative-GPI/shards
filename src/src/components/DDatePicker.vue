<template>
  <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
    min-width="auto" :disabled="!editable">
    <template v-slot:activator="{ on, attrs }">
      <d-text-field :value="formattedDate" :class="contentClass" :label="label" :editable="editable"
        prepend-icon="mdi-calendar" :readonly="true" :clearable="clearable" v-bind="attrs" v-on="on"
        @click:clear="$emit('input', null)">
      </d-text-field>
    </template>
    <v-date-picker :value="stringCleanDate" @change="onDateChanged" class="d-date-picker" v-bind="$attrs"
      v-on="$listeners">
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
import { addMinutes, format, parseISO } from 'date-fns'

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  inheritAttrs: false
})
export default class DDatePicker extends Vue {
  @Prop({ required: false, default: "" })
  value!: string | Date | null;

  @Prop({ required: false })
  label!: string;

  @Prop({ required: false, default: "dd/MM/yyyy" })
  format!: string;

  @Prop({ required: false, default: true })
  editable!: boolean;

  @Prop({ required: false, default: false })
  clearable!: boolean;

  @Prop({ required: false, default: "" })
  contentClass!: string;

  menu = false;

  get cleanDate(): Date | null {
    let result = null;

    if (this.value) {
      if (this.value instanceof Date) result = this.value;
      else result = parseISO(this.value)

      if (!isFinite(result.getTime())) result = null;
    }

    return result;
  }

  // on add les minutes pour que le jour soit le bon 

  get stringCleanDate() {
    if (!this.cleanDate) return null

    return addMinutes(this.cleanDate, - this.cleanDate.getTimezoneOffset())
      .toISOString().substring(0, 10)
  }

  get formattedDate() {
    if (!this.cleanDate) return "";

    return format(addMinutes(this.cleanDate, - this.cleanDate.getTimezoneOffset()), this.format)
  }

  onDateChanged(sdate: string) {
    this.menu = false;
    let date = parseISO(sdate);
    this.$emit('input', date)
  }
}
</script>