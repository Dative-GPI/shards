<template>
  <base-date-time-picker
    v-bind="$attrs"
    :value="currentValue"
    :label="label"
    :mode="currentMode"
    @click="onMenuInput"
    @input:startDate="onStartDate"
    @input:startTime="onStartTime"
    @input:endDate="onEndDate"
    @input:endTime="onEndTime"
    class="d-date-time-range-picker"
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
export default class DDateTimeRangePicker extends Vue {
  // Properties
  @Prop({ required: false, default: () => [] })
  value!: Date[];

  @Prop({ required: false, default: "Plage de temps" })
  label!: string;

  // Data
  currentMode = DateTimePickingMode.None;
  startDate: string = "";
  startTime: string = "";
  endDate: string = "";
  endTime: string = "";

  // Computed Properties
  get currentValue(): Date[] {
    const dates = [];

    if (this.startDate && !this.startTime) {
      dates.push(parse(this.startDate, ISO_8601_DATE_FORMAT, new Date()));
    }
    else if (this.startDate && this.startTime) {
      dates.push(
        parse(
          `${this.startDate} ${this.startTime}`,
          `${ISO_8601_DATE_FORMAT} ${ISO_8601_TIME_FORMAT}`,
          new Date()
        )
      );
    }

    if (this.endDate && !this.endTime) {
      dates.push(parse(this.endDate, ISO_8601_DATE_FORMAT, new Date()));
    }
    else if (this.endDate && this.endTime) {
      dates.push(
        parse(
          `${this.endDate} ${this.endTime}`,
          `${ISO_8601_DATE_FORMAT} ${ISO_8601_TIME_FORMAT}`,
          new Date()
        )
      );
    }

    return dates;
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
    this.startDate = date;
    this.startTime = "";
    this.endDate = "";
    this.endTime = "";
    this.currentMode = DateTimePickingMode.StartTime;
  }

  onStartTime(time: string): void {
    this.startTime = time;
    this.endDate = "";
    this.endTime = "";
    this.currentMode = DateTimePickingMode.EndDate;
  }

  onEndDate(date: string): void {
    this.endDate = date;
    this.endTime = "";
    this.currentMode = DateTimePickingMode.EndTime;
  }

  onEndTime(time: string): void {
    this.endTime = time;
    this.currentMode = DateTimePickingMode.None;
    this.$emit("input", this.currentValue);
  }

  reset(): void {
    if (!this.value || this.value.length < 2) {
      this.startDate = "";
      this.startTime = "";
      this.endDate = "";
      this.endTime = "";
    }
    else {
      const start = this.value[0];
      const end = this.value[1];

      this.startDate = format(start, ISO_8601_DATE_FORMAT);
      this.startTime = format(start, ISO_8601_TIME_FORMAT);
      this.endDate = format(end, ISO_8601_DATE_FORMAT);
      this.endTime = format(end, ISO_8601_TIME_FORMAT);
    }
  }

  // Lifecycle
  @Watch("value")
  onValueChanged = this.reset;
}
</script>
