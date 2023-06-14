<template>
  <base-date-time-picker
    v-bind="$attrs"
    :value="currentValue"
    :mode="currentMode"
    @click="onMenuInput"
    @input:startDate="onStartDate"
    @input:startTime="onStartTime"
    class="d-date-time-picker"
  />
</template>

<script lang="ts">
import { format, parse } from "date-fns";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { DateTimePickingMode, ISO_8601_DATE_FORMAT, ISO_8601_TIME_FORMAT } from "../models";

import BaseDateTimePicker from "./common/BaseDateTimePicker.vue";

@Component({
  components: { BaseDateTimePicker }
})
export default class DDateTimePicker extends Vue {
  // Properties
  @Prop({ required: false, default: () => null })
  value!: Date | null;

  // Data
  currentMode = DateTimePickingMode.None;
  date: string = "";
  time: string = "";

  // Computed Properties
  get dateTime(): Date {
    return parse(
      `${this.date} ${this.time}`,
      `${ISO_8601_DATE_FORMAT} ${ISO_8601_TIME_FORMAT}`,
      new Date()
    );
  }

  get currentValue(): Date[] {
    if (this.date && !this.time) {
      return [parse(this.date, ISO_8601_DATE_FORMAT, new Date())];
    }
    else if (this.date && this.time) {
      return [parse(
          `${this.date} ${this.time}`,
          `${ISO_8601_DATE_FORMAT} ${ISO_8601_TIME_FORMAT}`,
          new Date()
      )];
    }
    
    return [];
  }

  // Methods
  mounted(): void {
    this.reset();
  }

  onMenuInput(menuValue: boolean): void {
    if (menuValue) {
      this.currentMode = DateTimePickingMode.StartDate;
    } else {
      this.currentMode = DateTimePickingMode.None;
      this.reset();
    }
  }

  onStartDate(date: string): void {
    this.date = date;
    this.time = "";
    this.currentMode = DateTimePickingMode.StartTime;
  }

  onStartTime(time: string): void {
    this.time = time;
    this.currentMode = DateTimePickingMode.None;
    this.$emit("input", this.dateTime);
  }

  reset(): void {
    if (!this.value) {
      this.date = "";
      this.time = "";
    }
    else {
      this.date = format(this.value, ISO_8601_DATE_FORMAT);
      this.time = format(this.value, ISO_8601_TIME_FORMAT);
    }
  }

  // Lifecycle
  @Watch("value")
  onValueChanged = this.reset;
}
</script>
