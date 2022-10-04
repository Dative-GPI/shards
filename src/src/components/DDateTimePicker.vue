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
import { DateTimePickingMode, ISO_8601_DATE_FORMAT, ISO_8601_TIME_FORMAT } from "@/models";
import { format, parse } from "date-fns";
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import BaseDateTimePicker from "./common/BaseDateTimePicker.vue";

@Component({
  components: {
    BaseDateTimePicker,
  },
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

  get dateTime() {
    return parse(
      `${this.date} ${this.time}`,
      `${ISO_8601_DATE_FORMAT} ${ISO_8601_TIME_FORMAT}`,
      new Date()
    );
  }

  get currentValue() {
    if (!this.value) return [];
    return [this.value];
  }

  // Methods

  onMenuInput(menuValue: boolean) {
    if (menuValue) {
      this.currentMode = DateTimePickingMode.StartDate;
      this.date = "";
      this.time = "";
    } else {
      this.currentMode = DateTimePickingMode.None;
    }
  }

  onStartDate(date: string) {
    this.date = date;
    this.currentMode = DateTimePickingMode.StartTime;
  }

  onStartTime(time: string) {
    this.time = time;
    this.currentMode = DateTimePickingMode.None;
    this.$emit("input", this.dateTime);
  }

  reset() {
    if (!this.value) {
      this.date = "";
      this.time = "";
    } else {
      this.date = format(this.value, ISO_8601_DATE_FORMAT);
      this.time = format(this.value, ISO_8601_TIME_FORMAT);
    }
  }

  // Lifecycle

  @Watch("value")
  onValueChanged = this.reset;
}
</script>
