<template>
  <div class="base-date-time-picker">
    <v-menu
      ref="menu"
      :value="mode != DateTimePickingMode.None"
      @input="$emit('click', $event)"
      :close-on-content-click="false"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <slot name="activator" :on="on" :attrs="attrs">
          <v-text-field
            class="d-text-field"
            v-model="displayValue"
            :label="label"
            :rules="$attrs.rules"
            :prepend-icon="solo ? undefined : prependIcon"
            :prepend-inner-icon="solo ? prependIcon : undefined"
            dense
            flat
            height="28px"
            :solo="solo"
            v-bind="$attrs"
            v-on="on"
          />
        </slot>
      </template>

      <v-fade-transition
        leave-absolute
        v-if="mode == DateTimePickingMode.StartDate"
      >
        <v-date-picker
          v-if="selectedDates.length == 2"
          class="d-text-field"
          range
          :value="selectedDates"
          :min="minDateString"
          :max="maxDateString"
          @input="$emit('input:startDate', $event[0])"
          v-bind="$attrs"
        />
        <v-date-picker
          v-else
          class="d-text-field"
          :value="startDate"
          :min="minDateString"
          :max="maxDateString"
          @change="$emit('input:startDate', $event)"
          v-bind="$attrs"
        />
      </v-fade-transition>

      <v-fade-transition
        leave-absolute
        v-if="mode == DateTimePickingMode.StartTime"
      >
        <v-time-picker
          format="24hr"
          @change="$emit('input:startTime', $event)"
          v-bind="$attrs"
        />
      </v-fade-transition>

      <v-fade-transition
        leave-absolute
        v-if="mode == DateTimePickingMode.EndDate"
      >
        <v-date-picker
          class="d-text-field"
          range
          :value="[startDate]"
          :min="startDate"
          :max="maxDateString"
          @change="$emit('input:endDate', $event[1])"
          v-bind="$attrs"
        />
      </v-fade-transition>

      <v-fade-transition
        leave-absolute
        v-if="mode == DateTimePickingMode.EndTime"
      >
        <v-time-picker
          format="24hr"
          @change="$emit('input:endTime', $event)"
          :min="minEndTime"
          v-bind="$attrs"
        />
      </v-fade-transition>
    </v-menu>
  </div>
</template>

<script lang="ts">
import {
  DateTimePickingMode,
  ISO_8601_DATE_FORMAT,
  ISO_8601_TIME_FORMAT,
} from "../../models";
import { format } from "date-fns";
import { Component, Prop, Ref, Vue } from "vue-property-decorator";

@Component({})
export default class BaseDateTimePicker extends Vue {
  // Properties

  @Prop({ required: false, default: () => [] })
  value!: Date[];

  @Prop({ required: false, default: "Date et heure" })
  label!: string;

  @Prop({ required: false, default: DateTimePickingMode.None })
  mode!: DateTimePickingMode;

  @Prop({ required: false, default: "dd/MM/yyyy HH:mm XXX" })
  dateTimeFormat!: string;

  @Prop({ required: false })
  minDate: string | Date | undefined;

  @Prop({ required: false })
  maxDate: string | Date | undefined;

  @Prop({ required: false, default: "mdi-calendar" })
  prependIcon!: string;

  @Prop({required: false, default: false })
  solo!: boolean

  @Ref("menu")
  menu: any;

  // Data

  DateTimePickingMode = DateTimePickingMode;

  // Computed Properties

  get displayValue() {
    try {
      return this.value
        .map((date) => format(date, this.dateTimeFormat))
        .join(" - ");
    } catch {
      return undefined;
    }
  }

  get minDateString() {
    if (!this.minDate) return undefined;
    if (this.minDate instanceof Date) {
      return format(this.minDate, ISO_8601_DATE_FORMAT);
    }
    return this.minDate;
  }

  get maxDateString() {
    if (!this.maxDate) return undefined;
    if (this.maxDate instanceof Date) {
      return format(this.maxDate, ISO_8601_DATE_FORMAT);
    }
    return this.maxDate;
  }

  get startDate() {
    if (!this.value || this.value.length == 0) return "";
    return format(this.value[0], ISO_8601_DATE_FORMAT);
  }

  get endDate() {
    if (!this.value || this.value.length < 2) return "";
    return format(this.value[1], ISO_8601_DATE_FORMAT);
  }

  get selectedDates() {
    return [this.startDate, this.endDate].filter((v) => !!v);
  }

  get minEndTime() {
    if (!this.value || this.value.length < 2) return undefined;
    if (this.startDate != this.endDate) return undefined;
    return format(this.value[0], ISO_8601_TIME_FORMAT);
  }

  // Methods
  // Lifecycle
}
</script>

<style scoped>
.base-date-time-picker {
  flex: 1 1 auto;
}
</style>
