<template>
  <v-menu
    transition="scale-transition"
    min-width="auto"
    offset-y
    :close-on-content-click="false"
    :disabled="!editable"
    :nudge-right="40"
    v-model="menu"
  >
    <template v-slot:activator="{ on, attrs }">
      <d-text-field
        prepend-icon="mdi-calendar"
        class="d-text-field"
        :value="formattedDate"
        :clearable="clearable"
        :class="contentClass"
        :editable="editable"
        :readonly="true"
        :label="label"
        v-bind="attrs"
        v-on="on"
        @click:clear="$emit('input', null)"
      >
      </d-text-field>
    </template>
    <v-date-picker
      class="d-text-field"
      :value="stringCleanDate"
      v-on="$listeners"
      v-bind="$attrs"
      @change="onDateChanged"
    >
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

  @Prop({required: false, default: () => - new Date().getTimezoneOffset()})
  timezoneOffset!: number;

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

    let localDate = addMinutes(this.cleanDate, this.timezoneOffset);

    if(!isFinite(localDate.getTime())) return null;
    
    return localDate.toISOString().substring(0, 10)
  }

  get formattedDate() {
    if (!this.cleanDate) return "";

    let localDate = addMinutes(this.cleanDate, this.timezoneOffset);

    if(!isFinite(localDate.getTime())) return null;
    
    return format(localDate, this.format)
  }

  onDateChanged(sdate: string) {
    this.menu = false;
    let date = parseISO(sdate);
    this.$emit('input', date)
  }
}
</script>