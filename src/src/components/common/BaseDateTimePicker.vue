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
            v-model="displayValue"
            :label="label"
            prepend-icon="mdi-calendar"
            readonly
            :rules="$attrs.rules"
            v-bind="attrs"
            v-on="on"
          />
        </slot>
      </template>

      <v-fade-transition
        leave-absolute
        v-if="mode == DateTimePickingMode.StartDate"
      >
        <v-date-picker
          :value="startDate"
          :min="minDateString"
          :max="maxDateString"
          @change="$emit('input:startDate', $event)"
        />
      </v-fade-transition>

      <v-fade-transition
        leave-absolute
        v-if="mode == DateTimePickingMode.StartTime"
      >
        <v-time-picker
          format="24hr"
          @change="$emit('input:startTime', $event)"
        />
      </v-fade-transition>

      <v-fade-transition
        leave-absolute
        v-if="mode == DateTimePickingMode.EndDate"
      >
        <v-date-picker
          range
          :value="[startDate]"
          :min="startDate"
          :max="maxDateString"
          @change="$emit('input:endDate', $event[1])"
        />
      </v-fade-transition>

      <v-fade-transition
        leave-absolute
        v-if="mode == DateTimePickingMode.EndTime"
      >
        <v-time-picker format="24hr" @change="$emit('input:endTime', $event)" />
      </v-fade-transition>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { DateTimePickingMode, ISO_8601_DATE_FORMAT } from "@/models";
import { format, parse } from "date-fns";
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class DDateTimePicker extends Vue {
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

  // Methods
  // Lifecycle
}
</script>

<style scoped>
.base-date-time-picker {
  flex: 1 1 auto;
}
</style>
